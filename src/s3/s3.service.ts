import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class S3Service {
  private awsS3;
  private oneYearCacheAge = 31536000;

  constructor() {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    console.log({
      accessKeyId,
      secretAccessKey,
    });

    this.awsS3 = new AWS.S3({
      accessKeyId,
      secretAccessKey,
    });
  }

  s3() {
    return this.awsS3;
  }

  async uploadImage(
    bucketName: string,
    dir: string,
    fileName: string,
    oneYearCacheAge = this.oneYearCacheAge,
  ): Promise<string> {
    let imageUrl = '';

    try {
      const uploadedImage = await this.awsS3
        .upload({
          Bucket: bucketName,
          Key: fileName,
          Body: fs.readFileSync(path.join(dir, fileName)),
          CacheControl: `max-age=${oneYearCacheAge}`,
        })
        .promise();

      imageUrl = uploadedImage.Location;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }

    return imageUrl;
  }
}
