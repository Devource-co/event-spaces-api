import { MigrationInterface, QueryRunner } from "typeorm";

export class week11A1669558809362 implements MigrationInterface {
    name = 'week11A1669558809362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" ADD "lastMessageId" uuid`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD CONSTRAINT "UQ_de0389f98ed76b16b16a9755423" UNIQUE ("lastMessageId")`);
        await queryRunner.query(`ALTER TABLE "conversation" ADD CONSTRAINT "FK_de0389f98ed76b16b16a9755423" FOREIGN KEY ("lastMessageId") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "FK_de0389f98ed76b16b16a9755423"`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP CONSTRAINT "UQ_de0389f98ed76b16b16a9755423"`);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "lastMessageId"`);
    }

}
