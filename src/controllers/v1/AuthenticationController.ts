import { inject, injectable } from "inversify";
import IAuthenticationController from "../../interfaces/IAuthenticationController";
import { NextFunction, Request, Response } from "express";
import IAuthenticationService from "../../interfaces/IAuthenticationService";

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
            res.status(201).json({ success: true, data: response })

        } catch (error) {
            next(error)
        }
    }
}