import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpaceRuleDto } from './dto/create-space-rule.dto';
import { UpdateSpaceRuleDto } from './dto/update-space-rule.dto';
import { SpaceRule } from './entities/space-rule.entity';

@Injectable()
export class SpaceRulesService {
  constructor(
    @InjectRepository(SpaceRule)
    private spaceRuleRepository: Repository<SpaceRule>,
  ) {}
  create(createSpaceRuleDto: CreateSpaceRuleDto) {
    const spaceRule = this.spaceRuleRepository.create(createSpaceRuleDto);
    return spaceRule.save();
  }

  async bulkCreate(createSpaceRuleDto: CreateSpaceRuleDto[]) {
    const spaceRuleEntities =
      this.spaceRuleRepository.create(createSpaceRuleDto);
    await this.spaceRuleRepository.insert(spaceRuleEntities);
    return spaceRuleEntities;
  }

  findAll(spaceId?: string) {
    return this.spaceRuleRepository.find({
      ...(spaceId && { where: { space_id: spaceId } }),
    });
  }

  findOne(id: string) {
    return this.spaceRuleRepository.findOneBy({ id });
  }

  async update(id: string, updateSpaceRuleDto: UpdateSpaceRuleDto) {
    const spaceRule = await this.findOne(id);
    if (spaceRule) {
      return this.spaceRuleRepository.save({
        ...spaceRule,
        ...updateSpaceRuleDto,
      });
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        error: `spaceRule with id ${id} not found`,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  remove(id: string) {
    return this.spaceRuleRepository.delete({ id });
  }
}
