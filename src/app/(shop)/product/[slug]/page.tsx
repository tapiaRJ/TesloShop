import { notFound } from "next/navigation";
import { initialData } from "../../../../seed/seed";
import { titleFont } from "@/src/config/fonts";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  SizeSelector,
} from "@/src/components";
import { QuantitySelector } from "../../../../components/product/quantity-selector/QuantitySelector";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ({ params }: Props) {
  const { slug } = await params;
  const product = initialData.products.find((product) => product.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md-1 md:col-span-2">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* Desktop Slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5x">
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* Selctor de Tallas */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* Selector d Cantidad */}
        <QuantitySelector quantity={2} />

        {/* button */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Desxriptions */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
