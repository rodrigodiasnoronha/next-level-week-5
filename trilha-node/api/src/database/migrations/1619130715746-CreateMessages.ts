import { MigrationInterface, QueryRunner, Table } from 'typeorm'

const table = new Table({
    name: 'messages',
    columns: [
        {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
        },
        {
            name: 'admin_id',
            type: 'uuid',
            isNullable: true,
        },
        {
            name: 'user_id',
            type: 'uuid',
        },
        {
            name: 'text',
            type: 'varchar',
        },
        {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
        },
    ],
    foreignKeys: [
        {
            name: 'fk_user',
            // min 42:00
        },
    ],
})

export class CreateMessages1619130715746 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(table)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(table)
    }
}
