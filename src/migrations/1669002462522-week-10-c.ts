import { MigrationInterface, QueryRunner } from 'typeorm';

export class week10C1669002462522 implements MigrationInterface {
  name = 'week10C1669002462522';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space_activities_activity" DROP CONSTRAINT "FK_4d7ba99d18c77dafb582df9adf5"`,
    );
    await queryRunner.query(`ALTER TABLE "address" ADD "distance" integer`);
    await queryRunner.query(
      `ALTER TABLE "space" ADD COLUMN IF NOT EXISTS "document_with_weights" tsvector NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e0098522faf604f4f29ba54bba" ON "activity" ("name") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_9db739b348060230262f3d7fb5" ON "space_type" ("name") `,
    );
    await queryRunner.query(
      `ALTER TABLE "space_activities_activity" ADD CONSTRAINT "FK_4d7ba99d18c77dafb582df9adf5" FOREIGN KEY ("activityId") REFERENCES "activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space_activities_activity" DROP CONSTRAINT "FK_4d7ba99d18c77dafb582df9adf5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9db739b348060230262f3d7fb5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e0098522faf604f4f29ba54bba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" DROP COLUMN "document_with_weights"`,
    );
    await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "distance"`);
    await queryRunner.query(
      `ALTER TABLE "space_activities_activity" ADD CONSTRAINT "FK_4d7ba99d18c77dafb582df9adf5" FOREIGN KEY ("activityId") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
