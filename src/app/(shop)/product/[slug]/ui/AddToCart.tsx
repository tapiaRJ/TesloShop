"use client";

import { useState } from "react";

import { QuantitySelector, SizeSelector } from "@/src/components";
import type { CartProduct, Product, Size } from "@/src/interfaces/product.interface";
import { useCartStore } from "@/src/store";
//import { AddToCart } from './AddToCart';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {

  const addProductToCart = useCartStore( state => state.addPruducTocart );
  

  const [size, setSize] = useState<Size | undefined>();
  const [ quatity, setQuantiy ] = useState<number>( 1 ); // una camiseta por defecto
  const [ posted, setPosted ] =  useState( false );

  const AddToCart = () => {

    console.log("Agregando al carrito...");

    setPosted(true);

    if ( !size ) return;
  
    //console.log({ size, quatity, product });
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quatity,
      size: size,
      image: product.images[0] // la primera imagen del producto
    }
    

    addProductToCart( cartProduct );
    setPosted(false);
    setQuantiy(1);
    setSize(undefined);
  }



  return (
    <>
      {posted && !size && (

      <samp className="mt-2 text-red-500 fade-in">
        Debe seleccionar una talla!
      </samp>

      )

      }

      {/* Selctor de Tallas */}

      <SizeSelector
        selectedSize={ size }
        availableSizes={product.sizes}
        onSizeChanged={ (size)=> setSize( size ) }
      />

      {/* Selector d Cantidad */}
      <QuantitySelector
       quantity={ quatity }
      onQuantityChanged={ setQuantiy } 
      />

      {/* button */}
      <button
      onClick={ AddToCart }
      className="btn-primary my-5">Agregar al carrito</button>
    </>
  );
};
