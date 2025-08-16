import { MigrationInterface, QueryRunner } from 'typeorm';
import { CancellationPolicy } from '../cancellation-policy/entities/cancellation-policy.entity';
import policies from '../factories/policies';

export class seedingsPolicies1666533627409 implements MigrationInterface {
  name = 'seedingsPolicies1666533627409';
  public async up(queryRunner: QueryRunner): Promise<void> {
    Promise.all(
      policies.map(({ title, description, hoursBeforeExpiry }) =>
        queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(CancellationPolicy)
          .values({ title, description, hoursBeforeExpiry })
          .orIgnore()
          .execute(),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM cancellation_policy`);
  }
}
