import { JwtPayload } from "jsonwebtoken";
import { IServices, ServiceInput } from "./IServices";

export interface IServiceProviderService {
    createService(data: ServiceInput, decodeData: JwtPayload): Promise<IServices>
    findService(decodeData: JwtPayload): Promise<IServices[]>
}