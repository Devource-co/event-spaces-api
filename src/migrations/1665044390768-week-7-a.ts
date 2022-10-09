import { MigrationInterface, QueryRunner } from 'typeorm';

export class week7A1665044390768 implements MigrationInterface {
  name = 'week7A1665044390768';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_89f6c8ba2f410764b387e341ee2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" RENAME COLUMN "thumbnail_id" TO "thumbnail_url"`,
    );
    await queryRunner.query(
      `CREATE TABLE "space_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "space_id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_05e27fd2843c672f13369848e30" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "space" DROP COLUMN "thumbnail_url"`);
    await queryRunner.query(
      `ALTER TABLE "space" ADD "thumbnail_url" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_image" ADD CONSTRAINT "FK_eada642a02db4b092900d9b20a3" FOREIGN KEY ("space_id") REFERENCES "space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space_image" DROP CONSTRAINT "FK_eada642a02db4b092900d9b20a3"`,
    );
    await queryRunner.query(`ALTER TABLE "space" DROP COLUMN "thumbnail_url"`);
    await queryRunner.query(`ALTER TABLE "space" ADD "thumbnail_url" uuid`);
    await queryRunner.query(`DROP TABLE "space_image"`);
    await queryRunner.query(
      `ALTER TABLE "space" RENAME COLUMN "thumbnail_url" TO "thumbnail_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_89f6c8ba2f410764b387e341ee2" FOREIGN KEY ("thumbnail_id") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
