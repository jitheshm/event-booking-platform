import express from 'express'
import authenticationRouterV1 from './v1/authenticationRoutes'

const router = express.Router()

router.use('/v1/auth', authenticationRouterV1)

export default router