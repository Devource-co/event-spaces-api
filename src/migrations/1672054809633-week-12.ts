import { MigrationInterface, QueryRunner } from 'typeorm';

export class week121672054809633 implements MigrationInterface {
  name = 'week121672054809633';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
      `CREATE TYPE "public"."blog_type_enum" AS ENUM('blog', 'support', 'guide')`,
    );
    await queryRunner.query(
      `CREATE TABLE "blog" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "description" text NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "thumbnail" character varying NOT NULL, "tags" text array NOT NULL, "type" "public"."blog_type_enum" NOT NULL DEFAULT 'blog', "public_id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment_method" ADD CONSTRAINT "FK_452e311c78c418fb45e24fc3673" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_method" DROP CONSTRAINT "FK_452e311c78c418fb45e24fc3673"`,
    );
    await queryRunner.query(`DROP TABLE "blog"`);
    await queryRunner.query(`DROP TYPE "public"."blog_type_enum"`);
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
  }
}
