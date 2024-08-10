import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';

@Injectable()
export class ProductTypeService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProductTypeDto: CreateProductTypeDto) {
    return this.prismaService.productType.create({
      data: {
        ...createProductTypeDto,
      },
      include: { products: true },
    });
  }

  // TODO:FIXME: add pagination (like in partypots or treasurecase)
  findAll() {
    return this.prismaService.productType.findMany({
      include: { products: true },
    });
  }

  async findOne(id: string) {
    const productType = await this.prismaService.productType.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!productType) {
      throw new NotFoundException('Product type not found');
    }

    return productType;
  }

  update(id: string, updateProductTypeDto: UpdateProductTypeDto) {
    const productType = this.prismaService.productType.findUnique({
      where: { id },
    });

    if (!productType) {
      throw new NotFoundException('Product type not found');
    }

    return this.prismaService.productType.update({
      where: { id },
      data: {
        ...updateProductTypeDto,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.productType.delete({ where: { id } });
  }
}
