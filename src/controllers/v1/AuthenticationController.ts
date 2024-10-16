import { injectable } from "inversify";
import IAuthenticationController from "../../interfaces/IAuthenticationController";
import { NextFunction, Request, Response } from "express";

@injectable() 
export default class AuthenticationController implements IAuthenticationController {

    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body)

        } catch (error) {
            next(error)
        }
    }
}