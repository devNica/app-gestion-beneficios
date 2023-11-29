# APLICACION EN DESARROLLO DE TELCOR

Aplicacion Cliente del modulo de Beneficios del ministerio de Telecomunicaciones y Correos.


## Instalacion

- Descargar los archivos del proyecto desde el repositorio, a una ubicacion adecuada en el host del Cliente.

- Ejecutar el comando `npm i` para instalar los paquetes y depedencias del proyecto.

- Agregar un archivo en la raiz del proyecto con el nombre `.env` donde se agregaran las variables de entorno del proyecto necesarias para conectarse con la aplicacion servidor.

- Ejeuctar el comando `npm run dev` para correr la aplicacion en modo desarollo (unico modo valido al momento)


## Definicion de Variables de Entorno

| Parametro | Tipo | Descripcion |
| :--- | :--- | :--- |
| `VITE_APPLICATION_PORT` | `string` |  Puerto de Exposicion de la Aplicacion Cliente |
| `VITE_SERVER_URL` | `string` |  Dominio de la Aplicacion Servidor (`http://localhost:serverport`) |
| `VITE_API_PREFIX` | `string` |  Prefijo de Rutas del Servidor (`/telcor/beneficios/v1`) |