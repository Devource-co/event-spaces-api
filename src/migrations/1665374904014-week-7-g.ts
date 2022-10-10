import { MigrationInterface, QueryRunner } from 'typeorm';

export class week7G1665374904014 implements MigrationInterface {
  name = 'week7G1665374904014';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cancellation_policy" DROP COLUMN "hoursBeforeExpiry"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cancellation_policy" ADD "hoursBeforeExpiry" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "price" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "price" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "price" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "price" TYPE numeric(2,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "cancellation_policy" DROP COLUMN "hoursBeforeExpiry"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cancellation_policy" ADD "hoursBeforeExpiry" text NOT NULL`,
    );
  }
}
