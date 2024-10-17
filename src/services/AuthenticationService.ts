import { inject, injectable } from "inversify";
import IAuthenticationService from "../interfaces/IAuthenticationService";
import { IUsers } from "../interfaces/IUsers";
import { passwordHash, verifyPassword } from "../utils/bycrypt";
import IUserRepository from "../interfaces/IUserRepository";
import { generateOtp, sendOtp } from "../utils/otp";
import IOtpRepository from "../interfaces/IOtpRepository";
import CustomError from "../errors/CustomError";
import { IOtps } from "../interfaces/IOtps";
import { generateToken } from "../utils/token";


@injectable()
export default class AuthenticationService implements IAuthenticationService {

    private userRepository: IUserRepository
    private otpRepository: IOtpRepository

    constructor(
        @inject("IUserRepository") userRepository: IUserRepository,
        @inject("IOtpRepository") otpRepository: IOtpRepository
    ) {
        this.userRepository = userRepository
        this.otpRepository = otpRepository
    }

    async signup(data: IUsers) {
        console.log(data)
        const user = await this.userRepository.findByEmail(data.email)
        console.log(user)
        if (user) {
            if (user.verified) {
                throw new CustomError("user already exist", 409)
            } else {
                await this.newOtp({ email: user.email, context: "signup" })
                return {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    created_at: user.created_at,
                    verified: user.verified,
                    role: user.role
                }
            }
        }
        data.password = await passwordHash(data.password)
        const result = await this.userRepository.create(data)
        await this.newOtp({ email: result.email, context: "signup" })
        return result
    }

    async newOtp(data: { email: string, context: string }) {
        const otp = generateOtp()
        const otpObj = {
            email: data.email,
            otp: `${otp}`,
            context: data.context
        }
        const result = await this.otpRepository.create(otpObj)
        sendOtp(result.email, result.otp)
    }

    async verifyOtp(data: IOtps) {
        const status = await this.otpRepository.verifyOtp(data.email, data.otp, data.context)
        if (status) {
            const result = await this.userRepository.updateByEmail(data.email, { verified: true })
            if (!result) {
                throw new CustomError("User not found", 404)
            }
        } else {
            throw new CustomError("Unauthoroized", 401)
        }
    }

    async login(data: Partial<IUsers>) {
        const existUser = await this.userRepository.findByEmail(data.email!)
        if (existUser) {
            if(!existUser.verified){
                throw new CustomError("email or password is incorrect", 404)
            }
            const result = await verifyPassword(data.password!, existUser.password)
            if (result) {
                const token = generateToken({ id: existUser._id!, email: existUser.email, name: existUser.name, role: existUser.role })
                return { token, name: existUser.name, role: existUser.role }
            } else {
                throw new CustomError("email or password is incorrect", 404)
            }
        } else {
            throw new CustomError("email or password is incorrect", 404)
        }
    }
}