import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { S3Service } from './s3.service';
import { S3ModuleAsyncOptions, S3ModuleOptions } from './s3.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {
  static forRoot(options: S3ModuleOptions): DynamicModule {
    const envPath = options.envFilePath || '.env';

    return {
      module: S3Module,
      imports: [
        ConfigModule.forRoot({
          envFilePath: [envPath],
        }),
      ],
      providers: [
        {
          provide: 'S3_CONFIG_OPTIONS',
          useValue: options,
        },
        S3Service,
      ],
      exports: [S3Service],
    };
  }

  static forRootAsync(options: S3ModuleAsyncOptions): DynamicModule {
    return {
      module: S3Module,
      imports: options.imports,
      providers: [
        {
          provide: 'S3_CONFIG_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject,
        },
        S3Service,
      ],
      exports: [S3Service],
    };
  }
}
