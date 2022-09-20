import { MigrationInterface, QueryRunner } from 'typeorm';

export class week41660287202500 implements MigrationInterface {
  name = 'week41660287202500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_9114b5dd2c691b98d7fa3f10b21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "owner_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_9114b5dd2c691b98d7fa3f10b21" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space" DROP CONSTRAINT "FK_9114b5dd2c691b98d7fa3f10b21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ALTER COLUMN "owner_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "space" ADD CONSTRAINT "FK_9114b5dd2c691b98d7fa3f10b21" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
