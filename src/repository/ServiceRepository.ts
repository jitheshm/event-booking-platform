import { injectable } from "inversify";
import { IServiceRepository } from "../interfaces/IServiceRepository";
import { IServices } from "../interfaces/IServices";
import Services from "../models/ServiceModel";

@injectable()
export default class ServiceRepository implements IServiceRepository {
    async create(data: Omit<IServices, "_id">) {
        try {
            const service = new Services(data)
            await service.save()
            return service as IServices
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}