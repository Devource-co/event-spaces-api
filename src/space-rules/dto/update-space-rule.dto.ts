import { PartialType } from '@nestjs/swagger';
import { CreateSpaceRuleDto } from './create-space-rule.dto';

export class UpdateSpaceRuleDto extends PartialType(CreateSpaceRuleDto) {}
