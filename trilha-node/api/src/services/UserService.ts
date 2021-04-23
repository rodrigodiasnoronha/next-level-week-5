import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../database/repositories/UserRepository'

interface ServiceCreateDTO {
    email: string
}

export class UserService {
    private userRepository = getCustomRepository(UserRepository)

    async create({ email }: ServiceCreateDTO) {
        const userAlreadyExists = await this.userRepository.findOne({ email })

        if (userAlreadyExists) {
            return userAlreadyExists
        } else {
            const user = this.userRepository.create({ email })
            await this.userRepository.save(user)

            return user
        }
    }
}
