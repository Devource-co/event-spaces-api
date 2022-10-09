import { MigrationInterface, QueryRunner } from 'typeorm';

export class week7C1665210062686 implements MigrationInterface {
  name = 'week7C1665210062686';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "space_schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "day" smallint NOT NULL, "space_id" uuid NOT NULL, "is_set_time" boolean NOT NULL DEFAULT false, "opening_time" TIME, "closing_time" TIME, "isOpened" boolean, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1c59fb57dd560f0f640aa6324fc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_schedule" ADD CONSTRAINT "FK_93e9a0de32b68cd6242db75ca32" FOREIGN KEY ("space_id") REFERENCES "space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space_schedule" DROP CONSTRAINT "FK_93e9a0de32b68cd6242db75ca32"`,
    );
    await queryRunner.query(`DROP TABLE "space_schedule"`);
  }
}
