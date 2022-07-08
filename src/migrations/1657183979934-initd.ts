import { MigrationInterface, QueryRunner } from 'typeorm';

export class initd1657183979934 implements MigrationInterface {
  name = 'initd1657183979934';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category_activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1c73655f9cfc26a01df74d4e5e9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "category_id" uuid, "tags" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying, "street" character varying, "place" character varying, "town" character varying, "zip_code" character varying, "location" geography(Point,4326), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_364715fa9c508e1c379626fb75" ON "address" USING GiST ("location") `,
    );
    await queryRunner.query(
      `CREATE TABLE "conversation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "industry" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "industryName" character varying NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c371d02dcf4a69ee52f51b22497" UNIQUE ("industryName"), CONSTRAINT "PK_fc3e38485cff79e9fbba8f13831" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin', 'superadmin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying, "firstname" character varying, "lastname" character varying, "phone" character varying, "email_verified" boolean NOT NULL DEFAULT false, "phone_verified" boolean NOT NULL DEFAULT false, "bio" character varying, "profile_pic" character varying, "jobTitle" character varying, "organization" character varying, "connectedToGoogle" boolean NOT NULL DEFAULT false, "connectedToFacebook" boolean NOT NULL DEFAULT false, "industry_id" uuid, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "industry_userId_index" ON "user" ("industry_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_95c07c16136adcfdcb8221c1fc" ON "user" ("id", "email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "conversation_id" uuid NOT NULL, "user_id" uuid NOT NULL, "message" text NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "participant" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "conversation_id" uuid NOT NULL, "user_id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_64da4237f502041781ca15d4c41" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_025f62af6ea7d92ce086597324" ON "participant" ("conversation_id", "user_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "type" character varying NOT NULL, "model" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "space_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5ecc239af9d8ad8104c7f21a2cc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "space" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying, "description" character varying, "youtube_url" character varying, "address_id" uuid, "type_id" uuid, "max_guests" character varying, "property_size" character varying, "parking_slots" integer, "onproperty_parking" boolean, "street_parking" boolean, "parking_close" boolean, "avg_rating" integer NOT NULL DEFAULT '-1', "publish" boolean NOT NULL DEFAULT false, "thumbnail_id" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_4deb2587c578446b6543c2f2ad" UNIQUE ("address_id"), CONSTRAINT "REL_89f6c8ba2f410764b387e341ee" UNIQUE ("thumbnail_id"), CONSTRAINT "PK_094f5ec727fe052956a11623640" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "space_activities_activity" ("spaceId" uuid NOT NULL, "activityId" uuid NOT NULL, CONSTRAINT "PK_1bb5adba795c8f642fba55467de" PRIMARY KEY ("spaceId", "activityId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f45475af815994bc3fac4433f2" ON "space_activities_activity" ("spaceId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4d7ba99d18c77dafb582df9adf" ON "space_activities_activity" ("activityId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "space_images_file" ("spaceId" uuid NOT NULL, "fileId" uuid NOT NULL, CONSTRAINT "PK_b93ff75e60617081db3430b0c01" PRIMARY KEY ("spaceId", "fileId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0a1f92e272d04da8072d7e30f8" ON "space_images_file" ("spaceId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_87681c086af74fa32deb364405" ON "space_images_file" ("fileId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_5d3d888450207667a286922f945" FOREIGN KEY ("category_id") REFERENCES "category_activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_32011620b72340152bf7612aaee" FOREIGN KEY ("industry_id") REFERENCES "industry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_4deb2587c578446b6543c2f2adc" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_5ecc239af9d8ad8104c7f21a2cc" FOREIGN KEY ("type_id") REFERENCES "space_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_89f6c8ba2f410764b387e341ee2" FOREIGN KEY ("thumbnail_id") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_activities_activity" ADD CONSTRAINT "FK_f45475af815994bc3fac4433f29" FOREIGN KEY ("spaceId") REFERENCES "space"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_activities_activity" ADD CONSTRAINT "FK_4d7ba99d18c77dafb582df9adf5" FOREIGN KEY ("activityId") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_images_file" ADD CONSTRAINT "FK_0a1f92e272d04da8072d7e30f83" FOREIGN KEY ("spaceId") REFERENCES "space"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_images_file" ADD CONSTRAINT "FK_87681c086af74fa32deb3644054" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space_images_file" DROP CONSTRAINT "FK_87681c086af74fa32deb3644054"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_images_file" DROP CONSTRAINT "FK_0a1f92e272d04da8072d7e30f83"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_activities_activity" DROP CONSTRAINT "FK_4d7ba99d18c77dafb582df9adf5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_activities_activity" DROP CONSTRAINT "FK_f45475af815994bc3fac4433f29"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_89f6c8ba2f410764b387e341ee2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_5ecc239af9d8ad8104c7f21a2cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_4deb2587c578446b6543c2f2adc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_32011620b72340152bf7612aaee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "FK_5d3d888450207667a286922f945"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_87681c086af74fa32deb364405"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0a1f92e272d04da8072d7e30f8"`,
    );
    await queryRunner.query(`DROP TABLE "space_images_file"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4d7ba99d18c77dafb582df9adf"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f45475af815994bc3fac4433f2"`,
    );
    await queryRunner.query(`DROP TABLE "space_activities_activity"`);
    await queryRunner.query(`DROP TABLE "space"`);
    await queryRunner.query(`DROP TABLE "space_type"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_025f62af6ea7d92ce086597324"`,
    );
    await queryRunner.query(`DROP TABLE "participant"`);
    await queryRunner.query(`DROP TABLE "messages"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_95c07c16136adcfdcb8221c1fc"`,
    );
    await queryRunner.query(`DROP INDEX "public"."industry_userId_index"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(`DROP TABLE "industry"`);
    await queryRunner.query(`DROP TABLE "conversation"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_364715fa9c508e1c379626fb75"`,
    );
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(`DROP TABLE "activity"`);
    await queryRunner.query(`DROP TABLE "category_activity"`);
  }
}
