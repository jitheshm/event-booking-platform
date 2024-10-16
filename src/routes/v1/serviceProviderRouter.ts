import express from 'express'
import { container } from '../../config/inversify'
import IAuthenticationController from '../../interfaces/IAuthenticationController'

const router = express.Router()

const authController = container.get<IAuthenticationController>("IAuthenticationController")


router.post('/signup', authController.signup)

export default router 