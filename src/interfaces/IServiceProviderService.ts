import { JwtPayload } from "jsonwebtoken";
import { IServices, ServiceInput, ServiceWithContact } from "./IServices";

export interface IServiceProviderService {
    createService(data: ServiceInput, decodeData: JwtPayload): Promise<IServices>
    findService(decodeData: JwtPayload): Promise<ServiceWithContact[]>
    updateService(decodeData: JwtPayload, id: string, data: Partial<ServiceInput>): Promise<IServices>
    deleteService(decodeData: JwtPayload, id: string): Promise<IServices>
    findAllAvailable(priceRange?: {
        min: number;
        max: number;
    }, category?: string, location?: string, availabilityDate?: Date,search?: string): Promise<ServiceWithContact[]>
}