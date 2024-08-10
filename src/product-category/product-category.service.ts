import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';

@Injectable()
export class ProductCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProductCategoryDto: CreateProductCategoryDto) {
    return this.prismaService.productCategory.create({
      data: {
        ...createProductCategoryDto,
      },
      include: { products: true },
    });
  }

  // TODO:FIXME: add pagination (like in partypots or treasurecase)
  findAll() {
    return this.prismaService.productCategory.findMany({
      include: { products: true },
    });
  }

  findOne(id: string) {
    const productCategory = this.prismaService.productCategory.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!productCategory) {
      throw new NotFoundException('Product category not found');
    }

    return productCategory;
  }

  update(id: string, updateProductCategoryDto: UpdateProductCategoryDto) {
    const productCategory = this.prismaService.productCategory.findUnique({
      where: { id },
    });

    if (!productCategory) {
      throw new NotFoundException('Product category not found');
    }

    return this.prismaService.productCategory.update({
      where: { id },
      data: {
        ...updateProductCategoryDto,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.productCategory.delete({ where: { id } });
  }
}
