export const revalidate = 604800; // 7 dias

import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";

import { titleFont } from "@/src/config/fonts";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from "@/src/components";
import { getProductBySlug } from "@/src/actions";
import { MdDescription } from "react-icons/md";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}


//meta data es para los bot de google and facebook
export async function generateMetadata({ params }: Props,parent: ResolvingMetadata,): Promise<Metadata> {

  const { slug } = await params
  //const slug = (await params).slug

  // fetch post information
  const product = await getProductBySlug(slug);

  // const previousImages = (await parent ).openGraph?.images || []

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",

      //image: [], https://mi sitio web.com/product/iamge.png
      images: [`/products/${ product?.images[1] }`],
    },
  };
}




export default async function ({ params }: Props) {
  const { slug } = await params;
  //const product = initialData.products.find((product) => product.slug === slug);
  const product = await getProductBySlug(slug);
  //console.log(product);

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
        <StockLabel slug={product.slug} />

        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart  product = { product }/>
       

        {/* Desxriptions */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
