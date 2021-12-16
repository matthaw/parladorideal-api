import { getCustomRepository, Repository } from 'typeorm';
import { Post } from '../entities/Post';
import { PostsRepository } from '../repositories/PostsRepository';

interface IPostsCreate {
  content: string;
  user_id: string;
}

interface IPostsUpdate extends Omit<IPostsCreate, 'user_id'> {
  id: string;
}

class PostsService {
  private postsRepository: Repository<Post>;

  constructor() {
    this.postsRepository = getCustomRepository(PostsRepository);
  }

  async findAll() {
    return this.postsRepository
      .createQueryBuilder('post')
      .select(['post.content', 'post.created_at', 'user.name'])
      .leftJoin('post.user', 'user')
      .getMany();
  }

  async create({ content, user_id }: IPostsCreate) {
    const post = this.postsRepository.create({
      content,
      user_id,
    });

    await this.postsRepository.save(post);
    return post;
  }

  findOne(id: string) {
    return this.postsRepository.findOne(id);
  }

  async update({ id, content }: IPostsUpdate) {
    const post = await this.postsRepository.findOne(id);
    post.content = content;
    await this.postsRepository.save(post);

    return post;
  }

  async delete(id: string) {
    await this.postsRepository.delete(id);
  }
}

export { PostsService };
