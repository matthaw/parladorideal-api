import { SetupServer } from './server';
import logger from './logger';
import * as dotenv from 'dotenv';

dotenv.config();

(async (): Promise<void> => {
  try {
    const server = new SetupServer(Number(process.env.PORT));
    await server.init();
    server.start();
  } catch (error) {
    logger.error(`App exited with error: ${error}`);
  }
})();
