import { connectDB } from "../lib/db.js"


export const getList = async(req,res) => {
    const type = req.query;
    console.log('Requested managers type => ',type);
    const db = await connectDB()
    let managersList ;
    if(type.type === 'Head Managers'){
        managersList = await db.query('SELECT MANAGER_ID, NAME FROM MANAGERS')
    }else{
        managersList = await db.query(`SELECT AGENT_ID, NAME FROM AGENTS`)
    }
    if(managersList.rowCount === 0){
        console.error('Unable to read managers from database', error);
    }
    return res.json(managersList.rows)
}
export const getCompanies = async(req,res) => {
    const db = await connectDB();
    const companies = await db.query(`SELECT * FROM COMPANIES WHERE MANAGER_ID is null`);
    return res.json(companies.rows)
}

