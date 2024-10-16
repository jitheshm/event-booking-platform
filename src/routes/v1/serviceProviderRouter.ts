import express from 'express'
import IAuthenticationController from '../../interfaces/IAuthenticationController'
import { container } from '../../config/inversify/inversify'

const router = express.Router()

const authController = container.get<IAuthenticationController>("IAuthenticationController")


router.post('/signup', (req, res, next) => authController.signup(req, res, next))

export default router 