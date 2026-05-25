
#!/bin/bash

# Configuración
DB_NAME="comedores"
DB_USER="postgres"
DB_HOST="localhost"
DB_PORT="5432"
export PGPASSWORD="admin123"

echo "Usando base de datos existente: $DB_NAME"

echo "Importando esquema..."
psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -f menu_schema.sql

echo "Importando datos de platillos (seed)..."
psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -f menu_seed.sql

echo "Insertando menú de ejemplo..."
psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -f example_menu_insert.sql

echo "¡Listo! Base de datos inicializada con menú de ejemplo en 'comedores'."
