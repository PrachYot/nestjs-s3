import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3Service } from './s3.service';

@Module({})
export class S3Module {
  static register(options: { envFilePath: string }): DynamicModule {
    const envPath = options.envFilePath || '.env';

    return {
      module: S3Module,
      imports: [
        ConfigModule.forRoot({
          envFilePath: [envPath],
        }),
      ],
      providers: [S3Service],
      exports: [S3Service],
    };
  }
}
