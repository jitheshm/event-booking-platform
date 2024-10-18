import { Request } from "express"
import jwt from "jsonwebtoken";
export interface CustomRequest extends Request {
    decodeData?: jwt.JwtPayload
}