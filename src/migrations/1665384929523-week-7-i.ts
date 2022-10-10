import { MigrationInterface, QueryRunner } from 'typeorm';

export class week7I1665384929523 implements MigrationInterface {
  name = 'week7I1665384929523';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "faq" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "question" text NOT NULL, "answer" text NOT NULL, "space_id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "faq" ADD CONSTRAINT "FK_7561b7e995961b1950a6b43d956" FOREIGN KEY ("space_id") REFERENCES "space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "faq" DROP CONSTRAINT "FK_7561b7e995961b1950a6b43d956"`,
    );
    await queryRunner.query(`DROP TABLE "faq"`);
  }
}
