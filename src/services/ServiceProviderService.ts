import { JwtPayload } from "jsonwebtoken";
import { ServiceInput } from "../interfaces/IServices";
import { IServiceRepository } from "../interfaces/IServiceRepository";
import { inject, injectable } from "inversify";
import { Types } from "mongoose";
import { IServiceProviderService } from "../interfaces/IServiceProviderService";

@injectable()
export default class ServiceProviderService implements IServiceProviderService {
    private serviceRepository: IServiceRepository
    constructor(
        @inject("IServiceRepository") serviceRepository: IServiceRepository
    ) {
        this.serviceRepository = serviceRepository
    }

    async createService(data: ServiceInput, decodeData: JwtPayload) {
        data.availability_dates=data.availability_dates.map((ele)=>new Date(ele))
        return await this.serviceRepository.create({ ...data, service_provider_id: new Types.ObjectId(decodeData.id) })
    }
}