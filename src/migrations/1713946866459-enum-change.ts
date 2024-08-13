import { MigrationInterface, QueryRunner } from 'typeorm';

export class enumChange1713946866459 implements MigrationInterface {
  name = 'enumChange1713946866459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."space_status_enum" RENAME TO "space_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."space_status_enum" AS ENUM('review', 'draft', 'active', 'rejected', 'inactive')`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "status" TYPE "public"."space_status_enum" USING "status"::"text"::"public"."space_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "status" SET DEFAULT 'draft'`,
    );
    await queryRunner.query(`DROP TYPE "public"."space_status_enum_old"`);
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "avg_rating" SET DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "avg_rating" SET DEFAULT '-1'`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."space_status_enum_old" AS ENUM('in review', 'draft', 'active', 'rejected', 'inactive')`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "status" TYPE "public"."space_status_enum_old" USING "status"::"text"::"public"."space_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "status" SET DEFAULT 'draft'`,
    );
    await queryRunner.query(`DROP TYPE "public"."space_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."space_status_enum_old" RENAME TO "space_status_enum"`,
    );
  }
}
