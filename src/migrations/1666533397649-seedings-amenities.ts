import { MigrationInterface, QueryRunner } from 'typeorm';
import { Amenity } from '../amenities/entities/amenity.entity';
import amenities from '../factories/amenities';

export class seedingsAmenities1666533397649 implements MigrationInterface {
  name = 'seedingsAmenities1666533397649';
  public async up(queryRunner: QueryRunner): Promise<void> {
    Promise.all(
      amenities.map(({ title, description, icon_url }) =>
        queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(Amenity)
          .values({ title, description, icon_url })
          .orIgnore()
          .execute(),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM amenity`);
  }
}
