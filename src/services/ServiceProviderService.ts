import { JwtPayload } from "jsonwebtoken";
import { ServiceInput } from "../interfaces/IServices";
import { IServiceRepository } from "../interfaces/IServiceRepository";
import { inject, injectable } from "inversify";
import { Types } from "mongoose";
import { IServiceProviderService } from "../interfaces/IServiceProviderService";
import CustomError from "../errors/CustomError";

@injectable()
export default class ServiceProviderService implements IServiceProviderService {
    private serviceRepository: IServiceRepository
    constructor(
        @inject("IServiceRepository") serviceRepository: IServiceRepository
    ) {
        this.serviceRepository = serviceRepository
    }

    async createService(data: ServiceInput, decodeData: JwtPayload) {
        data.availability_dates = data.availability_dates.map((ele) => ({ date: new Date(ele.date), status: ele.status }))
        return await this.serviceRepository.create({ ...data, service_provider_id: new Types.ObjectId(decodeData.id) })
    }

    async findService(decodeData: JwtPayload) {
        return await this.serviceRepository.findService(new Types.ObjectId(decodeData.id))
    }

    async updateService(decodeData: JwtPayload, id: string, data: Partial<ServiceInput>) {
        const result = await this.serviceRepository.updateService(new Types.ObjectId(decodeData.id), new Types.ObjectId(id), data)
        if (!result) {
            throw new CustomError("Service not found", 404)
        }
        return result
    }

    async deleteService(decodeData: JwtPayload, id: string) {
        const result = await this.serviceRepository.updateService(new Types.ObjectId(decodeData.id), new Types.ObjectId(id), { is_deleted: true })
        if (!result) {
            throw new CustomError("Service not found", 404)
        }
        return result
    }

    async findAllAvailable(
        priceRange?: { min: number; max: number },
        category?: string,
        location?: string,
        availabilityDate?: Date
    ) {
        return await this.serviceRepository.findAllAvailableService(priceRange, category, location, availabilityDate)
    }
}