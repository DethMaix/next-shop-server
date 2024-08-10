import { IsString } from 'class-validator';

export class CreateProductTypeDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;
}
