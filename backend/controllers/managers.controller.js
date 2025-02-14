import { connectDB } from "../lib/db.js"

let db=connectDB()

export const getList = async(req,res) => {
    const type = req.query;
    console.log('Requested managers type => ',type);
    
    let managersList ;
    if(type.type === 'Head Managers'){
        managersList = await db.query('SELECT MANAGER_ID, NAME FROM MANAGERS')
    }else{
        managersList = await db.query(`SELECT AGENT_ID, NAME FROM AGENTS WHERE user_type = 'Sale Manager'`)
    }
    if(managersList.rowCount === 0){
        console.error('Unable to read managers from database', error);
    }
    return res.json(managersList?.rows)
}
export const getCompaniesForManagers = async (req, res) => {
    const { type } = req.query;
    

    let query = 'SELECT * FROM COMPANIES';
    
    if (type === 'HM') {
        query = 'SELECT * FROM COMPANIES WHERE HM_ID IS NULL';
    } else if (type === 'SM') {
        query = 'SELECT * FROM COMPANIES WHERE sm_id IS NULL';
    }
    try {
        const companies = await db.query(query);
        // console.log('Companies found:', companies.rows);
        return res.json(companies.rows);
    } catch (error) {
        console.error('Error fetching companies:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
