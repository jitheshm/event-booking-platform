import { injectable } from "inversify";
import { IServiceRepository } from "../interfaces/IServiceRepository";
import { IServices, ServiceInput, ServiceWithContact } from "../interfaces/IServices";
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
    async findService(providerId: Types.ObjectId): Promise<ServiceWithContact[]> {
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

    async findAllAvailableService(
        priceRange?: { min: number; max: number },
        category?: string,
        location?: string,
        availabilityDate?: Date,
        search?: string
    ): Promise<ServiceWithContact[]> {
        try {
            const matchCriteria: any = {
                "is_deleted": false
            };

            if (priceRange) {
                matchCriteria.price_per_day = {
                    $gte: priceRange.min,
                    $lte: priceRange.max
                };
            }

            if (category) {
                matchCriteria.category = category;
            }

            if (location) {
                matchCriteria.location = location;
            }

            if (availabilityDate) {
                matchCriteria.availability_dates = {
                    $elemMatch: {
                        date: { $gte: availabilityDate },
                        status: 'open'
                    }
                };
            }

            if (search) {
                matchCriteria.$or = [
                    { title: { $regex: search, $options: 'i' } },   // Case-insensitive search on title
                    { description: { $regex: search, $options: 'i' } } // Case-insensitive search on description
                ];
            }

            return await Services.aggregate<ServiceWithContact>([
                {
                    $match: matchCriteria
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
            ]);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}