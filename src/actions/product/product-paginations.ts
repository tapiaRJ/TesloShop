"use server";

import { Gender } from "@/src/app/generated/prisma/enums";
import prisma from "@/src/lib/prisma";
import { Pagination } from 'swiper/modules';



interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}


export const getPaginatedProductsWithImages = async ({ page = 1, take = 12, gender, }: PaginationOptions ) => {

  if ( isNaN( Number(page))) page = 1;
  if ( page < 1 ) page = 1;

  try {

    // 1. rae datos de la base de de datos, obtener Productos o buscar muchos
    const products = await prisma.product.findMany({  

      take: take,
      skip: ( page - 1 ) * take, //paginations
      include: {
        ProductImage: { 
          take: 2,
          select: {
            url: true,
          }
        },
      },
    //! Por defecto  
    where: {
      gender: gender,
    }


    });

    // 2. Obtener el total de paginas
    //TODO:
    const totalCount = await prisma.product.count({
      where: {
      gender: gender,
    },
    });
    
    const totalPages = Math.ceil( totalCount / take );

    
    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map( (product) => ({
        ...product,
        images: product.ProductImage.map( image => image.url )
      }))
    }


  } catch (error) {
    console.error(error);
    throw new Error("nose puede cargar productos");
  }
};


