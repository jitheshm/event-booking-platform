import express from 'express'
import authenticationRouterV1 from './v1/authenticationRoutes'
import providerRouterV1 from './v1/providerRoutes'
import userRouterV1 from './v1/userRoutes'
import tokenDecode from '../middlewares/tokenDecode'
import providerRoleVerify from '../middlewares/providerRoleVerify'
import userRoleVerify from '../middlewares/userRoleVerify'

const router = express.Router()

router.use('/v1/auth', authenticationRouterV1)
router.use('/v1/provider', tokenDecode, providerRoleVerify, providerRouterV1)
router.use('/v1/user', tokenDecode, userRoleVerify, userRouterV1)

export default router