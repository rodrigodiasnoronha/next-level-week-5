import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SettingsRepository } from '../repositories/SettingRepository'

export class SetttingController {
    async create(request: Request, response: Response) {
        const { chat, username } = request.body

        const settingRepository = getCustomRepository(SettingsRepository)

        const settings = settingRepository.create({ chat, username })
        await settingRepository.save(settings)

        return response.status(201).json({ settings })
    }
}
