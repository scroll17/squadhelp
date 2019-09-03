"use strict";

const fs = require('fs'),
  path = require('path'),
  Sequelize = require('sequelize'),
  basename = path.basename(__filename),
  env = process.env.NODE_ENV || 'development',
  configPath = env === 'production' ? path.join(__dirname, '..', '..', '..', 'src/server/config/config.json') : path.join(__dirname, '..', 'config/config.json'),
  config = require(configPath)[ env ],
  db = {};

const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
};

const sequelize = new Sequelize(config.database, config.username, config.password,
    {
      operatorsAliases,
      dialect: config.dialect,
      host: config.host
    }
);

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));

    db[ model.name ] = model
  });

Object.keys(db).forEach((modelName) => {
  if (db[ modelName ].associate) {
    db[ modelName ].associate(db)
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
