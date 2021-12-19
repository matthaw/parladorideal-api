import { Server } from '@overnightjs/core';
import express, { Application } from 'express';
import { createConnection } from 'typeorm';
import expressPino from 'express-pino-logger';

import { PostsController } from './controllers/posts';
import { UsersController } from './controllers/users';
import logger from './logger';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    await this.databaseSetup();
    this.setupExpress();
    this.setupControllers();
  }

  private setupExpress(): void {
    this.app.use(express.json());
    this.app.use(expressPino({ logger }));
  }

  private setupControllers(): void {
    const usersController = new UsersController();
    const postsController = new PostsController();

    this.addControllers([usersController, postsController]);
  }

  public getApp(): Application {
    return this.app;
  }

  private async databaseSetup(): Promise<void> {
    await createConnection();
  }

  public start(): void {
    this.app.listen(this.port, () => {
      logger.info('Server listening of port: ' + this.port);
    });
  }
}
