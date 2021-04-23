import { MigrationInterface, QueryRunner, Table } from 'typeorm'

let table = new Table({
    name: 'users',
    columns: [
        {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
        },
        {
            name: 'email',
            type: 'varchar',
            isNullable: false,
        },
        {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
        },
    ],
})

export class CreateUsers1619128268610 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(table)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(table)
    }
}
