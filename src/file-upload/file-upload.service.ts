// import { BadRequestException, Injectable, Logger } from '@nestjs/common';
// import { v4 as uuidv4 } from 'uuid';
// import { Bucket, Storage } from '@google-cloud/storage';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class FileUploadService {
//   private bucket: Bucket;
//   private storage: Storage;

//   constructor(private readonly configService: ConfigService) {
//     // uncomment during local development:
//     this.storage = new Storage({
//       keyFilename: 'treasurecase-0928f0f31b6a.json',
//     });
//     // this.storage = new Storage();
//     this.bucket = this.storage.bucket(configService.get('BUCKET_NAME'));
//   }

//   generateFileName(file: Express.Multer.File, code?: string): string {
//     if (code) {
//       const parts = file?.originalname?.split('.');
//       const format = parts[parts.length - 1];
//       if (format.length) {
//         return `${code}.${format}`;
//       } else return code;
//     }
//     return `${uuidv4()}=${file?.originalname ?? 'img'}`;
//   }

//   async uploadFile(
//     file: Express.Multer.File,
//     filePath = '',
//     code?: string,
//   ): Promise<string | null> {
//     try {
//       const fileName = this.generateFileName(file, code);
//       // tslint:disable-next-line:no-console
//       console.log(filePath, fileName);
//       const bucketFile = this.bucket.file(`${filePath}/${fileName}`);

//       try {
//         await bucketFile.save(file.buffer);

//         return bucketFile.publicUrl();
//       } catch (error) {
//         throw new BadRequestException(error?.message);
//       }
//     } catch (e) {
//       Logger.error({
//         message: '[FileUploadService] Error: File upload error',
//         context: FileUploadService.name,
//         error: e,
//         fileName: file?.originalname,
//       });
//       return '/images/Common/no-pic.png';
//     }
//   }
// }
