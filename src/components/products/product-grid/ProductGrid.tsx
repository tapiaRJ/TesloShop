import { Product } from '../../../interfaces/product.interface';
import { ProductGriditem } from './ProductGriditem';

interface Props {
  products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {
        products.map( product => (
          <ProductGriditem
          key={ product.slug }
          product={ product }
          />
        ))
      }
    </div>
  )
}