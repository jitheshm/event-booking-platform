import express from 'express'
import IAuthenticationController from '../../interfaces/IAuthenticationController'
import { container } from '../../config/inversify/inversify'
import { validate } from '../../middlewares/validator'
import { userSchema } from '../../schemas/userSchema'
import { otpSchema } from '../../schemas/otpSchema'
import { loginSchema } from '../../schemas/loginSchema'

const router = express.Router()

const authController = container.get<IAuthenticationController>("IAuthenticationController")


router.post('/signup', validate(userSchema), (req, res, next) => authController.signup(req, res, next))
router.post('/otp/verify', validate(otpSchema), (req, res, next) => authController.otpVerify(req, res, next))
router.post('/login', validate(loginSchema), (req, res, next) => authController.login(req, res, next))

export default router 