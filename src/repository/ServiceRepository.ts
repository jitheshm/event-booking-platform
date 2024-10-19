import { injectable } from "inversify";
import { IServiceRepository } from "../interfaces/IServiceRepository";
import { IServices, ServiceInput } from "../interfaces/IServices";
import Services from "../models/ServiceModel";
import { Types } from "mongoose";

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
    async findService(providerId: Types.ObjectId) {
        try {
            return await Services.aggregate([
                {
                    $match: {
                        "service_provider_id": providerId,
                        "is_deleted": false
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "service_provider_id",
                        foreignField: "_id",
                        pipeline: [
                            {
                                $project: {
                                    "name": 1,
                                    "email": 1,
                                    "mobile": 1,
                                    "_id": 0
                                }
                            }
                        ],
                        as: "contact_details"
                    }
                },
                {
                    $unwind: "$contact_details"
                }

            ])
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async updateService(providerId: Types.ObjectId, id: Types.ObjectId, data: Partial<ServiceInput>) {
        try {
            const result = await Services.findOneAndUpdate({ _id: id, service_provider_id: providerId, is_deleted: false }, {
                $set: data
            }, {
                new: true
            })
            return result as IServices | null
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}