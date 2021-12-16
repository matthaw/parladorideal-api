import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface DecodedUser {
  [x: string]: any;
  id: string;
  name: string;
  password: string;
  email: string;
}

export default class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10,
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public static generateToken(payload: object): string {
    return jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  public static decodeToken(token: string): DecodedUser {
    return jwt.verify(token, process.env.JWT_SECRET) as DecodedUser;
  }
}
