import { MigrationInterface, QueryRunner } from 'typeorm';

export class week9J1668312641379 implements MigrationInterface {
  name = 'week9J1668312641379';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."booked-date-idx"`);
    await queryRunner.query(`ALTER TABLE "booked_date" DROP COLUMN "date"`);
    await queryRunner.query(
      `ALTER TABLE "booked_date" ADD "date" date NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "booked-date-idx" ON "booked_date" ("date") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."booked-date-idx"`);
    await queryRunner.query(`ALTER TABLE "booked_date" DROP COLUMN "date"`);
    await queryRunner.query(
      `ALTER TABLE "booked_date" ADD "date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "booked-date-idx" ON "booked_date" ("date") `,
    );
  }
}
