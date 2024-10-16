import { NextFunction, Request, Response } from "express"


export default interface IAuthenticationController {
    signup(req: Request, res: Response, next: NextFunction): Promise<void>
    // login(req: Request, res: Response, next: NextFunction): Promise<void>
}