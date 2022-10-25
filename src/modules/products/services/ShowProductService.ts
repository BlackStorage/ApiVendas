import AppError from '@shared/http/erros/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Produtc';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found!');
    }

    return product;
  }
}

export default ShowProductService;
