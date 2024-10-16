import { Types } from "mongoose";

export interface IUsers {
    _id?: Types.ObjectId
    name: string;
    email: string;
    created_at: Date;
    password: string;
    role: string;
    verified?:boolean
}