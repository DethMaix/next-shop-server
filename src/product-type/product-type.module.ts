import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { ProductTypeService } from './product-type.service';
import { ProductTypeController } from './product-type.controller';

@Module({
  controllers: [ProductTypeController],
  providers: [ProductTypeService, PrismaService],
})
export class ProductTypeModule {}
