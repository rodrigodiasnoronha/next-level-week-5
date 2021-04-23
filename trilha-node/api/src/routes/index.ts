import { Router } from 'express'

import { SetttingController } from '../controllers/SettingController'
import { UserController } from '../controllers/UserController'

const settingController = new SetttingController()
const userController = new UserController()

const routes = Router()

routes.post('/settings', settingController.create)

routes.post('/users', userController.create)

export default routes
