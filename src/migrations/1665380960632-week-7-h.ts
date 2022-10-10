import { MigrationInterface, QueryRunner } from 'typeorm';

export class week7H1665380960632 implements MigrationInterface {
  name = 'week7H1665380960632';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_4deb2587c578446b6543c2f2adc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_491151f20c95f76f03f57f2a7e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_27a2205a3309e0ed23d9254b3d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "UQ_491151f20c95f76f03f57f2a7e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_4deb2587c578446b6543c2f2adc" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_491151f20c95f76f03f57f2a7e3" FOREIGN KEY ("cancellation_policy_id") REFERENCES "cancellation_policy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_27a2205a3309e0ed23d9254b3d5" FOREIGN KEY ("rate_id") REFERENCES "rate"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
      `ALTER TABLE "space" DROP CONSTRAINT "FK_4deb2587c578446b6543c2f2adc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "UQ_491151f20c95f76f03f57f2a7e3" UNIQUE ("cancellation_policy_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_27a2205a3309e0ed23d9254b3d5" FOREIGN KEY ("rate_id") REFERENCES "rate"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_491151f20c95f76f03f57f2a7e3" FOREIGN KEY ("cancellation_policy_id") REFERENCES "cancellation_policy"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_4deb2587c578446b6543c2f2adc" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
