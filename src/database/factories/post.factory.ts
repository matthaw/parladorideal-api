import { v4 as uuid } from 'uuid';
import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Post } from '../../entities/Post';

define(Post, (faker: typeof Faker, context: { user_id: string }) => {
  const post = new Post();
  post.id = uuid();
  post.content = faker.lorem.lines(3);
  post.user_id = context.user_id;
  return post;
});
