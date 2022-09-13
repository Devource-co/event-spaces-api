import { MigrationInterface, QueryRunner } from 'typeorm';

export class week51660646495743 implements MigrationInterface {
  name = 'week51660646495743';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity" ADD "image_url" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "image_url"`);
  }
}
