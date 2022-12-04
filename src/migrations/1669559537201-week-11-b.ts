import { MigrationInterface, QueryRunner } from "typeorm";

export class week11B1669559537201 implements MigrationInterface {
    name = 'week11B1669559537201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "FK_de0389f98ed76b16b16a9755423"`);
        await queryRunner.query(`ALTER TABLE "conversation" RENAME COLUMN "lastMessageId" TO "last_message_id"`);
        await queryRunner.query(`ALTER TABLE "conversation" RENAME CONSTRAINT "UQ_de0389f98ed76b16b16a9755423" TO "UQ_ba9e5fd8456128908d86c01c5b6"`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD CONSTRAINT "FK_ba9e5fd8456128908d86c01c5b6" FOREIGN KEY ("last_message_id") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "FK_ba9e5fd8456128908d86c01c5b6"`);
        await queryRunner.query(`ALTER TABLE "conversation" RENAME CONSTRAINT "UQ_ba9e5fd8456128908d86c01c5b6" TO "UQ_de0389f98ed76b16b16a9755423"`);
        await queryRunner.query(`ALTER TABLE "conversation" RENAME COLUMN "last_message_id" TO "lastMessageId"`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD CONSTRAINT "FK_de0389f98ed76b16b16a9755423" FOREIGN KEY ("lastMessageId") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
