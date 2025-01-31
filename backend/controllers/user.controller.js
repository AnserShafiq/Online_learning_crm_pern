import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { connectDB } from "../lib/db.js";

dotenv.config();

// Function to generate JWT tokens
const generateTokens = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m', // Access token valid for 15 minutes
    });

    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d', // Refresh token valid for 7 days
    });
    console.log('Access Token:', accessToken, 'Refresh Token:', refreshToken);
    return { accessToken, refreshToken };
};

// Function to set JWT tokens in cookies
const setCookies = (res, accessToken, refreshToken) => {
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

// Signup function
export const signup = async (req, res) => {
    const UserProfile = req.body;

    try {
        const db = await connectDB();
        if (!db) throw new Error("Database connection failed");

        const userCheck = await db.query('SELECT * FROM AGENTS WHERE email=$1', [UserProfile.email]);

        if (userCheck.rowCount > 0) {
            return res.status(401).json({ message: 'Email already in use' });
        }

        let idCheck = false;
        let userId;
        const users = await db.query('SELECT * FROM agents');

        for (let i = users.rowCount; idCheck === false; i++) {
            const userNo = String(i).padStart(6, '0');
            userId = `NASS_AG_${userNo}`;
            const dbCheck = await db.query('SELECT * FROM agents WHERE agent_id = $1', [userId]);
            if (dbCheck.rowCount === 0) {
                idCheck = true;
            }
        }

        await db.query(
            'INSERT INTO AGENTS(agent_id, name, gender, email, assigned_company, manager_id, password, created_on) VALUES($1,$2,$3,$4,$5,$6,$7,NOW());',
            [userId, UserProfile.name, UserProfile.gender, UserProfile.email, UserProfile.assigned, UserProfile.manager, UserProfile.password]
        );

        const { accessToken, refreshToken } = generateTokens(userId);
        setCookies(res, accessToken, refreshToken);

        res.status(200).json({ message: "User signup successful", _id: userId, name: UserProfile.name, email: UserProfile.email });

    } catch (error) {
        console.error('Error checking user:', error);
        res.status(500).json({ message: "Server error" });
    }
};

// Middleware to authenticate user using access token
export const authenticateUser = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Unauthorized: Invalid or expired token" });

        req.userId = decoded.userId;
        next();
    });
};

export const getUserProfile = async (req, res) => {
    try{
        console.log(req)
        res.json(req.user)
    }
    catch(error){
        console.error('Error:',error)
        res.status(500).json({message: 'Server error'})
    }
}

// API to refresh token
export const refreshAccessToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized: No refresh token" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Unauthorized: Invalid refresh token" });

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(decoded.userId);
        setCookies(res, accessToken, newRefreshToken);

        return res.status(200).json({ accessToken });
    });
};

// Logout API to clear cookies
export const logout = (req, res) => {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).json({ message: "Logged out successfully" });
};
