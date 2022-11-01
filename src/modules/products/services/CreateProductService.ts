import AppError from '@shared/http/erros/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Produtc';
import { ProductRepository } from '../typeorm/repositories/ProductRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: IRequest): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductRepository);
    const productExists = await productRepository.findByName(name);
    if (productExists) {
      console.log('passou aqui');
      throw new AppError('There is already one product with this name', 403);
    }
    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    await productRepository.save(product);

    return product;
  }
}
export default CreateProductService;
