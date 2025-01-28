import { MigrationInterface, QueryRunner } from 'typeorm';
import types from '../factories/space-types';
import { SpaceType } from '../spacetypes/entities/spacetype.entity';

export class seedingsSpaceTypes1666533520579 implements MigrationInterface {
  name = 'seedingsSpaceTypes1666533520579';
  public async up(queryRunner: QueryRunner): Promise<void> {
    Promise.all(
      types.map(({ name, description }) =>
        queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(SpaceType)
          .values({ name, description })
          .orIgnore()
          .execute(),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`DELETE * FROM space_type`);
  }
}
