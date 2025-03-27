# Challenge Logixs

## Tecnologías y Herramientas Utilizadas

El proyecto utiliza **Nx** para la gestión de un monorepo, lo que permite organizar de manera eficiente las aplicaciones del backend y frontend. Se han desarrollado dos aplicaciones principales:

- **API (Backend):** Implementada con Node.js y AWS Serverless Framework.
- **Dashboard (Frontend):** Desarrollado con Next.js para la gestión de la interfaz de usuario.

## A tener encuenta

Estoy subiendo los fichero `.env` para que no tengais que crearlos ustedes en los siguientes lugares:

1. **api:** `/apps/api/.env`
2. **:** `/apps/dashboard/.env`
3. **root:** `/.env`

## Preparar el entorno

Para ejecutar el proyecto, sigue estos pasos:

1. **Instalar Nx:** `npm i -g nx`
2. **Instalar dependencias:** `npm i`

## Docker Compose

El proyecto incluye una configuración de Docker Compose que configura tanto el servicio API como la base de datos PostgreSQL. Para iniciar los servicios, ejecuta:

```bash
docker-compose up -d
```

Esto iniciará:

- Servicio API en el puerto 4242
- Base de datos PostgreSQL en el puerto 5432

Asegúrate de tener Docker y Docker Compose instalados en tu sistema antes de ejecutar el comando.

## Ejecutar el dashboard

Para ejecutar el frontend:

1. **Script:** `npx nx dev dashboard`

## Endpoints de la API

### Autenticación

- `POST /auth/signup` - Registrar un nuevo usuario
- `POST /auth/signin` - Iniciar sesión y obtener token JWT

### Tareas

- `GET /tasks` - Obtener todas las tareas del usuario autenticado
- `GET /tasks/:id` - Obtener una tarea específica por ID
- `POST /tasks` - Crear una nueva tarea
- `PUT /tasks/:id` - Actualizar una tarea
- `DELETE /tasks/:id` - Eliminar una tarea

### Estadísticas

- `GET /stats/overview` - Obtener estadísticas generales de tareas
  - Total de tareas
  - Tareas completadas
  - Tareas pendientes
  - Tareas vencidas
  - Tareas próximas
  - Tareas sin fecha de vencimiento
- `GET /stats/completion-rate` - Obtener tasa de finalización de tareas por mes
- `GET /stats/distribution` - Obtener distribución de tareas por estado y fecha de vencimiento
- `GET /stats/productivity` - Obtener puntuación de productividad y métricas
