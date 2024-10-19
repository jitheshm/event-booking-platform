import { Types } from "mongoose";
import { IServices, ServiceInput, ServiceWithContact } from "./IServices";

export interface IServiceRepository {
    create(data: Omit<IServices, "_id">): Promise<IServices>
    findService(providerId: Types.ObjectId): Promise<ServiceWithContact[]>
    updateService(providerId: Types.ObjectId,id: Types.ObjectId, data: Partial<ServiceInput>): Promise<IServices | null>
    findAllAvailableService(priceRange?: {
        min: number;
        max: number;
    }, category?: string, location?: string, availabilityDate?: Date): Promise<ServiceWithContact[]>
}