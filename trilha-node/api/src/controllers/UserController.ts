import { Request, Response } from 'express'
import { UserService } from '../services/UserService'

export class UserController {
    async create(request: Request, response: Response) {
        const { email } = request.body

        const userService = new UserService()
        const user = await userService.create({ email })

        return response.json({ user })
    }
}
