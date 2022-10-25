import AppError from '@shared/http/erros/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository);

    const products = await productRepository.findOne(id);

    if (!products) {
      throw new AppError('Product not found!');
    }

    await productRepository.remove(products);
  }
}
export default DeleteProductService;
