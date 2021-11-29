import { parseNumber, _throw } from './utils';
import dotenv from 'dotenv';

dotenv.config();

export const SERVER_PORT = parseNumber(process.env.SERVER_PORT) || 3000;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = parseNumber(process.env.DB_PORT) || 5432;
export const DB_USER = process.env.DB_USER || _throw('DB_USER env variable not set');
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_NAME = process.env.DB_NAME || _throw('DB_NAME env variable not set');
