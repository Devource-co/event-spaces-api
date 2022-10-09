import { MigrationInterface, QueryRunner } from 'typeorm';

export class week6H1663680251817 implements MigrationInterface {
  name = 'week6H1663680251817';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space_rule" ADD "active" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "space_rule" DROP COLUMN "active"`);
  }
}
