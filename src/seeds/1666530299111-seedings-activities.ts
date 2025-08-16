import { MigrationInterface, QueryRunner } from 'typeorm';
import { Activity } from '../activities/entities/activities.entity';
import { CategoryActivity } from '../activities/entities/categoryActivities.entity';
import activitiesCategories from '../factories/activities';

export class seedingsActivities1666524291111 implements MigrationInterface {
  name = 'seedingsActivities1666524291111';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await activitiesCategories.forEach(
      async ({ name, description, activities }) => {
        const cate = await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(CategoryActivity)
          .values({ name, description })
          .orUpdate(['name'], ['description'])
          .returning('id')
          .execute();
        const categoryId = cate.raw[0].id;
        Promise.all(
          activities.map(({ name, image_url, description }) =>
            queryRunner.manager
              .createQueryBuilder()
              .insert()
              .into(Activity)
              .values({ name, image_url, description, category_id: categoryId })
              .orIgnore()
              .execute(),
          ),
        );
      },
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM activity`);
    await queryRunner.query(`DELETE * FROM category_activity`);
  }
}
