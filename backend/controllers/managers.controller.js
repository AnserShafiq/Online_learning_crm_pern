import { connectDB } from "../lib/db.js"


export const getList = async(req,res) => {
    const db = await connectDB()
    const managersList = await db.query('SELECT MANAGER_ID, NAME FROM MANAGERS');
    if(managersList.rowCount === 0){
        console.error('Unable to read managers from database', error);
    }
    return res.json(managersList.rows)
}