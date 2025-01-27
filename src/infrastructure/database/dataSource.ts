import { config as envConfig } from '@shared/utils/config/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const config: DataSourceOptions = {
    type: 'postgres',
    host: envConfig.DB_HOST,
    database: envConfig.DB_NAME,
    port: envConfig.DB_PORT,
    username: envConfig.DB_USERNAME,
    password: envConfig.DB_PASSWORD,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy()
};

export const AppDataSource: DataSource = new DataSource(config);
