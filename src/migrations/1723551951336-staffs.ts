import { MigrationInterface, QueryRunner } from 'typeorm';

export class staffs1723551951336 implements MigrationInterface {
  name = 'staffs1723551951336';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "isPasswordUpdated" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "password" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "firstname" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "lastname" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "phone" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "phone" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "lastname" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "firstname" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "password" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP COLUMN "isPasswordUpdated"`,
    );
  }
}
