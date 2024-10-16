import { Types } from "mongoose";

export interface IOtps {
    id?: Types.ObjectId
    email: string;
    created_at?: Date;
    otp: string;
    context: string

}