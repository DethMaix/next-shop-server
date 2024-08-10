import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PrismaService } from 'src/prisma/prisma.service';
// import { FileUploadService } from 'src/file-upload/file-upload.service';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [HttpModule],
  controllers: [ProductController],
  // providers: [ProductService, PrismaService, FileUploadService],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
