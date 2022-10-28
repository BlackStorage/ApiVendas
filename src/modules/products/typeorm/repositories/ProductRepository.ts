import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Produtc';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(
    name: string,
    price: number,
    quantity: number,
  ): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name,
        price,
        quantity,
      },
    });

    return product;
  }
}
