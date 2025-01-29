import pkg from 'pg';

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
        client.connect().then(() => {
            console.log('Connected to the database: ', process.env.DB_DATABASE)
        })

    }catch{
        console.error('Error connecting to the database')
    }
}