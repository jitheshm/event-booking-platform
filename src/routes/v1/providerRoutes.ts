import express, { NextFunction, Response } from 'express'
import { CustomRequest } from '../../interfaces/CustomRequest'
import { container } from '../../config/inversify/inversify'
import { IServiceController } from '../../interfaces/IServiceController'
import { validate } from '../../middlewares/validator'
import { serviceSchema } from '../../schemas/serviceSchema'
import { updateServiceSchema } from '../../schemas/updateServiceSchema'
import { IBookingController } from '../../interfaces/IBookingController'

const router = express.Router()

const serviceController = container.get<IServiceController>("IServiceController")
const bookingController = container.get<IBookingController>("IBookingController")

router.post('/services', validate(serviceSchema), (req: CustomRequest, res: Response, next: NextFunction) => serviceController.createService(req, res, next))
router.get('/services', (req: CustomRequest, res: Response, next: NextFunction) => serviceController.getAllService(req, res, next))
router.patch('/services/:serviceId', validate(updateServiceSchema), (req: CustomRequest, res: Response, next: NextFunction) => serviceController.updateService(req, res, next))
router.delete('/services/:serviceId', (req: CustomRequest, res: Response, next: NextFunction) => serviceController.deleteService(req, res, next))
router.get('/services/:serviceId/bookings', (req: CustomRequest, res: Response, next: NextFunction) => bookingController.serviceBookingList(req, res, next))



export default router