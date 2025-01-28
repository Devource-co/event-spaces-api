import { MigrationInterface, QueryRunner } from 'typeorm';
import { AccessMethod } from '../access-methods/entities/access-method.entity';
import accessmethods from '../factories/access-methods';

export class seedingsAccessMethods1666533130856 implements MigrationInterface {
  name = 'seedingsAccessMethods1666533130856';
  public async up(queryRunner: QueryRunner): Promise<void> {
    Promise.all(
      accessmethods.map(({ name, description }) =>
        queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(AccessMethod)
          .values({ name, description })
          .orIgnore()
          .execute(),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`DELETE * FROM access_method`);
  }
}
