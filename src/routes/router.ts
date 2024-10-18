import express from 'express'
import authenticationRouterV1 from './v1/authenticationRoutes'
import providerRouterV1 from './v1/providerRoutes'
import tokenDecode from '../middlewares/tokenDecode'
import providerRoleVerify from '../middlewares/providerRoleVerify'

const router = express.Router()

router.use('/v1/auth', authenticationRouterV1)
router.use('/v1/provider', tokenDecode, providerRoleVerify, providerRouterV1)

export default router