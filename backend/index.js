import dotenv from 'dotenv';
import express from 'express';

import newUserCreation from './routes/newusercreation.route.js';
import { connectDB } from './lib/db.js';


dotenv.config();
const app = express()
const PORT = process.env.PORT || 5000


app.use('/new-user',newUserCreation)

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
    connectDB();
})