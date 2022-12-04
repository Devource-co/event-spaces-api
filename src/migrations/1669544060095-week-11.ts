import { MigrationInterface, QueryRunner } from "typeorm";

export class week111669544060095 implements MigrationInterface {
    name = 'week111669544060095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "conversation_id" uuid NOT NULL, "user_id" uuid NOT NULL, "message" text NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_conversations_conversation" ("userId" uuid NOT NULL, "conversationId" uuid NOT NULL, CONSTRAINT "PK_32949b370b6a6f3413bb1eda505" PRIMARY KEY ("userId", "conversationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_25944e737d295aabbe9c3ea1ec" ON "user_conversations_conversation" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_005394704c1c42e3da287a7399" ON "user_conversations_conversation" ("conversationId") `);
        await queryRunner.query(`ALTER TABLE "conversation" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_7fe3e887d78498d9c9813375ce2" FOREIGN KEY ("conversation_id") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_54ce30caeb3f33d68398ea10376" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_conversations_conversation" ADD CONSTRAINT "FK_25944e737d295aabbe9c3ea1ecf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_conversations_conversation" ADD CONSTRAINT "FK_005394704c1c42e3da287a73991" FOREIGN KEY ("conversationId") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_conversations_conversation" DROP CONSTRAINT "FK_005394704c1c42e3da287a73991"`);
        await queryRunner.query(`ALTER TABLE "user_conversations_conversation" DROP CONSTRAINT "FK_25944e737d295aabbe9c3ea1ecf"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_54ce30caeb3f33d68398ea10376"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_7fe3e887d78498d9c9813375ce2"`);
        await queryRunner.query(`ALTER TABLE "conversation" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_005394704c1c42e3da287a7399"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_25944e737d295aabbe9c3ea1ec"`);
        await queryRunner.query(`DROP TABLE "user_conversations_conversation"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
