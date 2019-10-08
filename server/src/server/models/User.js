const { ROLES } = require('../constants/index');

const { SALT_ROUNDS } = require("../constants");
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        notEmpty: true,
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "buyer",
      validate: {
        isIn: [[...ROLES]],
      },
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "default.jpg",
      allowNull: false,
    },
    isBanned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });


  User.associate = function (models) {
      User.hasMany(models.RefreshToken, { foreignKey: 'userId', targetKey: 'id' });
      User.hasMany(models.Contests, {foreignKey: 'userId', targetKey: 'id', as: 'contests'});
      User.hasMany(models.Entries, {foreignKey: 'userId', targetKey: 'id', as: 'entries'});
  };


  User.beforeCreate( async (user, options) => {
    return user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  });

  return User;
};
