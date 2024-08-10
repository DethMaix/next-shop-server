import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import { parse } from 'csv-parse';
import { hash } from 'argon2';

const prisma = new PrismaClient();
// const fileUpload = new FileUploadService(new ConfigService());

async function main() {
  const password = await hash('System1');
  const systemUser = await prisma.user.upsert({
    where: {
      username: 'System1',
    },
    create: {
      bonusBalance: 1000,
      username: 'System1',
      email: 'system1@example.com',
      password,
      roles: {
        create: {
          role: 'SuperAdmin',
        },
      },
    },
    update: {
      password,
    },
  });

  const productCategories = [
    'Tops',
    'Dresses',
    'Skirts',
    'Jeans',
    'Trousers',
    'Shorts',
    'Shirts',
    'Sweatshirts',
    'Knitwear',
    'Coats & Jackets',
    'Eyewear',
    'Jewellery',
    'Boots',
    'Sneakers',
    'Accessories',
    'Hats',
    'Socks',
  ];

  for (const category of productCategories) {
    await prisma.productCategory.upsert({
      where: {
        name: category,
        slug: category.toLowerCase().replace(/\s+/g, '-'),
      },
      create: {
        name: category,
        slug: category.toLowerCase().replace(/\s+/g, '-'),
      },
      update: {},
    });
  }

  const filePathProducts = 'prisma/seeds/items.csv';
  const csvDataDynamicVouchers = [];
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePathProducts)
      .pipe(parse({ delimiter: ',', columns: true }))
      .on('data', (csvrow) => csvDataDynamicVouchers.push(csvrow))
      .on('end', resolve)
      .on('error', reject);
  });

  for (const record of csvDataDynamicVouchers) {
    try {
      await prisma.product.upsert({
        where: {
          id: record.id,
        },
        update: {
          imageUrl: record.imageUrl,
          price: +record.price,
          name: record.name,
          slug: record.name.replace(/\s+/g, '-').toLowerCase(),
        },
        create: {
          name: record.name,
          imageUrl: record.imageUrl,
          price: +record.price,
          slug: record.name.replace(/\s+/g, '-').toLowerCase(),
          productCategory: {
            connectOrCreate: {
              where: {
                name: record.category,
                slug: record.category.toLowerCase().replace(/\s+/g, '-'),
              },
              create: {
                name: record.category,
                slug: record.category.toLowerCase().replace(/\s+/g, '-'),
              },
            },
          },
          productType: {
            connectOrCreate: {
              where: {
                name: record.type,
                slug: record.type.toLowerCase().replace(/\s+/g, '-'),
              },
              create: {
                name: record.type,
                slug: record.type.toLowerCase().replace(/\s+/g, '-'),
              },
            },
          },
        },
      });
    } catch (error) {
      console.error(
        `Failed to process product ${record.name}: ${error.message}`,
      );
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
