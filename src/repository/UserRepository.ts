import { injectable } from "inversify";
import IUserRepository from "../interfaces/IUserRepository";
import { IUsers } from "../interfaces/IUsers";
import Users from "../models/UserModel";
import { Types } from "mongoose";

@injectable()
export default class UserRepository implements IUserRepository {
    async create(data: IUsers) {
        try {
            const user = new Users(data)
            await user.save()

            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                created_at: user.created_at,
                role: user.role,
                mobile: user.mobile,
                verified: user.verified
            };
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async findByEmail(email: string) {
        try {
            const user = await Users.findOne({ email: email })
            return user as IUsers
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async updateByEmail(email: string, data: Partial<IUsers>) {
        try {
            return await Users.findOneAndUpdate({ email: email }, {
                $set: data
            }, { new: true }) as IUsers

        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async findById(id: Types.ObjectId) {
        try {
            const user = await Users.findOne({ _id: id }, { password: 0 })
            return user as Omit<IUsers,"password">
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}