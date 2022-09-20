import { PartialType } from '@nestjs/swagger';
import { CreateAccessMethodDto } from './create-access-method.dto';

export class UpdateAccessMethodDto extends PartialType(CreateAccessMethodDto) {}
