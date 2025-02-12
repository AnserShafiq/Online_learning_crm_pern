import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateUser = async (req, res, next) => {
    const token = await req.cookies.accessToken;
    console.log('Cookies =>', token )
    if (!token) {
        console.log('Going to send no token message')
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.error(err)
            return res.status(403).json({ message: "Unauthorized: Invalid or expired token" });
        }
        // console.log('Decoded=> ',decoded)   
        req.userId = decoded.userId;
        next();
    });
    console.log('req.userId=> ',req.userId)
};

export default authenticateUser;
