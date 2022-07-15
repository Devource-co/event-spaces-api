import { IsIn, IsOptional } from 'class-validator';

export class FileQueryDTO {
  @IsOptional()
  @IsIn(['space', 'profile-pic', 'blog'])
  folder?: string;
}
