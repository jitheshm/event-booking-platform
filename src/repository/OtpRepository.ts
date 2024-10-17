import { injectable } from "inversify";
import { IOtps } from "../interfaces/IOtps";
import Otps from "../models/OtpModel";
import IOtpRepository from "../interfaces/IOtpRepository";

@injectable()
export default class OtpRepository implements IOtpRepository {
    async create(data: IOtps) {
        try {
            const otp = new Otps(data)
            await otp.save()

            return {
                email: otp.email,
                otp: otp.otp,
            };
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async verifyOtp(email: string, otp: string, context: string) {
        try {
            const existOtp = await Otps.findOne({ email: email, otp: otp, context: context })
            return existOtp ? true : false
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}