import { MigrationInterface, QueryRunner } from "typeorm";

export class week6F1663662428979 implements MigrationInterface {
    name = 'week6F1663662428979'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "space_access_methods_access_method" ("spaceId" uuid NOT NULL, "accessMethodId" uuid NOT NULL, CONSTRAINT "PK_75b521bf39249872d8be13b00b5" PRIMARY KEY ("spaceId", "accessMethodId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_19391ae29b6285d049929c13c6" ON "space_access_methods_access_method" ("spaceId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ac6ae8da94b8548d2541941840" ON "space_access_methods_access_method" ("accessMethodId") `);
        await queryRunner.query(`ALTER TABLE "amenity" ALTER COLUMN "icon_url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "space_access_methods_access_method" ADD CONSTRAINT "FK_19391ae29b6285d049929c13c63" FOREIGN KEY ("spaceId") REFERENCES "space"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "space_access_methods_access_method" ADD CONSTRAINT "FK_ac6ae8da94b8548d25419418405" FOREIGN KEY ("accessMethodId") REFERENCES "access_method"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "space_access_methods_access_method" DROP CONSTRAINT "FK_ac6ae8da94b8548d25419418405"`);
        await queryRunner.query(`ALTER TABLE "space_access_methods_access_method" DROP CONSTRAINT "FK_19391ae29b6285d049929c13c63"`);
        await queryRunner.query(`ALTER TABLE "amenity" ALTER COLUMN "icon_url" DROP NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac6ae8da94b8548d2541941840"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_19391ae29b6285d049929c13c6"`);
        await queryRunner.query(`DROP TABLE "space_access_methods_access_method"`);
    }

}
