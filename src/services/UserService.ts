import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';

interface IUserService {
  name: string;
  email: string;
  password: string;
}

@EntityRepository(User)
class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create({ name, email, password }: IUserService) {
    // Verificar se o usuário existe
    const userExists = await this.usersRepository.findOne({ email });

    // Se existir retorna usuário
    if (userExists) {
      throw new Error('User already exists');
    }

    // Se não existir, salvar no banco de dados
    const user = this.usersRepository.create({ name, email, password });
    await this.usersRepository.save(user);

    return user;
  }

  async findByEmail(email: string, relations?: [string]) {
    // Verificar se o usuário existe
    const userExists = await this.usersRepository.findOne(
      { email },
      { relations },
    );

    return userExists;
  }
}

export { UsersService };
