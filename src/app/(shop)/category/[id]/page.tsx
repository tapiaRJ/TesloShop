import { ProductGrid, Title } from "@/src/components";
import { Category } from "@/src/interfaces/product.interface";
import { initialData } from "@/src/seed/seed";
import { notFound } from "next/navigation";

const seedproducts = initialData.products;

interface Props {
  params: {
    id: Category;
  }
}

export default async function categoryPage({ params }: Props) {

  const { id } = await params;
  const products = seedproducts.filter(product => product.gender === id);

  const labels: Record<Category, string> = {
    'men': 'para Hombres',
    'women': 'para Mujeres',
    'kid': 'para Niños',
    'unisex': 'para todos'
  }

  // if ( id === 'kids' ){
  //   notFound();
  // }

  return (
    <>
      <Title
        title={ `Articulos  ${ labels [id] }` }
        subtitle="Todos los Productos"
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />
    </>
  );
}
