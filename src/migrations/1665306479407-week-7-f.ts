import { MigrationInterface, QueryRunner } from 'typeorm';

export class week7F1665306479407 implements MigrationInterface {
  name = 'week7F1665306479407';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_491151f20c95f76f03f57f2a7e3"`,
    );
    await queryRunner.query(`ALTER TABLE "space" ADD "rate_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "UQ_27a2205a3309e0ed23d9254b3d5" UNIQUE ("rate_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "price" TYPE numeric(2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "price" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_491151f20c95f76f03f57f2a7e3" FOREIGN KEY ("cancellation_policy_id") REFERENCES "cancellation_policy"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_27a2205a3309e0ed23d9254b3d5" FOREIGN KEY ("rate_id") REFERENCES "rate"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_27a2205a3309e0ed23d9254b3d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_491151f20c95f76f03f57f2a7e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "price" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "price" TYPE numeric(2,0)`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "UQ_27a2205a3309e0ed23d9254b3d5"`,
    );
    await queryRunner.query(`ALTER TABLE "space" DROP COLUMN "rate_id"`);
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_491151f20c95f76f03f57f2a7e3" FOREIGN KEY ("cancellation_policy_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
