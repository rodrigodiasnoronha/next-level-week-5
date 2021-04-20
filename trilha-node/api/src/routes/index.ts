import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import { SettingsRepository } from '../database/repositories/SettingRepository'

import { SetttingController } from '../database/controllers/SettingController'

const settingController = new SetttingController()

const routes = Router()

routes.post('/settings', settingController.create)

export default routes
