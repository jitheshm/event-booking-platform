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

    async getAllService(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const decodeData = req.decodeData as JwtPayload
            const result = await this.servicePService.findService(decodeData)
            res.status(200).json({ success: true, data: result, message: "Services fetched successfully" })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async updateService(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const decodeData = req.decodeData as JwtPayload
            const data = req.body as Partial<ServiceInput>
            const id = req.params.serviceId
            const result = await this.servicePService.updateService(decodeData, id, data)
            res.status(200).json({ success: true, data: result, message: "service updated successfully" })
        }
        catch (error) {
            console.log(error)
            next(error)
        }
    }

    async deleteService(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const decodeData = req.decodeData as JwtPayload
            const id = req.params.serviceId
            const result = await this.servicePService.deleteService(decodeData, id)
            res.status(200).json({ success: true, data: result, message: "service deleted successfully" })
        }
        catch (error) {
            console.log(error)
            next(error)
        }
    }
}