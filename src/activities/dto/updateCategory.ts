import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './createCategory';

export default class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
