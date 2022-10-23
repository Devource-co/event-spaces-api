import { MigrationInterface, QueryRunner } from 'typeorm';

export class week91666529147099 implements MigrationInterface {
  name = 'week91666529147099';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category_activity" ADD CONSTRAINT "UQ_004925c2e1eca6f7f83cf913958" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "UQ_e0098522faf604f4f29ba54bba4" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "UQ_e0098522faf604f4f29ba54bba4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category_activity" DROP CONSTRAINT "UQ_004925c2e1eca6f7f83cf913958"`,
    );
  }
}
