import { EntityRepository, Repository } from 'typeorm';
import People from '../entities/People';

@EntityRepository(People)
export default class PeopleRepository extends Repository<People> {
  public async findByName(name: string): Promise<People | undefined> {
    const people = await this.findOne({
      where: {
        name,
      },
    });

    return people;
  }

  public async findByAge(age: number): Promise<People | undefined> {
    const people = await this.findOne({
      where: {
        age,
      },
    });

    return people;
  }
}
