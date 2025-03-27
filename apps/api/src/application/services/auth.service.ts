import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { userRepository } from '../../infrastructure/repositories/user.repository';
import { SignUpDto, SignInDto } from '../dto/auth.dto';
import { validate } from 'class-validator';

export class AuthService {
  async signUp(dto: SignUpDto) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new Error('Validation failed');
    }

    const user = userRepository.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
    await userRepository.save(user);
    return { message: 'User created' };
  }

  async signIn(dto: SignInDto) {
    const errors = await validate(dto);
    if (errors.length > 0) {
      throw new Error('Validation failed');
    }

    const user = await userRepository.findOne({ where: { email: dto.email } });
    if (!user) throw new Error('User not found');

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new Error('Invalid password');

    const secret = process.env.JWT_SECRET ?? '';
    const expires = process.env.JWT_EXPIRES_IN ?? '1h';

    if (typeof expires !== 'string' && typeof expires !== 'number') {
      throw new Error('Invalid JWT_EXPIRES_IN value');
    }
    const token = jwt.sign({ userId: user.id }, secret as jwt.Secret, {
      expiresIn: expires as jwt.SignOptions['expiresIn'],
    });

    return { token, user: { name: user.name, email: user.email } };
  }
}
