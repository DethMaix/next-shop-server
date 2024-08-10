import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  slug: string;

  @Transform(({ value }) => String(value))
  @IsString()
  productTypeId: string;

  @Transform(({ value }) => String(value))
  @IsString()
  productCategoryId: string;
}
