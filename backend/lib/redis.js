import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// Corrected Redis Connection
export const redis = new Redis({
    host: "127.0.0.1", // or use process.env.REDIS_HOST
    port: 6379 // or use process.env.REDIS_PORT
});
