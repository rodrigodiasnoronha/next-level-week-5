import { Request, Response } from 'express'
import { SettingService } from '../services/SettingService'

export class SetttingController {
    async create(request: Request, response: Response) {
        const { chat, username } = request.body

        const settingService = new SettingService()

        try {
            const setting = await settingService.create({ chat, username })

            return response.json({ setting })
        } catch (err) {
            return response.status(400).json({
                message: err.message,
            })
        }
    }
}
