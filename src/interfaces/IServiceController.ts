import { NextFunction, Response } from "express";
import { CustomRequest } from "./CustomRequest";

export interface IServiceController {
    createService(req: CustomRequest, res: Response, next: NextFunction): Promise<void>
    getAllService(req: CustomRequest, res: Response, next: NextFunction): Promise<void>
    updateService(req: CustomRequest, res: Response, next: NextFunction): Promise<void>
    deleteService(req: CustomRequest, res: Response, next: NextFunction): Promise<void>
    getAllAvailableService(req: CustomRequest, res: Response, next: NextFunction): Promise<void>
}