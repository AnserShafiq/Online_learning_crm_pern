import  {connectDB} from "../lib/db.js";

export const signup = async (req, res) => {
    const UserProfile = req.body;
    console.log('User Data==> ',UserProfile)
    try {
        const db = await connectDB(); 
        let idCheck = false;
        let userId;
        if (!db) {
            throw new Error("Database connection failed");
        }
        // console.log('Going to read in Database')
        const userCheck = await db.query('SELECT * FROM agents');
        // console.log('==> ', typeof(userCheck.rows.length))
        for(let i = userCheck.rowCount; idCheck === false;i++){
            const userNo = String(i).padStart(6, '0');
            userId = `NASS_AG_${userNo}`
            const dbCheck = await db.query('SELECT * FROM agents WHERE agent_id = $1', [userId]);
            if(dbCheck.rowCount === 0){
                idCheck = true;
                console.log('==> ', userId)
            }
        }
        console.log("Data => ",userId); // Debugging output

        await db.query(
            'INSERT INTO AGENTS(agent_id, name, gender, email, assigned_company, manager_id, password, created_on) VALUES($1,$2,$3,$4,$5,$6,$7,NOW());'
            ,[userId,UserProfile.name, UserProfile.gender, UserProfile.email, UserProfile.assigned,UserProfile.manager, UserProfile.password]
        )

        return res.json({ message: "User signup successful" }).status(200);

    } catch (error) {
        console.error('Error checking user:', error);
        res.status(500).json({ message: "Server error" });
    }
};
