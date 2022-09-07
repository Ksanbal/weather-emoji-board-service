import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmAsyncModuleOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: process.env.MODE == 'dev', //! set 'false' in production
    autoLoadEntities: true,
    logging: process.env.MODE == 'dev',
    charset: 'utf8mb4',
    timezone: process.env.TZ,
  }),
};
