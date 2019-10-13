const {
  ROLES,
  USER_FIELDS
} = require('../constants/index');

const {
  SALT_ROUNDS,
  TYPE_OF_UPDATE_BALANCE_FOR_USER ,
  TYPE_OF_SCOPE: {
      UPDATE
    }
} = require("../constants");
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
        min: 5,
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
    balance: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
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

  User.addScope(UPDATE, {
    returning: true,
    raw: true
  });

  User.beforeCreate( async (user, options) => {
    return user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  });

  User.beforeBulkUpdate( async (user) => {
    const { password } = user.attributes;

    if(password){
      return user.attributes.password = await bcrypt.hash(password, SALT_ROUNDS);
    }
  });

  User.createUpdateBalanceOptions= (type, userId, sum, transaction) => {
    const { CASH_OUT } = TYPE_OF_UPDATE_BALANCE_FOR_USER;
    const typeUpdateBalance = type === CASH_OUT ? "-" : "+";

    return [
      {
        balance: sequelize.literal(`"balance" ${typeUpdateBalance} ${sum}`)
      },
      {
        where: {
          id: userId
        },
        fields: [USER_FIELDS.BALANCE],
        transaction
      }
    ]
  };

  return User;
};
