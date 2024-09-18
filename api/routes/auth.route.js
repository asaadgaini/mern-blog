import express from 'express'
const router = express.Router()
import { signin, signup } from '../controllers/auth.controllers.js'


router.post("/signup" , signup)
router.post("/signin" , signin)

export default router