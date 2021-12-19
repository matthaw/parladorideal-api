const process = require('process');

const path = process.env.DEVELOPMENT_ENV === 'true' ? 'src' : 'dist';

module.exports = {
  type: 'sqlite',
  database: './database/database.sqlite',
  migrations: [`./${path}/database/migrations/**.{ts,js}`],
  entities: [`./${path}/entities/**.{ts,js}`],
  cli: {
    migrationsDir: './src/database/migrations',
  },

  seeds: ['./src/database/seeds/**.ts'],
  factories: ['./src/database/factories/**.ts'],
};
