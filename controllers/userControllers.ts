import { Request, Response } from "express";
import User from "../models/user";

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted successfully");
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json("User not found");
        }
        const { password, createdAt, updatedAt, ...userData } = user.toObject();
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
};
