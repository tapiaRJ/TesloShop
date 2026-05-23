export const revalidate = 60; // Tiempo en segundos (60 seg)


import { redirect } from "next/navigation";

import { Pagination, ProductGrid, Title } from "@/src/components";
import { getPaginatedProductsWithImages } from "@/src/actions";
import { Gender } from "../generated/prisma/enums";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function Home({ searchParams }: Props) {

  const params = await searchParams;

  const page = params.page ? parseInt(params.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({page});


  if (products.length === 0) {
    redirect('/');
  }

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los Productos"
        className="mb-2"
      />
      <ProductGrid
        products={products}
      />

      <Pagination totalPages ={ totalPages } />

    </>
  );
}


