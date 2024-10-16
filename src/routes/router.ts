import express from 'express'
import serviceProviderRouterv1 from './v1/serviceProviderRouter'

const router = express.Router()

router.use('/v1/provider', serviceProviderRouterv1)

export default router