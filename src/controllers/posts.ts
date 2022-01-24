import {
  Controller,
  Delete,
  Get,
  Middleware,
  Post,
  Put,
} from '@overnightjs/core';
import { Request, Response } from 'express';
import { authMiddleware } from '../middlewares/auth';
import { PostsService } from '../services/PostsService';

@Controller('posts')
class PostsController {
  private postService: PostsService;

  constructor() {
    this.postService = new PostsService();
  }

  @Get('')
  async all(req: Request, res: Response): Promise<Response> {
    const posts = await this.postService.findAll();

    return res.json(posts);
  }

  @Post('')
  @Middleware(authMiddleware)
  async create(req: Request, res: Response): Promise<Response> {
    const { content } = req.body;
    const { id } = req.decoded;

    const post = await this.postService.create({ content, user_id: id });

    if (!post) {
      return res.status(422).json({ message: 'Post not created' });
    }

    return res.json(post);
  }

  @Put('')
  @Middleware(authMiddleware)
  async update(req: Request, res: Response): Promise<Response> {
    const { content, id } = req.body;
    const { id: userId } = req.decoded;

    const post = await this.postService.findOne(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not exists' });
    }

    if (post.user_id !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updatedPost = await this.postService.update({ id: post.id, content });

    return res.json(updatedPost).status(200);
  }

  @Delete(':id')
  @Middleware(authMiddleware)
  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { id: userId } = req.decoded;

    const post = await this.postService.findOne(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not exists' });
    }

    if (post.user_id !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await this.postService.delete(post.id);

    return res.status(200).send();
  }
}

export { PostsController };
