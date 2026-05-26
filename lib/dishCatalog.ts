export type CatalogDishType = "BREAKFAST" | "LUNCH" | "COMPLEMENT" | "CONSOMME" | "DESSERT";

export type CatalogDishItem = {
  id: number;
  name: string;
  type: CatalogDishType;
};

export const exampleDishes: CatalogDishItem[] = [
  { id: 1, name: "Chilaquiles verdes con pollo", type: "BREAKFAST" },
  { id: 2, name: "Huevos revueltos con jamon", type: "BREAKFAST" },
  { id: 3, name: "Hot cakes con fruta", type: "BREAKFAST" },
  { id: 4, name: "Milanesa de pollo", type: "LUNCH" },
  { id: 5, name: "Carne asada con arroz", type: "LUNCH" },
  { id: 6, name: "Enchiladas rojas", type: "LUNCH" },
  { id: 7, name: "Frijoles refritos", type: "COMPLEMENT" },
  { id: 8, name: "Verduras al vapor", type: "COMPLEMENT" },
  { id: 9, name: "Ensalada mixta", type: "COMPLEMENT" },
  { id: 10, name: "Consome de pollo", type: "CONSOMME" },
  { id: 11, name: "Sopa de fideo", type: "CONSOMME" },
  { id: 12, name: "Gelatina de sabores", type: "DESSERT" },
  { id: 13, name: "Arroz con leche", type: "DESSERT" },
  { id: 14, name: "Flan napolitano", type: "DESSERT" },
];

export const catalogTypeLabels: Record<CatalogDishType, string> = {
  BREAKFAST: "Breakfast",
  LUNCH: "Lunch",
  COMPLEMENT: "Complementos",
  CONSOMME: "Consomes",
  DESSERT: "Desserts",
};

export const catalogTypes = Object.keys(catalogTypeLabels) as CatalogDishType[];
