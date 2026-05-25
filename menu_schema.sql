
-- SCHEMA PARA BASE DE DATOS DE MENÚ SEMANAL

-- 1. Tabla de usuarios
CREATE TABLE users_menu(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tipos enumerados
CREATE TYPE dish_type AS ENUM ('BREAKFAST', 'LUNCH', 'COMPLEMENT', 'CONSOMME', 'DESSERT');
CREATE TYPE weekday AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY');

-- 3. Tabla de platillos
CREATE TABLE dishes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type dish_type NOT NULL
);

-- 4. Tabla de menús
CREATE TABLE menus (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users_menu(id) ON DELETE CASCADE,
  week_number INTEGER NOT NULL,
  year INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabla de días del menú
CREATE TABLE menu_days (
  id SERIAL PRIMARY KEY,
  menu_id INTEGER REFERENCES menus(id) ON DELETE CASCADE,
  day weekday NOT NULL
);

-- 6. Tabla de platillos por día
CREATE TABLE menu_day_dishes (
  id SERIAL PRIMARY KEY,
  menu_day_id INTEGER REFERENCES menu_days(id) ON DELETE CASCADE,
  dish_id INTEGER REFERENCES dishes(id),
  position INTEGER,  -- para identificar si es opción 1 o 2
  category dish_type NOT NULL
);
