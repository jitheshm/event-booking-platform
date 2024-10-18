import { Response, NextFunction } from "express";
import { ServiceInput } from "../../interfaces/IServices";
import { CustomRequest } from "../../interfaces/CustomRequest";
import { IServiceProviderService } from "../../interfaces/IServiceProviderService";
import { inject, injectable } from "inversify";
import { JwtPayload } from "jsonwebtoken";
import { IServiceController } from "../../interfaces/IServiceController";

@injectable()
export default class ServiceController implements IServiceController {
    private servicePService: IServiceProviderService
    constructor(
        @inject("IServiceProviderService") servicePService: IServiceProviderService
    ) {
        this.servicePService = servicePService
    }

    async createService(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const data = req.body as ServiceInput
            const decodeData = req.decodeData as JwtPayload
            const result = await this.servicePService.createService(data, decodeData)
            res.status(201).json({ success: true, data: result, message: "Service added successfully" })

        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}