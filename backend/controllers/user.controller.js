import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { connectDB } from "../lib/db.js";
import bcrypt from 'bcrypt';
dotenv.config();

// Function to generate JWT tokens
const generateTokens = (userId) => {

    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m', // Access token valid for 15 minutes
    });

    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d', // Refresh token valid for 7 days
    });
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken)
    return { accessToken, refreshToken };
};

// Function to set JWT tokens in cookies
const setCookies = (res, accessToken, refreshToken) => {
    res.cookie('accessToken', accessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'strict',
        maxAge: 24* 60 * 60 * 1000, // 1 day
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

// Signup function
export const signup = async (req, res) => {
    const UserProfile = req.body;
    console.log('User => ', UserProfile)
    try {
        const db = await connectDB();
        if (!db) throw new Error("Database connection failed");

        let idCheck = false;
        let userId,user;
        const decryptedPassword = bcrypt.hashSync(UserProfile.password, 10);

        if(UserProfile.usertype === 'Head Manager'){
            const userCheck = await db.query('SELECT * FROM MANAGERS WHERE email=$1', [UserProfile.email]);

            if (userCheck.rowCount > 0) {
                return res.status(401).json({ message: 'Email already in use' });
            }
            const users = await db.query('SELECT * FROM MANAGERS');
            for (let i = users.rowCount; idCheck === false; i++) {
                const userNo = String(i).padStart(4, '0');
                userId = `NASS_MN_${userNo}`;
                const dbCheck = await db.query('SELECT * FROM MANAGERS WHERE manager_id = $1', [userId]);
                if (dbCheck.rowCount === 0) {
                    idCheck = true;
                }
            }
            await db.query(
            `INSERT INTO Managers(manager_id, name, email, password,contact_number, gender, created_on, user_type) VALUES($1,$2,$3,$4,$5,$6,NOW(),$7);`,
            [userId, UserProfile.name, UserProfile.email, decryptedPassword, UserProfile.contact_number, UserProfile.gender, 'Head Manager']);

            for(let i=0;i < UserProfile.companies.length; i++){
                await db.query(`UPDATE COMPANIES SET MANAGER_ID=$1 WHERE COMPANY_ID=$2`,[userId, UserProfile.companies[i]])
            }

            user = await db.query('SELECT * FROM MANAGERS WHERE manager_id=$1', [userId]);
        }
        else{
            const userCheck = await db.query('SELECT * FROM AGENTS WHERE email=$1', [UserProfile.email]);

            if (userCheck.rowCount > 0) {
                return res.status(401).json({ message: 'Email already in use' });
            }
            const users = await db.query('SELECT * FROM AGENTS');
            for (let i = users.rowCount; idCheck === false; i++) {
                const userNo = String(i).padStart(6, '0');
                userId = `NASS_AG_${userNo}`;
                const dbCheck = await db.query('SELECT * FROM AGENTS WHERE agent_id = $1', [userId]);
                if (dbCheck.rowCount === 0) {
                    idCheck = true;
                }
            }
            await db.query(
                'INSERT INTO AGENTS(agent_id, name, gender, email, assigned_company, manager_id, password, created_on, user_type) VALUES($1,$2,$3,$4,$5,$6,$7,NOW(),$8);',
                [userId, UserProfile.name, UserProfile.gender, UserProfile.email, UserProfile.assigned, UserProfile.manager, decryptedPassword,UserProfile.usertype]
            );
            user = await db.query('SELECT * FROM AGENTS WHERE agent_id=$1', [userId]);
        }
        

        const { accessToken, refreshToken } = generateTokens(userId);
        setCookies(res, accessToken, refreshToken);
        res.status(200).json({ message: "User signup successful", status: 'OK', user: user.rows[0]});

    } catch (error) {
        console.error('Error checking user:', error);
        res.status(500).json({ message: "Server error" });
    }
};

export const adminSignUp = async(req,res) => {
    try{

    }catch(err){

    }
}

export const logIn = async (req, res) => {
    const db = await connectDB();
    try {
        let userLogin;
        const userData = req.body;
        // console.log('User getting Logged in==> ', userData);
        // For Sale Managers
        if(userData.username.includes('NASS_MN_')){
            // console.log('Checking in managers')
            userLogin = await db.query(`SELECT * FROM MANAGERS WHERE manager_id=$1`, [userData.username]);
            if(userLogin.rowCount===0){
                console.log('Rows count zero');
                return res.status(401).json({ message: 'Invalid user id or password' }); // Return to stop further execution    
            }
            const passCheck = bcrypt.compareSync(userData.password, userLogin.rows[0].password);
            console.log(passCheck);

            if (!passCheck) {
                console.log('User wrong');
                return res.status(401).json({ message: "Invalid user id or password" }); // Return to prevent multiple responses
            }

            // Generate tokens
            const { accessToken, refreshToken } = generateTokens(userLogin.rows[0].manager_id);

            // Set cookies properly before sending response
            setCookies(res, accessToken, refreshToken);

        }else{
            userLogin = await db.query(`SELECT * FROM AGENTS WHERE agent_id=$1`, [userData.username.toUpperCase()]);
            if (userLogin.rowCount === 0) {
                console.log('Rows count zero');
                return res.status(401).json({ message: 'Invalid user id or password' }); // Return to stop further execution
            }
            const passCheck = bcrypt.compareSync(userData.password, userLogin.rows[0].password);
            console.log(passCheck);

            if (!passCheck) {
                console.log('User wrong');
                return res.status(401).json({ message: "Invalid user id or password" }); // Return to prevent multiple responses
            }

            // Generate tokens
            const { accessToken, refreshToken } = generateTokens(userLogin.rows[0].agent_id);

            // Set cookies properly before sending response
            setCookies(res, accessToken, refreshToken);
        }

        // Validate password
        
        // Send successful login response
        return res.status(200).json({ message: "User login successful", status: 'OK', user: userLogin.rows[0] });

    } catch (error) {
        console.error('Error from user login: ', error);
        return res.status(500).json({ message: 'Error in getting login' }); // Changed to 500 (server error)
    }
};



export const getUserProfile = async (req, res) => {
    try{
        console.log('Getting user profile')
        let user;
        const db = await connectDB();
        const UserID = req.userId
        console.log('From Get Function => ',UserID)
        if(UserID.includes('NASS_MN_')){
            user = await db.query('SELECT * FROM MANAGERS WHERE manager_id=$1', [UserID]);
        }
        else{
            user = await db.query('SELECT * FROM AGENTS WHERE agent_id=$1', [UserID]);
        }
        // console.log(req.userId)
        return res.json(user.rows[0]);
    }
    catch(error){
        console.error('Error:',error)
        res.status(500).json({message: 'Server error'})
    }
}


// Logout API to clear cookies
export const logout = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).json({ message: "Logged out successfully" });
};
