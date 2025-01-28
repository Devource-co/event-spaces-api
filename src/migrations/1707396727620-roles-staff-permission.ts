import { MigrationInterface, QueryRunner } from 'typeorm';

export class rolesStaffPermission1707396727620 implements MigrationInterface {
  name = 'rolesStaffPermission1707396727620';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category_activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_004925c2e1eca6f7f83cf913958" UNIQUE ("name"), CONSTRAINT "PK_1c73655f9cfc26a01df74d4e5e9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "activity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "category_id" uuid, "tags" character varying, "image_url" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e0098522faf604f4f29ba54bba4" UNIQUE ("name"), CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e0098522faf604f4f29ba54bba" ON "activity" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying, "street" character varying, "place" character varying, "town" character varying, "zip_code" character varying, "d_lat" double precision, "d_long" double precision, "location" geography(Point,4326), "distance" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_364715fa9c508e1c379626fb75" ON "address" USING GiST ("location") `,
    );
    await queryRunner.query(
      `CREATE TABLE "industry" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "industryName" character varying NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c371d02dcf4a69ee52f51b22497" UNIQUE ("industryName"), CONSTRAINT "PK_fc3e38485cff79e9fbba8f13831" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "conversation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text, "description" text, "last_message_id" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_ba9e5fd8456128908d86c01c5b" UNIQUE ("last_message_id"), CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "conversation_id" uuid NOT NULL, "user_id" uuid NOT NULL, "message" text NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_method_payment_type_enum" AS ENUM('card', 'mpesa')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_method_card_type_enum" AS ENUM('amex', 'discover', 'mastercard', 'visa')`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment_method" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accountNumber" integer, "phoneNumber" character varying, "cvv" integer, "expiration" character varying, "paypalEmail" character varying, "maskedAccountNumber" character varying NOT NULL, "payment_type" "public"."payment_method_payment_type_enum" NOT NULL, "card_type" "public"."payment_method_card_type_enum", "owner_id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7744c2b2dd932c9cf42f2b9bc3a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_452e311c78c418fb45e24fc367" ON "payment_method" ("owner_id") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin', 'superadmin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying, "firstname" character varying, "lastname" character varying, "phone" character varying, "email_verified" boolean NOT NULL DEFAULT false, "phone_verified" boolean NOT NULL DEFAULT false, "bio" character varying, "profile_pic" character varying, "jobTitle" character varying, "organization" character varying, "connectedToGoogle" boolean NOT NULL DEFAULT false, "connectedToFacebook" boolean NOT NULL DEFAULT false, "hasPassword" boolean NOT NULL DEFAULT false, "industry_id" uuid, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "allowNotifications" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "industry_userId_index" ON "user" ("industry_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_95c07c16136adcfdcb8221c1fc" ON "user" ("id", "email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "space_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "cover_image" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9db739b348060230262f3d7fb58" UNIQUE ("name"), CONSTRAINT "PK_5ecc239af9d8ad8104c7f21a2cc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_9db739b348060230262f3d7fb5" ON "space_type" ("name") `,
    );
    await queryRunner.query(
      `CREATE TABLE "amenity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "icon_url" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d60c782fa964771aff1fd2f81cd" UNIQUE ("title"), CONSTRAINT "PK_f981de7b1a822823e5f31da10dc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "space_rule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "space_id" uuid NOT NULL, "active" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_487aa7718db2a928b8e1e04b4cd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "space_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "space_id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_05e27fd2843c672f13369848e30" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "space_schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "day" smallint NOT NULL, "space_id" uuid NOT NULL, "is_set_time" boolean NOT NULL DEFAULT false, "opening_time" TIME, "closing_time" TIME, "isOpened" boolean, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1c59fb57dd560f0f640aa6324fc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "space-day-idx" ON "space_schedule" ("day") `,
    );
    await queryRunner.query(
      `CREATE INDEX "space-opening-time-idx" ON "space_schedule" ("opening_time") `,
    );
    await queryRunner.query(
      `CREATE INDEX "space-closing-time-idx" ON "space_schedule" ("closing_time") `,
    );
    await queryRunner.query(
      `CREATE TABLE "cancellation_policy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "hoursBeforeExpiry" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ed4fdee1e7904adb6593bfc09ad" UNIQUE ("title"), CONSTRAINT "PK_de4920dafdc3f8e1636321162d3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "faq" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "question" text NOT NULL, "answer" text NOT NULL, "space_id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d6f5a52b1a96dd8d0591f9fbc47" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "booked_date" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "booking_id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_7f9307a5bfc67e89664bb92f15c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "booked-date-idx" ON "booked_date" ("date") `,
    );
    await queryRunner.query(
      `CREATE INDEX "booked-start-time-idx" ON "booked_date" ("start_time") `,
    );
    await queryRunner.query(
      `CREATE INDEX "booked-end-time-idx" ON "booked_date" ("end_time") `,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."booking_payment_status_enum" AS ENUM('paid', 'pending', 'failed', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."booking_booking_status_enum" AS ENUM('pending', 'payment_waiting', 'booked', 'rejected', 'cancelled')`,
    );
    await queryRunner.query(
      `CREATE TABLE "booking" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "space_id" uuid NOT NULL, "total" numeric NOT NULL, "payment_status" "public"."booking_payment_status_enum" NOT NULL DEFAULT 'pending', "booking_status" "public"."booking_booking_status_enum" NOT NULL DEFAULT 'pending', "payment_id" uuid, "duration" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."space_status_enum" AS ENUM('in review', 'draft', 'active', 'rejected', 'inactive')`,
    );
    await queryRunner.query(
      `CREATE TABLE "space" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying, "description" character varying, "youtube_url" character varying, "address_id" uuid, "cancellation_policy_id" uuid, "owner_id" uuid NOT NULL, "type_id" uuid, "max_guests" integer, "price" numeric, "minimumDuration" integer, "status" "public"."space_status_enum" NOT NULL DEFAULT 'draft', "property_size" character varying, "parking_slots" integer, "onproperty_parking" boolean, "street_parking" boolean, "parking_close" boolean, "avg_rating" integer NOT NULL DEFAULT '-1', "publish" boolean NOT NULL DEFAULT false, "thumbnail_url" character varying, "document_with_weights" tsvector NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "REL_4deb2587c578446b6543c2f2ad" UNIQUE ("address_id"), CONSTRAINT "PK_094f5ec727fe052956a11623640" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "access_method" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8aec601783c0669f6f21a093b37" UNIQUE ("name"), CONSTRAINT "PK_7c29bbcaaff4d91cc8c42fefbea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."blog_type_enum" AS ENUM('blog', 'support', 'guide')`,
    );
    await queryRunner.query(
      `CREATE TABLE "blog" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "description" text NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "thumbnail" character varying NOT NULL, "tags" text array NOT NULL, "type" "public"."blog_type_enum" NOT NULL DEFAULT 'blog', "public_id" SERIAL NOT NULL, "featured" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "type" character varying NOT NULL, "model" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "staff" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying, "firstname" character varying, "lastname" character varying, "phone" character varying, "profile_pic" character varying, "role_id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_902985a964245652d5e3a0f5f6a" UNIQUE ("email"), CONSTRAINT "UQ_4d4956f0d921cf205e2c34e130b" UNIQUE ("phone"), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "read" boolean, "write" boolean, "delete" boolean, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_conversations_conversation" ("userId" uuid NOT NULL, "conversationId" uuid NOT NULL, CONSTRAINT "PK_32949b370b6a6f3413bb1eda505" PRIMARY KEY ("userId", "conversationId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_25944e737d295aabbe9c3ea1ec" ON "user_conversations_conversation" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_005394704c1c42e3da287a7399" ON "user_conversations_conversation" ("conversationId") `,
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
      `CREATE TABLE "space_amenities_amenity" ("spaceId" uuid NOT NULL, "amenityId" uuid NOT NULL, CONSTRAINT "PK_38c86b4fa180e6cf45cba3c7eb5" PRIMARY KEY ("spaceId", "amenityId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_54839cfc1931068dbe32c7d0a3" ON "space_amenities_amenity" ("spaceId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_14d5a4644e4cf5300e4847f63a" ON "space_amenities_amenity" ("amenityId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "space_access_methods_access_method" ("spaceId" uuid NOT NULL, "accessMethodId" uuid NOT NULL, CONSTRAINT "PK_75b521bf39249872d8be13b00b5" PRIMARY KEY ("spaceId", "accessMethodId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_19391ae29b6285d049929c13c6" ON "space_access_methods_access_method" ("spaceId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ac6ae8da94b8548d2541941840" ON "space_access_methods_access_method" ("accessMethodId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" ADD CONSTRAINT "FK_5d3d888450207667a286922f945" FOREIGN KEY ("category_id") REFERENCES "category_activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "conversation" ADD CONSTRAINT "FK_ba9e5fd8456128908d86c01c5b6" FOREIGN KEY ("last_message_id") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_7fe3e887d78498d9c9813375ce2" FOREIGN KEY ("conversation_id") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_54ce30caeb3f33d68398ea10376" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_method" ADD CONSTRAINT "FK_452e311c78c418fb45e24fc3673" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_32011620b72340152bf7612aaee" FOREIGN KEY ("industry_id") REFERENCES "industry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_rule" ADD CONSTRAINT "FK_0b32b87013aefe10e3880cb8814" FOREIGN KEY ("space_id") REFERENCES "space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_image" ADD CONSTRAINT "FK_eada642a02db4b092900d9b20a3" FOREIGN KEY ("space_id") REFERENCES "space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_schedule" ADD CONSTRAINT "FK_93e9a0de32b68cd6242db75ca32" FOREIGN KEY ("space_id") REFERENCES "space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "faq" ADD CONSTRAINT "FK_7561b7e995961b1950a6b43d956" FOREIGN KEY ("space_id") REFERENCES "space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booked_date" ADD CONSTRAINT "FK_769f994d59875187ce3bf9ad6fe" FOREIGN KEY ("booking_id") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_276896d1a1a30be6de9d7d43f53" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" ADD CONSTRAINT "FK_25c5b2109e700d03a57da187e0f" FOREIGN KEY ("space_id") REFERENCES "space"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_4deb2587c578446b6543c2f2adc" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_491151f20c95f76f03f57f2a7e3" FOREIGN KEY ("cancellation_policy_id") REFERENCES "cancellation_policy"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_9114b5dd2c691b98d7fa3f10b21" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_5ecc239af9d8ad8104c7f21a2cc" FOREIGN KEY ("type_id") REFERENCES "space_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_c3fe01125c99573751fe5e55666" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_conversations_conversation" ADD CONSTRAINT "FK_25944e737d295aabbe9c3ea1ecf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_conversations_conversation" ADD CONSTRAINT "FK_005394704c1c42e3da287a73991" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_activities_activity" ADD CONSTRAINT "FK_f45475af815994bc3fac4433f29" FOREIGN KEY ("spaceId") REFERENCES "space"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_activities_activity" ADD CONSTRAINT "FK_4d7ba99d18c77dafb582df9adf5" FOREIGN KEY ("activityId") REFERENCES "activity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_amenities_amenity" ADD CONSTRAINT "FK_54839cfc1931068dbe32c7d0a32" FOREIGN KEY ("spaceId") REFERENCES "space"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_amenities_amenity" ADD CONSTRAINT "FK_14d5a4644e4cf5300e4847f63ad" FOREIGN KEY ("amenityId") REFERENCES "amenity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_access_methods_access_method" ADD CONSTRAINT "FK_19391ae29b6285d049929c13c63" FOREIGN KEY ("spaceId") REFERENCES "space"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
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
      `ALTER TABLE "space_access_methods_access_method" DROP CONSTRAINT "FK_19391ae29b6285d049929c13c63"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_amenities_amenity" DROP CONSTRAINT "FK_14d5a4644e4cf5300e4847f63ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_amenities_amenity" DROP CONSTRAINT "FK_54839cfc1931068dbe32c7d0a32"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_activities_activity" DROP CONSTRAINT "FK_4d7ba99d18c77dafb582df9adf5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_activities_activity" DROP CONSTRAINT "FK_f45475af815994bc3fac4433f29"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_conversations_conversation" DROP CONSTRAINT "FK_005394704c1c42e3da287a73991"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_conversations_conversation" DROP CONSTRAINT "FK_25944e737d295aabbe9c3ea1ecf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_c3fe01125c99573751fe5e55666"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_5ecc239af9d8ad8104c7f21a2cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_9114b5dd2c691b98d7fa3f10b21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_491151f20c95f76f03f57f2a7e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_4deb2587c578446b6543c2f2adc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_25c5b2109e700d03a57da187e0f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booking" DROP CONSTRAINT "FK_276896d1a1a30be6de9d7d43f53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "booked_date" DROP CONSTRAINT "FK_769f994d59875187ce3bf9ad6fe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "faq" DROP CONSTRAINT "FK_7561b7e995961b1950a6b43d956"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_schedule" DROP CONSTRAINT "FK_93e9a0de32b68cd6242db75ca32"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_image" DROP CONSTRAINT "FK_eada642a02db4b092900d9b20a3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_rule" DROP CONSTRAINT "FK_0b32b87013aefe10e3880cb8814"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_32011620b72340152bf7612aaee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_method" DROP CONSTRAINT "FK_452e311c78c418fb45e24fc3673"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_54ce30caeb3f33d68398ea10376"`,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_7fe3e887d78498d9c9813375ce2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "conversation" DROP CONSTRAINT "FK_ba9e5fd8456128908d86c01c5b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity" DROP CONSTRAINT "FK_5d3d888450207667a286922f945"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ac6ae8da94b8548d2541941840"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_19391ae29b6285d049929c13c6"`,
    );
    await queryRunner.query(`DROP TABLE "space_access_methods_access_method"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_14d5a4644e4cf5300e4847f63a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_54839cfc1931068dbe32c7d0a3"`,
    );
    await queryRunner.query(`DROP TABLE "space_amenities_amenity"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4d7ba99d18c77dafb582df9adf"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f45475af815994bc3fac4433f2"`,
    );
    await queryRunner.query(`DROP TABLE "space_activities_activity"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_005394704c1c42e3da287a7399"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_25944e737d295aabbe9c3ea1ec"`,
    );
    await queryRunner.query(`DROP TABLE "user_conversations_conversation"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TABLE "permission"`);
    await queryRunner.query(`DROP TABLE "staff"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "blog"`);
    await queryRunner.query(`DROP TYPE "public"."blog_type_enum"`);
    await queryRunner.query(`DROP TABLE "access_method"`);
    await queryRunner.query(`DROP TABLE "space"`);
    await queryRunner.query(`DROP TYPE "public"."space_status_enum"`);
    await queryRunner.query(`DROP TABLE "booking"`);
    await queryRunner.query(`DROP TYPE "public"."booking_booking_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."booking_payment_status_enum"`);
    await queryRunner.query(`DROP INDEX "public"."booked-end-time-idx"`);
    await queryRunner.query(`DROP INDEX "public"."booked-start-time-idx"`);
    await queryRunner.query(`DROP INDEX "public"."booked-date-idx"`);
    await queryRunner.query(`DROP TABLE "booked_date"`);
    await queryRunner.query(`DROP TABLE "faq"`);
    await queryRunner.query(`DROP TABLE "cancellation_policy"`);
    await queryRunner.query(`DROP INDEX "public"."space-closing-time-idx"`);
    await queryRunner.query(`DROP INDEX "public"."space-opening-time-idx"`);
    await queryRunner.query(`DROP INDEX "public"."space-day-idx"`);
    await queryRunner.query(`DROP TABLE "space_schedule"`);
    await queryRunner.query(`DROP TABLE "space_image"`);
    await queryRunner.query(`DROP TABLE "space_rule"`);
    await queryRunner.query(`DROP TABLE "amenity"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9db739b348060230262f3d7fb5"`,
    );
    await queryRunner.query(`DROP TABLE "space_type"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_95c07c16136adcfdcb8221c1fc"`,
    );
    await queryRunner.query(`DROP INDEX "public"."industry_userId_index"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_452e311c78c418fb45e24fc367"`,
    );
    await queryRunner.query(`DROP TABLE "payment_method"`);
    await queryRunner.query(
      `DROP TYPE "public"."payment_method_card_type_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."payment_method_payment_type_enum"`,
    );
    await queryRunner.query(`DROP TABLE "message"`);
    await queryRunner.query(`DROP TABLE "conversation"`);
    await queryRunner.query(`DROP TABLE "industry"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_364715fa9c508e1c379626fb75"`,
    );
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e0098522faf604f4f29ba54bba"`,
    );
    await queryRunner.query(`DROP TABLE "activity"`);
    await queryRunner.query(`DROP TABLE "category_activity"`);
  }
}
