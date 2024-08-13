import { MigrationInterface, QueryRunner } from 'typeorm';

export class staff1713613358542 implements MigrationInterface {
  name = 'staff1713613358542';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."document_weights_idx"`);
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "read" boolean, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "staff" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying, "firstname" character varying, "lastname" character varying, "phone" character varying, "profile_pic" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_902985a964245652d5e3a0f5f6a" UNIQUE ("email"), CONSTRAINT "UQ_4d4956f0d921cf205e2c34e130b" UNIQUE ("phone"), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "staff_roles_role" ("staffId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_91cfec33403f2daf9ab7b866dd7" PRIMARY KEY ("staffId", "roleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_446729773aa4191ef6d819dfe3" ON "staff_roles_role" ("staffId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_88133beaf7de257f2433ea9602" ON "staff_roles_role" ("roleId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ADD "featured" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_roles_role" ADD CONSTRAINT "FK_446729773aa4191ef6d819dfe35" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_roles_role" ADD CONSTRAINT "FK_88133beaf7de257f2433ea96025" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff_roles_role" DROP CONSTRAINT "FK_88133beaf7de257f2433ea96025"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_roles_role" DROP CONSTRAINT "FK_446729773aa4191ef6d819dfe35"`,
    );
    await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "featured"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_88133beaf7de257f2433ea9602"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_446729773aa4191ef6d819dfe3"`,
    );
    await queryRunner.query(`DROP TABLE "staff_roles_role"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "staff"`);
    await queryRunner.query(`DROP TABLE "permission"`);
    await queryRunner.query(
      `CREATE INDEX "document_weights_idx" ON "space" ("document_with_weights") `,
    );
  }
}
