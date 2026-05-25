
-- Crear usuario
INSERT INTO users_menu (name, email, password_hash) VALUES
  ('Juan Pérez', 'juan@example.com', 'hashed_password');

-- Crear menú para semana 21 del 2025
INSERT INTO menus (user_id, week_number, year) VALUES
  (1, 21, 2025);

-- Crear días del menú (lunes a viernes)
INSERT INTO menu_days (menu_id, day) VALUES
  (1, 'MONDAY'),
  (1, 'TUESDAY'),
  (1, 'WEDNESDAY'),
  (1, 'THURSDAY'),
  (1, 'FRIDAY');

-- Insertar platillos para cada día
-- Día 1: MONDAY
INSERT INTO menu_day_dishes (menu_day_id, dish_id, position, category) VALUES
  (1, 1, 1, 'BREAKFAST'),
  (1, 2, 2, 'BREAKFAST'),
  (1, 11, 1, 'LUNCH'),
  (1, 12, 2, 'LUNCH'),
  (1, 21, 1, 'COMPLEMENT'),
  (1, 22, 2, 'COMPLEMENT'),
  (1, 31, NULL, 'CONSOMME'),
  (1, 36, NULL, 'DESSERT');

-- Día 2: TUESDAY
INSERT INTO menu_day_dishes (menu_day_id, dish_id, position, category) VALUES
  (2, 3, 1, 'BREAKFAST'),
  (2, 4, 2, 'BREAKFAST'),
  (2, 13, 1, 'LUNCH'),
  (2, 14, 2, 'LUNCH'),
  (2, 23, 1, 'COMPLEMENT'),
  (2, 24, 2, 'COMPLEMENT'),
  (2, 32, NULL, 'CONSOMME'),
  (2, 37, NULL, 'DESSERT');

-- Día 3: WEDNESDAY
INSERT INTO menu_day_dishes (menu_day_id, dish_id, position, category) VALUES
  (3, 5, 1, 'BREAKFAST'),
  (3, 6, 2, 'BREAKFAST'),
  (3, 15, 1, 'LUNCH'),
  (3, 16, 2, 'LUNCH'),
  (3, 25, 1, 'COMPLEMENT'),
  (3, 26, 2, 'COMPLEMENT'),
  (3, 33, NULL, 'CONSOMME'),
  (3, 38, NULL, 'DESSERT');

-- Día 4: THURSDAY
INSERT INTO menu_day_dishes (menu_day_id, dish_id, position, category) VALUES
  (4, 7, 1, 'BREAKFAST'),
  (4, 8, 2, 'BREAKFAST'),
  (4, 17, 1, 'LUNCH'),
  (4, 18, 2, 'LUNCH'),
  (4, 27, 1, 'COMPLEMENT'),
  (4, 28, 2, 'COMPLEMENT'),
  (4, 34, NULL, 'CONSOMME'),
  (4, 39, NULL, 'DESSERT');

-- Día 5: FRIDAY
INSERT INTO menu_day_dishes (menu_day_id, dish_id, position, category) VALUES
  (5, 9, 1, 'BREAKFAST'),
  (5, 10, 2, 'BREAKFAST'),
  (5, 19, 1, 'LUNCH'),
  (5, 20, 2, 'LUNCH'),
  (5, 29, 1, 'COMPLEMENT'),
  (5, 30, 2, 'COMPLEMENT'),
  (5, 35, NULL, 'CONSOMME'),
  (5, 40, NULL, 'DESSERT');
