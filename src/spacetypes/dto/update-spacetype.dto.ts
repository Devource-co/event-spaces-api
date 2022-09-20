import { PartialType } from '@nestjs/swagger';
import { CreateSpacetypeDto } from './create-spacetype.dto';

export class UpdateSpacetypeDto extends PartialType(CreateSpacetypeDto) {}
