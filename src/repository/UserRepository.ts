import { injectable } from "inversify";
import IUserRepository from "../interfaces/IUserRepository";
import { IUsers } from "../interfaces/IUsers";
import Users from "../models/UserModel";

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
}