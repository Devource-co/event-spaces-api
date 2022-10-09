import { MigrationInterface, QueryRunner } from 'typeorm';

export class week6A1663481336360 implements MigrationInterface {
  name = 'week6A1663481336360';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space_type" ADD "url" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "space_type" DROP COLUMN "url"`);
  }
}
