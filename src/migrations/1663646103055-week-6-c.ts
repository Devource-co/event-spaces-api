import { MigrationInterface, QueryRunner } from 'typeorm';

export class week6C1663646103055 implements MigrationInterface {
  name = 'week6C1663646103055';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "space" DROP COLUMN "max_guests"`);
    await queryRunner.query(`ALTER TABLE "space" ADD "max_guests" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "space" DROP COLUMN "max_guests"`);
    await queryRunner.query(
      `ALTER TABLE "space" ADD "max_guests" character varying`,
    );
  }
}
