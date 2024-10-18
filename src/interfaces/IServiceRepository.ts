import { Types } from "mongoose";
import { IServices } from "./IServices";

export interface IServiceRepository {
    create(data: Omit<IServices, "_id">): Promise<IServices>
    findService(providerId: Types.ObjectId): Promise<IServices[]>
}