import { v4 as uuid } from 'uuid';
import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../../entities/User';

define(User, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);
  const email = faker.internet.email(firstName, lastName);

  const user = new User();
  user.id = uuid();
  user.name = `${firstName} ${lastName}`;
  user.email = email;
  user.password =
    '$2b$10$bWhedc2KvU94Mpg2o5dscOGFdN2cOj3bF1jEFjwsVRZ44dxbjigI2'; // password is 12345678
  return user;
});
