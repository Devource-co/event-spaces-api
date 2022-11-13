import { MigrationInterface, QueryRunner } from 'typeorm';

export class week9F1667792125017 implements MigrationInterface {
  name = 'week9F1667792125017';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "space" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "space" DROP COLUMN "deletedAt"`);
  }
}
