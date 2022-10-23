import { MigrationInterface, QueryRunner } from 'typeorm';

export class week9A1666533926534 implements MigrationInterface {
  name = 'week9A1666533926534';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "space_type" ADD CONSTRAINT "UQ_9db739b348060230262f3d7fb58" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "amenity" ADD CONSTRAINT "UQ_d60c782fa964771aff1fd2f81cd" UNIQUE ("title")`,
    );
    await queryRunner.query(
      `ALTER TABLE "access_method" ADD CONSTRAINT "UQ_8aec601783c0669f6f21a093b37" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "cancellation_policy" ADD CONSTRAINT "UQ_ed4fdee1e7904adb6593bfc09ad" UNIQUE ("title")`,
    );
    await queryRunner.query(
      `ALTER TABLE "rate" ADD CONSTRAINT "UQ_f4deeff8c1d3bd8334f9ab411f6" UNIQUE ("name")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rate" DROP CONSTRAINT "UQ_f4deeff8c1d3bd8334f9ab411f6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cancellation_policy" DROP CONSTRAINT "UQ_ed4fdee1e7904adb6593bfc09ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "access_method" DROP CONSTRAINT "UQ_8aec601783c0669f6f21a093b37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "amenity" DROP CONSTRAINT "UQ_d60c782fa964771aff1fd2f81cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "space_type" DROP CONSTRAINT "UQ_9db739b348060230262f3d7fb58"`,
    );
  }
}
