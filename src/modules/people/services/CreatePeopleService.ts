import AppError from '@shared/http/erros/AppError';
import { getCustomRepository } from 'typeorm';
import People from '../typeorm/entities/People';
import PeopleRepository from '../typeorm/repositories/PeopleRepository';

interface IRequest {
  name: string;
  age: number;
}

class CreatePeopleService {
  public async execute({ name, age }: IRequest): Promise<People> {
    const peopleRepository = getCustomRepository(PeopleRepository);
    const peopleExists = peopleRepository.findByName(name);

    if (!peopleExists) {
      throw new AppError(`${name} doesn't exist!`);
    }

    const people = peopleRepository.create({
      name,
      age,
    });

    await peopleRepository.save(people);

    return people;
  }
}

export default CreatePeopleService;
