import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class AddressRangeQueryDTO {
  @IsOptional()
  @IsNumber()
  @Transform((p) => +p.value)
  range?: number;

  @IsNumber()
  @Transform((p) => +p.value)
  lat: number;

  @IsNumber()
  @Transform((p) => +p.value)
  long: number;
}
