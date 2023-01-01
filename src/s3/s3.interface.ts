import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export interface S3ModuleOptions {
  envFilePath: string;
}

export type S3ModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<S3ModuleOptions>, 'useFactory' | 'inject'>;
