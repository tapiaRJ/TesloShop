import { ProductGrid, Title } from "@/src/components";
import { titleFont } from "../../config/fonts";
import { initialData } from "@/src/seed/seed";


const products = initialData.products;



export default function Home() {
  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los Productos"
        className="mb-2"
      />

      <ProductGrid
        products={ products }
      />

    </>
  );
}


