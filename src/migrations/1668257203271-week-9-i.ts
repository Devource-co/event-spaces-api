import { MigrationInterface, QueryRunner } from 'typeorm';

export class week9I1668257203271 implements MigrationInterface {
  name = 'week9I1668257203271';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "space-day-idx" ON "space_schedule" ("day") `,
    );
    await queryRunner.query(
      `CREATE INDEX "space-opening-time-idx" ON "space_schedule" ("opening_time") `,
    );
    await queryRunner.query(
      `CREATE INDEX "space-closing-time-idx" ON "space_schedule" ("closing_time") `,
    );
    await queryRunner.query(
      `CREATE INDEX "booked-date-idx" ON "booked_date" ("date") `,
    );
    await queryRunner.query(
      `CREATE INDEX "booked-start-time-idx" ON "booked_date" ("start_time") `,
    );
    await queryRunner.query(
      `CREATE INDEX "booked-end-time-idx" ON "booked_date" ("end_time") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."booked-end-time-idx"`);
    await queryRunner.query(`DROP INDEX "public"."booked-start-time-idx"`);
    await queryRunner.query(`DROP INDEX "public"."booked-date-idx"`);
    await queryRunner.query(`DROP INDEX "public"."space-closing-time-idx"`);
    await queryRunner.query(`DROP INDEX "public"."space-opening-time-idx"`);
    await queryRunner.query(`DROP INDEX "public"."space-day-idx"`);
  }
}
