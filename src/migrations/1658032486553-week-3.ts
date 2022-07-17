import { MigrationInterface, QueryRunner } from 'typeorm';

export class week31658032486553 implements MigrationInterface {
  name = 'week31658032486553';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" ADD "d_lat" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD "d_long" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "d_long"`);
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "d_lat"`);
  }
}
