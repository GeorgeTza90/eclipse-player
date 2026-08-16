import 'dotenv/config';
import { Knex } from 'knex';
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_PORT } from './src/config/env.js';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql2',
    connection: {
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      port: MYSQL_PORT,
    },
    migrations: { directory: './db/migrations' },
    seeds: { directory: './db/seeds' },
  },

  production: {
    client: 'mysql2',
    connection: {
      host: MYSQL_HOST,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      port: MYSQL_PORT,
    },
    migrations: { directory: './db/migrations' },
    seeds: { directory: './db/seeds' },
  },
};

export default config;