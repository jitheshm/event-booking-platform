import jwt from 'jsonwebtoken'
import { Types } from 'mongoose'
const secret=process.env.JWT_SECRET as string

export const generateToken=(data:{id:Types.ObjectId,email:string,name:string,role:string})=>{
    return jwt.sign(data,secret,{expiresIn:"1h"})
}

