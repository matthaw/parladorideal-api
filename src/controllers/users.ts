import { Controller, Post, Get, Middleware } from '@overnightjs/core';
import { Request, Response } from 'express';
import { authMiddleware } from '../middlewares/auth';
import AuthService from '../services/auth';
import { UsersService } from '../services/UserService';

@Controller('users')
class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  @Post('')
  async create(req: Request, res: Response): Promise<Response> {
    let { name, email, password, passwordConfirmation } = req.body;

    if (!password === passwordConfirmation) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
      password = await AuthService.hashPassword(password);

      const user = await this.usersService.create({ name, email, password });
      return res.status(201).send(user);
    } catch (error) {
      return res.status(409).json({ error: error.message });
    }
  }

  @Post('authenticate')
  public async authenticate(
    req: Request,
    res: Response,
  ): Promise<Response | undefined> {
    const { email, password } = req.body;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!(await AuthService.comparePasswords(password, user.password))) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = AuthService.generateToken(user);
    return res.status(200).send({ token });
  }

  @Get('posts')
  @Middleware(authMiddleware)
  public async me(req: Request, res: Response): Promise<Response> {
    const email = req.decoded ? req.decoded?.email : undefined;

    const user = await this.usersService.findByEmail(email, ['posts']);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    delete user.password;
    return res.send(user).status(200);
  }
}

export { UsersController };
