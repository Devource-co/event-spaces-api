import { MigrationInterface, QueryRunner } from 'typeorm';

export class week9H1668253729882 implements MigrationInterface {
  name = 'week9H1668253729882';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booked_date" ADD "date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ALTER COLUMN "payment_id" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booking" ALTER COLUMN "payment_id" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "booked_date" DROP COLUMN "date"`);
  }
}
