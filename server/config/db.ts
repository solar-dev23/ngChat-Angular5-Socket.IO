import * as Mongoose from "mongoose";
import config from './config.dev';

Mongoose.Promise = global.Promise;
Mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`);

const db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
  console.log('Connection with database succeeded.');
});

exports.db = db;