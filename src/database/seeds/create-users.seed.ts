import { Seeder, Factory } from 'typeorm-seeding';
import { User } from '../../entities/User';
import { Post } from '../../entities/Post';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(User)({ roles: [] })
      .createMany(10)
      .then(async (users) => {
        for (const user of users) {
          await factory(Post)({ user_id: user.id }).createMany(2);
        }
      });
  }
}
