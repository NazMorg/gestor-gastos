import jwt from "jsonwebtoken";
import { usersModel } from "../models/users.model.js";
import config from "../config/config.js";

export const authMiddleware = async (req, res, next) => {
    try{
        if(!req.headers.authorization?.startsWith("Bearer")) {
            return res.status(401).json({ message: "No Autorizado" });
        };
        const token = req.headers.authorization.split(" ")[1];
        if(!token) {
            return res.status(401).json({ message: "No Autorizado, sin token" });
        };
        const decoded = jwt.verify(token, config.jwt_secret);
        req.user = await usersModel.findById(decoded.id).select("-password");
        next();
    }
    catch(error) {
        return res.status(401).json({ message: "Token invalido" });
    };
};