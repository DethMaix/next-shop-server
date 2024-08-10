import { Injectable, NotFoundException } from '@nestjs/common';
import { type User } from '@prisma/client';

import { PrismaService } from 'src/prisma/prisma.service';
// import { FileUploadService } from 'src/file-upload/file-upload.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  // private readonly logger = new Logger(ProductService.name);
  // constructor(private readonly httpService: HttpService) {}
  constructor(
    private readonly prismaService: PrismaService,
    // private readonly fileUploadService: FileUploadService,
  ) {}

  // async getAsosProducts(): Promise<Observable<any>> {
  //   return this.httpService
  //     .get(
  //       'https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=4209&country=US&sort=freshness&currency=USD&sizeSchema=US&limit=48&lang=en-US',
  //       {
  //         headers: {
  //           'x-rapidapi-key':
  //             'f60ec051a8msh89d7e4fea7f4366p1d6853jsn33d23da7c64f',
  //           'x-rapidapi-host': 'asos2.p.rapidapi.com',
  //         },
  //       },
  //     )
  //     .pipe(
  //       map((res) => {
  //         console.log(res.data);
  //         return res.data;
  //       }),
  //     )
  //     .pipe(
  //       catchError(() => {
  //         throw new ForbiddenException('API not available');
  //       }),
  //     );
  // }

  async create(
    createProductDto: CreateProductDto,
    image: Express.Multer.File,
    user: User,
  ) {
    // const imageUrl = await this.fileUploadService.uploadFile(image);

    // return this.prismaService.product.create({
    //   data: {
    //     ...createProductDto,
    //     imageUrl,
    //   },
    // });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prismaService.product.create({
      data: {
        ...createProductDto,
        price: +createProductDto.price,
        imageUrl: image.filename,
      },
    });
  }

  // TODO:FIXME: add pagination (like in partypots or treasurecase)
  findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const product = this.prismaService.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prismaService.product.update({
      where: { id },
      data: {
        ...updateProductDto,
        price: +updateProductDto.price,
      },
    });
  }

  remove(id: string) {
    const product = this.prismaService.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.prismaService.product.delete({ where: { id } });
  }
}
