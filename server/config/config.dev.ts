import * as path from 'path';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const config: any = {};

config.logFileDir = path.join(__dirname, '../../log');
config.logFileName = 'app.log';
config.dbHost = process.env.dbHost || 'localhost';
config.dbPort = process.env.dbPort || '27017';
config.dbName = process.env.dbName || 'ngChat';
config.dbUser = process.env.dbUser || '';
config.dbPassword = process.env.dbPassword || '';
config.serverPort = process.env.serverPort || 3000;
config.SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR || 10;
config.JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET'

export default config;
