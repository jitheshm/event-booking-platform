import { inject, injectable } from "inversify";
import IAuthenticationService from "../interfaces/IAuthenticationService";
import { IUsers } from "../interfaces/IUsers";
import { passwordHash } from "../utils/bycrypt";
import IUserRepository from "../interfaces/IUserRepository";
import { generateOtp, sendOtp } from "../utils/otp";
import IOtpRepository from "../interfaces/IOtpRepository";


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
        data.password = await passwordHash(data.password)
        const result = await this.userRepository.create(data)
        this.newOtp({ email: result.email, context: "signup" })
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
}