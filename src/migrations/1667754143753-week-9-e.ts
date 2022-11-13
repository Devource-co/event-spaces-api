import { MigrationInterface, QueryRunner } from 'typeorm';

export class week9E1667754143753 implements MigrationInterface {
  name = 'week9E1667754143753';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."space_status_enum" AS ENUM('in review', 'draft', 'active', 'rejected', 'inactive')`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD "status" "public"."space_status_enum" NOT NULL DEFAULT 'draft'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "space" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."space_status_enum"`);
  }
}
