import { getCustomRepository } from 'typeorm'
import { SettingsRepository } from '../database/repositories/SettingRepository'

interface ServiceCreateDTO {
    chat: boolean
    username: string
}

export class SettingService {
    private settingRepository = getCustomRepository(SettingsRepository)

    async create({ chat, username }: ServiceCreateDTO) {
        const userAlreadyExists = await this.settingRepository.findOne({ username })

        if (userAlreadyExists) {
            throw new Error('User already exists')
        }

        const setting = this.settingRepository.create({ chat, username })
        await this.settingRepository.save(setting)

        return setting
    }
}
