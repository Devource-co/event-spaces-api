import { MigrationInterface, QueryRunner } from "typeorm";

export class week6B1663492310633 implements MigrationInterface {
    name = 'week6B1663492310633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "space_type" RENAME COLUMN "url" TO "cover_image"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "space_type" RENAME COLUMN "cover_image" TO "url"`);
    }

}
