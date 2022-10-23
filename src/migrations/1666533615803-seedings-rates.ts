import { MigrationInterface, QueryRunner } from 'typeorm';
import rates from '../factories/rates';
import { Rate } from '../rate/entities/rate.entity';

export class seedingsRates1666533615803 implements MigrationInterface {
  name = 'seedingsRates1666533615803';
  public async up(queryRunner: QueryRunner): Promise<void> {
    Promise.all(
      rates.map(({ name, description, frequency }) =>
        queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(Rate)
          .values({ name, description, frequency })
          .orIgnore()
          .execute(),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM rate`);
  }
}
