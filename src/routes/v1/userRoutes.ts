import express, { NextFunction, Response } from 'express'
import { container } from '../../config/inversify/inversify'
import { CustomRequest } from '../../interfaces/CustomRequest'
import { IServiceController } from '../../interfaces/IServiceController'
import { IBookingController } from '../../interfaces/IBookingController'
import { validate } from '../../middlewares/validator'
import { bookingSchema } from '../../schemas/bookingSchema'

const router = express.Router()

const serviceController = container.get<IServiceController>("IServiceController")
const bookingController = container.get<IBookingController>("IBookingController")

router.get('/services', (req: CustomRequest, res: Response, next: NextFunction) => serviceController.getAllAvailableService(req, res, next))
router.post('/services/:serviceId/book',validate(bookingSchema), (req: CustomRequest, res: Response, next: NextFunction) => bookingController.bookService(req, res, next))




export default router