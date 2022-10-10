import { MigrationInterface, QueryRunner } from 'typeorm';

export class week7E1665305912959 implements MigrationInterface {
  name = 'week7E1665305912959';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "rate" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, "frequency" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2618d0d38af322d152ccc328f33" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD "cancellation_policy_id" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "UQ_491151f20c95f76f03f57f2a7e3" UNIQUE ("cancellation_policy_id")`,
    );
    await queryRunner.query(`ALTER TABLE "space" ADD "price" numeric(2)`);
    await queryRunner.query(
      `ALTER TABLE "space" ADD "minimumDuaration" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_491151f20c95f76f03f57f2a7e3" FOREIGN KEY ("cancellation_policy_id") REFERENCES "address"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_491151f20c95f76f03f57f2a7e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" DROP COLUMN "minimumDuaration"`,
    );
    await queryRunner.query(`ALTER TABLE "space" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "UQ_491151f20c95f76f03f57f2a7e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" DROP COLUMN "cancellation_policy_id"`,
    );
    await queryRunner.query(`DROP TABLE "rate"`);
  }
}
