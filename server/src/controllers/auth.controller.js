import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { usersModel } from "../models/users.model.js";
import { hashData, compareData } from "../utils/utils.js";

const generateToken = (id) => {
    return jwt.sign({ id }, config.jwt_secret, { expiresIn: "30d" });
};

class AuthController {
    userSignup = async (req, res) => {
        const { name, email, password } = req.body;
        // Missing data validation
        if(!name || !email || !password) {
            return res.status(400).json({ error: "Toda la información es necesaria" });
        };
        // Already exist validation
        const userFound = await usersModel.findOne({ email });
        if(userFound) {
            return res.status(400).json({ error: "El email ya esta registrado" });
        };
        
        // Create User
        const hashedPass = await hashData(password);
        const createdUser = await usersModel.create({ name, email, password: hashedPass });
        if(!createdUser) {
            return res.status(500).json({ error: error.message });
        };
        return res.status(201).json({ message: "Nuevo usuario creado", id: createdUser._id, user: createdUser.name, email: createdUser.email, token: generateToken(createdUser._id) });
    };

    userLogin = async (req, res) => {
        const { email, password } = req.body;
        // Email Validation
        const userFound = await usersModel.findOne({ email });
        if(!userFound) {
            return res.status(400).json({ error: "Error de email o constraseña" });
        };
        // Password Validation
        const isCorrectPass = await compareData(password, userFound.password);
        if(!isCorrectPass) {
            return res.status(400).json({ error: "Error de email o contraseña" });
        };

        return res.status(201).json({ id: userFound._id, user: userFound.name, email: userFound.email, token: generateToken(userFound._id) });
    };

    activeUser = async (req, res) => {
        return res.json(req.user);
    };
};

export const authController = new AuthController();