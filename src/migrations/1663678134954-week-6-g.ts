import { MigrationInterface, QueryRunner } from 'typeorm';

export class week6G1663678134954 implements MigrationInterface {
  name = 'week6G1663678134954';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "space_rule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "space_id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_487aa7718db2a928b8e1e04b4cd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_rule" ADD CONSTRAINT "FK_0b32b87013aefe10e3880cb8814" FOREIGN KEY ("space_id") REFERENCES "space"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space_rule" DROP CONSTRAINT "FK_0b32b87013aefe10e3880cb8814"`,
    );
    await queryRunner.query(`DROP TABLE "space_rule"`);
  }
}
