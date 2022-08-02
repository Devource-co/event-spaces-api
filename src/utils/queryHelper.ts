import { Repository } from 'typeorm';

export const updateQueryHelper = async <Entity, DTO, Condition>(
  respository: Repository<Entity>,
  updateDTO: DTO,
  where: Condition,
): Promise<Entity> => {
  return respository
    .createQueryBuilder()
    .update(updateDTO)
    .where(where)
    .returning('*')
    .execute()
    .then((response) => {
      return response.raw[0];
    });
};
