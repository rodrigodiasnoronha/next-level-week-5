import { MigrationInterface, QueryRunner, Table } from "typeorm"

let table = new Table({
    name: "settings",
    columns: [
        {
            name: "id",
            isUnique: true,
            isPrimary: true,
            type: "uuid",
            comment: "Primary Key da entidade",
        },
        {
            name: "username",
            comment: "Nome de usuário",
            type: "varchar",
        },
        {
            name: "chat",
            type: "boolean",
            default: true,
        },
        {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
        },
        {
            name: "created_at",
            type: "timestamp",
            default: "now()",
        },
    ],
})

export class CreateSettings1618946425615 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(table)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable(table)
    }
}
