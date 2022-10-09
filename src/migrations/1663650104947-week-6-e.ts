import { MigrationInterface, QueryRunner } from 'typeorm';

export class week6E1663650104947 implements MigrationInterface {
  name = 'week6E1663650104947';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "amenity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "icon_url" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f981de7b1a822823e5f31da10dc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "space_amenities_amenity" ("spaceId" uuid NOT NULL, "amenityId" uuid NOT NULL, CONSTRAINT "PK_38c86b4fa180e6cf45cba3c7eb5" PRIMARY KEY ("spaceId", "amenityId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_54839cfc1931068dbe32c7d0a3" ON "space_amenities_amenity" ("spaceId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_14d5a4644e4cf5300e4847f63a" ON "space_amenities_amenity" ("amenityId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "space_amenities_amenity" ADD CONSTRAINT "FK_54839cfc1931068dbe32c7d0a32" FOREIGN KEY ("spaceId") REFERENCES "space"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_amenities_amenity" ADD CONSTRAINT "FK_14d5a4644e4cf5300e4847f63ad" FOREIGN KEY ("amenityId") REFERENCES "amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space_amenities_amenity" DROP CONSTRAINT "FK_14d5a4644e4cf5300e4847f63ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_amenities_amenity" DROP CONSTRAINT "FK_54839cfc1931068dbe32c7d0a32"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_14d5a4644e4cf5300e4847f63a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_54839cfc1931068dbe32c7d0a3"`,
    );
    await queryRunner.query(`DROP TABLE "space_amenities_amenity"`);
    await queryRunner.query(`DROP TABLE "amenity"`);
  }
}
