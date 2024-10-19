import express, { NextFunction, Response } from 'express'
import { container } from '../../config/inversify/inversify'
import { CustomRequest } from '../../interfaces/CustomRequest'
import { IServiceController } from '../../interfaces/IServiceController'

const router = express.Router()

const serviceController = container.get<IServiceController>("IServiceController")

router.get('/services', (req: CustomRequest, res: Response, next: NextFunction) => serviceController.getAllAvailableService(req, res, next))




export default router