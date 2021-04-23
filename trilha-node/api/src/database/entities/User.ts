import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('users')
export class User {
    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

    @PrimaryColumn('uuid')
    id: string

    @Column()
    email: string

    @CreateDateColumn()
    created_at: Date
}
