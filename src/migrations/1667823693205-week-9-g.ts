import { MigrationInterface, QueryRunner } from 'typeorm';

export class week9G1667823693205 implements MigrationInterface {
  name = 'week9G1667823693205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space" RENAME COLUMN "minimumDuaration" TO "minimumDuration"`,
    );
    await queryRunner.query(
      `CREATE TABLE "booked_date" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "booking_id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7f9307a5bfc67e89664bb92f15c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "booking" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "booked_date" ADD CONSTRAINT "FK_769f994d59875187ce3bf9ad6fe" FOREIGN KEY ("booking_id") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "booked_date" DROP CONSTRAINT "FK_769f994d59875187ce3bf9ad6fe"`,
    );
    await queryRunner.query(`ALTER TABLE "booking" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`DROP TABLE "booked_date"`);
    await queryRunner.query(
      `ALTER TABLE "space" RENAME COLUMN "minimumDuration" TO "minimumDuaration"`,
    );
  }
}
