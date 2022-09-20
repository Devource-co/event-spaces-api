import { PartialType } from '@nestjs/swagger';
import { CreateActivityDto } from './createActivity';

export default class UpdateActivityDto extends PartialType(CreateActivityDto) {}
