// ... (tus imports igual que antes)
import "dotenv/config"; // Esto debe ser lo primero
import prisma from "../lib/prisma";
import { Gender } from "../app/generated/prisma/client";
import { initialData } from "./seed";

async function main() {
  //Borrar Registros previos
  console.log("Iniciando Seed....!");
  // await Promise.all([
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  // ]);
  const { categories, products } = initialData;

  //Categorias
  // {
  //   name: 'Shirts'
  // }

  console.log("comvertiendo a un objeto name!");
  const categoriesData = categories.map((name) => ({ name }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  console.log("Categorias Creadas....! & consulta a la DB....!");
  // consula a Base de Datios para obtener las categorias
  const categoriesFromDB = await prisma.category.findMany();

  //  console.log("Categorias en DB....!", categoriesFromDB);
  const categoriesMap = categoriesFromDB.reduce(
    (Map, category) => {
      Map[category.name.toLowerCase()] = category.id;
      return Map;
    },
    {} as Record<string, string>,
  ); // <<string=shirts, string=categoriaId>>

  //########## Crear Productos ##########
  const { images, type, ...product1 } = products[0];

  // await prisma.product.create({
  //   data: {
  //     ...product1,
  //     categoryId: categoriesMap['shirts'], // Usamos el mapa para obtener el ID de la categoría
  //     gender: product1.gender as Gender,
  //   }
  // })

  //########## Crear Productos ##########
  console.log("Creando Productos....!");

  for (const product of products) {
    const { type, images, gender, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type], // Forzamos el tipo al Enum Gender de Prisma
        gender: gender as Gender,
      },
    });

    //###############images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    //##############insrtar a base de datos
    await prisma.productImage.createMany({
      data: imagesData,
    });
  }

  console.log("Seed Ejecutado Correctamente al final....!");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();
