import { MigrationInterface, QueryRunner } from "typeorm";

export class week8A1665811295724 implements MigrationInterface {
    name = 'week8A1665811295724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "space" DROP CONSTRAINT "FK_27a2205a3309e0ed23d9254b3d5"`);
        await queryRunner.query(`ALTER TABLE "space" DROP CONSTRAINT "UQ_27a2205a3309e0ed23d9254b3d5"`);
        await queryRunner.query(`ALTER TABLE "space" ADD CONSTRAINT "FK_27a2205a3309e0ed23d9254b3d5" FOREIGN KEY ("rate_id") REFERENCES "rate"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "space" DROP CONSTRAINT "FK_27a2205a3309e0ed23d9254b3d5"`);
        await queryRunner.query(`ALTER TABLE "space" ADD CONSTRAINT "UQ_27a2205a3309e0ed23d9254b3d5" UNIQUE ("rate_id")`);
        await queryRunner.query(`ALTER TABLE "space" ADD CONSTRAINT "FK_27a2205a3309e0ed23d9254b3d5" FOREIGN KEY ("rate_id") REFERENCES "rate"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
