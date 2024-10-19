import { Types } from "mongoose";
import { IServices, ServiceInput } from "./IServices";

export interface IServiceRepository {
    create(data: Omit<IServices, "_id">): Promise<IServices>
    findService(providerId: Types.ObjectId): Promise<IServices[]>
    updateService(providerId: Types.ObjectId,id: Types.ObjectId, data: Partial<ServiceInput>): Promise<IServices | null>
}