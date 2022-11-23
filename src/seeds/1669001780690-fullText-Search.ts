import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetupFullTextSearch1552096655610 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
    update space set document_with_weights = setweight(to_tsvector(title), 'A') ||
  setweight(to_tsvector(description), 'B');
CREATE INDEX document_weights_idx
  ON space
  USING GIN (document_with_weights);
        CREATE FUNCTION space_tsvector_trigger() RETURNS trigger AS $$
begin
  new.document_with_weights :=
  setweight(to_tsvector('english', coalesce(new.title, '')), 'A')
  || setweight(to_tsvector('english', coalesce(new.description, '')), 'B');
  return new;
end
$$ LANGUAGE plpgsql;
CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
    ON space FOR EACH ROW EXECUTE PROCEDURE space_tsvector_trigger();
        `);
  }

  public async down(): Promise<any> {}
}
