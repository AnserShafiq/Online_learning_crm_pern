import pkg from 'pg';
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async() => {
    const { Client } = pkg
    try{
        const client = new Client({
            host:process.env.DB_HOST,
            port:process.env.DB_PORT,
            user:process.env.DB_USERNAME,
            password:process.env.DB_PASSWORD,
            database:process.env.DB_DATABASE,
        })
        await client.connect().then(() => {
            console.log('Connected to the database: ', process.env.DB_DATABASE)
        })
        return client
    }catch{
        console.log('Unable to connect to the database')
        console.error('Error connecting to the database')
    }
}
