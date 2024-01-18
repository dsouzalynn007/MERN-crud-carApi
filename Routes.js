import { Router } from "express"
let router = Router()
import carRoute from './apis/cars/allRoutes.js'

router.use("/cars", carRoute)

export default router