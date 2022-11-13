import { MigrationInterface, QueryRunner } from 'typeorm';

export class week9D1667728695008 implements MigrationInterface {
  name = 'week9D1667728695008';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_27a2205a3309e0ed23d9254b3d5"`,
    );
    await queryRunner.query(`ALTER TABLE "space" DROP COLUMN "rate_id"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "space" ADD "rate_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_27a2205a3309e0ed23d9254b3d5" FOREIGN KEY ("rate_id") REFERENCES "rate"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
