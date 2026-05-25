# Requerimientos y pendientes

## Estado actual

- El proyecto corre localmente con Next.js en `http://localhost:3000`.
- El navbar muestra el acceso de administrador para crear menu.
- La pantalla de crear menu carga listas desplegables con platillos de ejemplo.
- El guardado del menu escribe en las tablas que lee la vista de menu semanal:
  - `Menu`
  - `DayMenu`
  - `Dish`
- La vista de menu semanal consulta el menu por semana y anio actual.
- La sesion de NextAuth incluye rol e identificador de usuario, con busqueda por email como respaldo.
- Prisma esta alineado con la base local para el enum de dias mediante `@@map("DayOfWeek")`.

## Pendientes para manana

- Cambio 1: pendiente de definir.
- Cambio 2: pendiente de definir.

## Notas tecnicas

- La base local usa PostgreSQL `comedores` en `localhost:5432`.
- Hay historial mixto de migraciones de menu; por ahora el flujo activo usa `Menu.week`, `Menu.year`, `DayMenu.day` y `Dish.group`.
- Si se modifica el schema de Prisma, detener el servidor local antes de ejecutar `npx prisma generate` para evitar bloqueo del engine en Windows.
