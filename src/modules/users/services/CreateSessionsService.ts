/* import AppError from '@shared/http/erros/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
  token: undefined;
}

interface IResponse {
  user: User;
}

class CreateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UsersRepository);
    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address alredy used!');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}
export default CreateUserService; */
