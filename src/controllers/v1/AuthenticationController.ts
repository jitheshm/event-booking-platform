import { inject, injectable } from "inversify";
import IAuthenticationController from "../../interfaces/IAuthenticationController";
import { NextFunction, Request, Response } from "express";
import IAuthenticationService from "../../interfaces/IAuthenticationService";
import { IOtps } from "../../interfaces/IOtps";

@injectable()
export default class AuthenticationController implements IAuthenticationController {
    private authenticationService: IAuthenticationService

    constructor(
        @inject("IAuthenticationService") authenticationService: IAuthenticationService
    ) {
        this.authenticationService = authenticationService
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body
            const response = await this.authenticationService.signup(data)
            res.status(201).json({ success: true, data: response, message: "otp send successfully" })

        } catch (error) {
            next(error)
        }
    }

    async otpVerify(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body as IOtps
            await this.authenticationService.verifyOtp(data)
            res.status(200).json({ success: true, message: "user verified successfully" })
        } catch (error) {
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body as { email: string, password: string, role: string }
            const { token, ...result } = await this.authenticationService.login(data)
            res.cookie('eventToken', token, {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 1000
            });

            res.status(200).json({ success: true, data: result, message: "user login successfully" })


        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}