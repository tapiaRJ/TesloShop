
export const revalidate = 60; // Tiempo en segundos (60 seg )


import { getPaginatedProductsWithImages } from "@/src/actions";
import { Pagination, ProductGrid, Title } from "@/src/components";

import { Gender } from "@/src/app/generated/prisma/client";
import { redirect } from "next/navigation";


interface Props {
  params: Promise<{
    gender: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function categoryPage({ params, searchParams }: Props) {

  const { gender } = await params;

  const resolvedSearchParams = await searchParams;

  const page = resolvedSearchParams.page ? parseInt(resolvedSearchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender , 
  
  });


  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }



  //const products = seedproducts.filter(product => product.gender === id);

  const labels: Record<string, string> = {
    'men': 'para Hombres',
    'women': 'para Mujeres',
    'kid': 'para Niños',
    'unisex': 'para todos'
  };

  // if ( id === 'kids' ){
  //   notFound();
  // }

  return (
    <>
      <Title
        title={`Articulos  ${ labels [ gender ]}`}
        subtitle="Todos los Productos"
        className="mb-2"
      />

      <ProductGrid
        products={ products }
      />

      <Pagination totalPages={ totalPages }/>
    </>
  );
}
