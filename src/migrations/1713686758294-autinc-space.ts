import { MigrationInterface, QueryRunner } from 'typeorm';

export class autincSpace1713686758294 implements MigrationInterface {
  name = 'autincSpace1713686758294';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space" ADD "public_id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b6b3f64835951215afce76bc4c" ON "space" ("public_id") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b6b3f64835951215afce76bc4c"`,
    );
    await queryRunner.query(`ALTER TABLE "space" DROP COLUMN "public_id"`);
  }
}
