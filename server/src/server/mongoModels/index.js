const fs        = require('fs');
const path      = require('path');
const mongoose = require('mongoose');//.set('debug', true);
const basename  = path.basename(__filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config/config.json')[env];
const db        = {};

const connection = mongoose.createConnection(config.mongoUrl,
    {
        user: config.mongoUsername,
        pass: config.mongoPassword,
        dbName: config.mongoName,
        useNewUrlParser: true,
    }, error => {
        if (error) {
            console.log(error);
            console.error('MongoDB have error');
            process.exit(1);
        } else {
            console.log("Chat DB connection success");
        }
    }
);

const Schema = mongoose.Schema;

fs
    .readdirSync(__dirname)
    .filter(fileName => {
    return (
        fileName.indexOf('.') !== 0)
        && (fileName !== basename)
        && (fileName.slice(-3) === '.js');
    })
    .forEach(fileName => {
        const data = require(path.join(__dirname, fileName));
        //const modelSchema = new Schema(model.schema);
        
        //fileName = fileName.split('.')[0];
        const model = connection.model(data.name, data.schema);

        db[model.modelName] = model
    });

mongoose.set('debug', true);
module.exports = db;