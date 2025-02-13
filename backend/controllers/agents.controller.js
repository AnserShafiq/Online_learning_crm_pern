import { connectDB } from "../lib/db.js"


export const getCompaniesForAgents = async(req,res) => {
    const db = await connectDB()
    const companies = await db.query(`SELECT * FROM COMPANIES`)
    // console.log(companies.rows)
    return res.json(companies.rows)
}

export const getTimeSpent = async (req, res) => {
    try {
        const db = await connectDB();
        if (!db) {
            throw new Error('Database connection failed.');
        }

        const { agent_id } = req.body;
        const result = await db.query('SELECT timer FROM online_timer WHERE agent_id = $1', [agent_id]);

        const oldTime = result.rows[0] || { timer: 0 }; // Default if no record
        await db.end(); // Close the connection

        return res.status(200).json(oldTime);
    } catch (error) {
        console.error('❌ Error fetching time spent:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateTimeSpent = async(req,res) => {
    const {newtime, agent_id} = req.body;
    console.log('New Time: ', newtime, 'Agent ID: ', agent_id);
    return res.json({message: 'Time Updated'}).status(200)
}