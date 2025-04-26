# Cátedra Honorífica de Ciencias Técnicas - Universidad Hermanos Saíz Montes de Oca

## Descripción

Este proyecto es el sitio web para la gestión de la información de la Cátedra Honorífica de Ciencias Técnicas de la Universidad Hermanos Saíz Montes de Oca. Permite administrar y mostrar información relevante sobre la cátedra, incluyendo:

- Personal
- Departamentos
- Proyectos
- Publicaciones
- Eventos
- Premios
- Tareas
- Estatutos
- Configuración general

## Tecnologías Utilizadas

- **Frontend:** React
- **Backend:** Node.js
- **Base de Datos:** MongoDB
- **Servidor Web:** Nginx
- **Contenedorización:** Docker

## Configuración

Para ejecutar este proyecto, necesitas tener instalado Docker y Docker Compose.

1.  Ejecuta el comando para construir y levantar los contenedores:

    ```bash
    docker compose up -d
    ```

## Variables de Entorno

Las siguientes variables de entorno son necesarias para ejecutar el proyecto:

- **MONGO_URL:** URL de la base de datos MongoDB.

- **PORT:** Puerto en el que se ejecutará el servidor web.

- **SECRET_JWT\_:** Clave secreta para firmar los tokens JWT.\_SEED

- **ADMIN_EMAIL\_:** Correo electrónica del administrador del sitio web.

- **ADMIN_PASSWORD\_:** Contraseña del administrador del sitio web.

Estas variables se definen en el archivo `docker-compose.yml`.

## Estructura del Proyecto

- `client/`: Contiene el código fuente del frontend (React).
- `server/`: Contiene el código fuente del backend (Node.js).
- `docker-compose.yml`: Define los servicios, redes y volúmenes para la ejecución del proyecto con Docker Compose.
- `README.md`: Este archivo.

## Contribución

Si deseas contribuir a este proyecto, por favor, sigue estos pasos:

1.  Crea un fork del repositorio.
2.  Crea una rama con tu contribución:

    ```bash
    git checkout -b [nombre de la rama]
    ```

3.  Realiza tus cambios y commitea:

    ```bash
    git commit -m "[Descripción de los cambios]"
    ```

4.  Sube tus cambios a tu fork:

    ```bash
    git push origin [nombre de la rama]
    ```

5.  Crea un pull request.

## Licencia
