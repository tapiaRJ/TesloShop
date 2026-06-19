"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/src/store";
import { currencyFormat } from "@/src/utils";


export const OrderSummary = () => {

  const [loaded, setLoaded] = useState(false);

  const cart = useCartStore( state => state.cart );

// 1. 🚀 Extraemos solo la función de Zustand (¡Sin ejecutarla adentro!)
  const getSummaryInformation = useCartStore( state => state.getSummaryInformation );

  // 2. Ejecutamos la función aquí afuera para obtener el objeto de datos
  const { itemsInCart, subTotal, tax, total } = getSummaryInformation();

  useEffect(() => {
    setLoaded(true);
    },[])

    if ( !loaded ) return <p>Loadeing...</p>
  






  return (
    <div className="grid grid-cols-2">
      <span>No Productos</span>
      <span className="text-right">{ itemsInCart === 1 ? '1 articulo ' : `${ itemsInCart } articulos`}</span>

      <span>Sub Total</span>
      <span className="text-right">{currencyFormat (subTotal) } </span>

      <span>Impuestos { currencyFormat (tax) }</span>
      <span className="text-right">$ 100</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat (total) }</span>
    </div>
  );
};
