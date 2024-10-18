import express, { NextFunction, Response } from 'express'
import { CustomRequest } from '../../interfaces/CustomRequest'
import { container } from '../../config/inversify/inversify'
import { IServiceController } from '../../interfaces/IServiceController'
import { validate } from '../../middlewares/validator'
import { serviceSchema } from '../../schemas/serviceSchema'

const router = express.Router()

const serviceController = container.get<IServiceController>("IServiceController")

router.post('/service', validate(serviceSchema), (req: CustomRequest, res: Response, next: NextFunction) => serviceController.createService(req, res, next))


export default router