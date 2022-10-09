import { PartialType } from '@nestjs/swagger';
import { CreateSpaceImageDto } from './create-space-image.dto';

export class UpdateSpaceImageDto extends PartialType(CreateSpaceImageDto) {}
