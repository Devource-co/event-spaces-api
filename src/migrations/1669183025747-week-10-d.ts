import { MigrationInterface, QueryRunner } from 'typeorm';

export class week10D1669183025747 implements MigrationInterface {
  name = 'week10D1669183025747';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."document_weights_idx"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "document_weights_idx" ON "space" ("document_with_weights") `,
    );
  }
}
