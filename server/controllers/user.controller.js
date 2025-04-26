import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {createUserService, findOneUserService, findUsersService, updateUserService} from "../services/user.service.js";
const JWT_SECRET = "40b77671c734decf58f138459647310ca082939c0ff2e6f5f9c2e5accc4c6e02f1d56dd760f956310bbb4ea7067d2670b76a72581cf7b622eac41985694b8c58"

// Register User
export const userRegisterController = async (req, res) => {
    try {
        const {first_name, last_name, email, phone_no, password, type} = req.body;

        // Check if user exists
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message: "User already exists"});

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        await createUserService({
            first_name,
            last_name,
            email,
            phone_no,
            password: hashedPassword,
            type
        })

        res.status(201).json({message: "User registered successfully!"});
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

// Login User
export const userLoginController = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if user exists
        const user = await findOneUserService({email});
        if (!user) return res.status(400).json({message: "User not found"});

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: "Invalid credentials"});

        // Generate JWT
        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: "7d"});

        res.json({
            token,
            user: {
                first_name: user?.first_name,
                last_name: user?.last_name,
                email: user?.email,
                type: user?.type,
                _id: user?._id
            }
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const userLogoutController = async (req, res) => {
    try {
        res.json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: "Logout failed" });
    }
};

export const updateUserController = async (req, res) => {
    console.info("User update started");
    try {
        const response = await updateUserService({}, req?.body);
        console.info("User update completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};

export const findOneUserController = async (req, res) => {
    console.info("User find one started");
    try {
        const response = await findOneUserService(req.body);
        console.info("User find one completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};

export const findUsersController = async (req, res) => {
    console.info("User find all started");
    try {
        const response = await findUsersService(req.body);
        console.info("User find all completed");
        res.json(response);
    } catch (error) {
        console.error({message: error.message});
        res.status(400).json({message: error.message});
    }
};
