import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from "typeorm"
import { v4 as uuid } from "uuid"

@Entity("settings")
export class Setting {
    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }

    @PrimaryColumn("uuid")
    id: string

    @Column()
    username: string

    @Column()
    chat: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
