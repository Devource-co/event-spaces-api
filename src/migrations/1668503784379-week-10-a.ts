import { MigrationInterface, QueryRunner } from 'typeorm';

export class week10A1668503784379 implements MigrationInterface {
  name = 'week10A1668503784379';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space_rule" DROP CONSTRAINT "FK_0b32b87013aefe10e3880cb8814"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_amenities_amenity" DROP CONSTRAINT "FK_14d5a4644e4cf5300e4847f63ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_access_methods_access_method" DROP CONSTRAINT "FK_ac6ae8da94b8548d25419418405"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_rule" ADD CONSTRAINT "FK_0b32b87013aefe10e3880cb8814" FOREIGN KEY ("space_id") REFERENCES "space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_amenities_amenity" ADD CONSTRAINT "FK_14d5a4644e4cf5300e4847f63ad" FOREIGN KEY ("amenityId") REFERENCES "amenity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_access_methods_access_method" ADD CONSTRAINT "FK_ac6ae8da94b8548d25419418405" FOREIGN KEY ("accessMethodId") REFERENCES "access_method"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space_access_methods_access_method" DROP CONSTRAINT "FK_ac6ae8da94b8548d25419418405"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_amenities_amenity" DROP CONSTRAINT "FK_14d5a4644e4cf5300e4847f63ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_rule" DROP CONSTRAINT "FK_0b32b87013aefe10e3880cb8814"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_access_methods_access_method" ADD CONSTRAINT "FK_ac6ae8da94b8548d25419418405" FOREIGN KEY ("accessMethodId") REFERENCES "access_method"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_amenities_amenity" ADD CONSTRAINT "FK_14d5a4644e4cf5300e4847f63ad" FOREIGN KEY ("amenityId") REFERENCES "amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_rule" ADD CONSTRAINT "FK_0b32b87013aefe10e3880cb8814" FOREIGN KEY ("space_id") REFERENCES "space"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
