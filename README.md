# S3 Module

A NestJS module to provide a S3 client and a S3 service for your application.

Implementation purpose

1. Reduce project setup time
2. Reduce project onboarding time
3. Help lean your base project

## Installation

```sh
yarn add @prachyot/nestjs-s3
```

## Usage

Add these new variable to your `.env` file

```sh
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

Import the module in your AppModule

```ts
import { S3Module } from '@prachyot/nestjs-s3';
...

@Module({
  imports: [
    S3Module
    ...
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

You can change the default configuration by passing an object to the forRoot method

```ts
import { S3Module } from '@prachyot/nestjs-s3';
...

@Module({
  imports: [
    S3Module.forRoot({
      envFilePath: '.env.local' // Change the path to your env file
    })
    ...
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Or you can use `forRootAsync` method to pass a factory function

```ts
import { S3Module } from '@prachyot/nestjs-s3';
...

@Module({
  imports: [
    S3Module.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          envFilePath: configService.get('ENV_FILE_PATH'),
        }
      }
    })
    ...
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Service method specification

```ts
// Method: s3
// Description: Returns an instance of the S3 client

this.s3Service.s3();
```

```ts
/*
 * Method: uploadFile
 * Description: Uploads a file to S3
 *
 * @Params:
 * bucketName: string
 * dir: string
 * fileName: string
 * cacheAge: number (optional) (default: 31536000) (1 year)
 */

await this.uploadFile('my-bucket', 'src/assets', 'my-file.png');
```
