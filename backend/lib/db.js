import pkg from 'pg';
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;
let pool;

export const connectDB = () => {
    if (!pool) {
        pool = new Pool({
            host:process.env.DB_HOST,
            port:process.env.DB_PORT,
            user:process.env.DB_USERNAME,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_DATABASE,
            max: 10, // Adjust as needed
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });

        pool.on('connect', () => {
            console.log('✅ Database connected successfully.');
        });

        pool.on('error', (err) => {
            console.error('❌ Database connection error:', err);
        });
    }
    return pool;
};