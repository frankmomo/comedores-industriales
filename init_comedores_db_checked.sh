
#!/bin/bash

# Configuración
DB_NAME="comedores"
DB_USER="postgres"
DB_HOST="localhost"
DB_PORT="5432"
export PGPASSWORD="Xjm6qbq8hw2"

echo "Usando base de datos existente: $DB_NAME"

# Verificar si las tablas ya existen
echo "Verificando existencia de tablas..."
psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -tc "SELECT to_regclass('public.users_menu');" | grep -q users

if [ $? -eq 0 ]; then
  echo "⚠️  Las tablas ya existen. Abortando para evitar errores."
  echo "Si deseas forzar la reinstalación, primero elimina las tablas manualmente."
  exit 1
else
  echo "✅ Tablas no encontradas. Procediendo con la importación..."
fi

# Importar los archivos
echo "Importando esquema..."
psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -f menu_schema.sql

echo "Importando datos de platillos (seed)..."
psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -f menu_seed.sql

echo "Insertando menú de ejemplo..."
psql -U $DB_USER -h $DB_HOST -p $DB_PORT -d $DB_NAME -f example_menu_insert.sql

echo "🎉 ¡Listo! Base de datos 'comedores' actualizada con el esquema y datos de ejemplo."
