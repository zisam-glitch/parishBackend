import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, location, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            location,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        res.status(500).json("Failed to create the user");
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json("Email not found");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json("Wrong password");
        }
        const userToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "30d" }
        );
        const { password: userPassword, createdAt, updatedAt, ...userData } = user.toObject();
        res.status(200).json({ ...userData, token: userToken });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
