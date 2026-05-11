# Descripcciion



## Correr en dev

1. Clonar repositorio
2. Crear una copia del ```.env.template``` y renombrar a ```.env``` y cambiar las bariables de entorno.
3. instalar dependencias ```npm install```
4. Levanatar la base de datos ```docker-compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev "name"```
<!-- 6. Generar Cliente ```npx prisma generate``` -->
7. Ejecutar seed ```npm run seed```
8. Correr el proyecto    ```npm run dev```

## Correr en prod