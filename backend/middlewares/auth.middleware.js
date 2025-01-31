import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateUser = (req, res, next) => {
    const token = req.cookies.accessToken; // Extract token from cookies

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Unauthorized: Invalid or expired token" });
        }

        req.userId = decoded.userId; // Attach userId to request
        next(); // Continue to the next middleware or route handler
    });
};

export default authenticateUser;
