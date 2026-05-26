import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import * as XLSX from "xlsx";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CatalogDishType, catalogTypes } from "@/lib/dishCatalog";

const typeAliases: Record<string, CatalogDishType> = {
  breakfast: "BREAKFAST",
  desayunos: "BREAKFAST",
  desayuno: "BREAKFAST",
  lunch: "LUNCH",
  lunches: "LUNCH",
  comidas: "LUNCH",
  comida: "LUNCH",
  complement: "COMPLEMENT",
  complements: "COMPLEMENT",
  complementos: "COMPLEMENT",
  complemento: "COMPLEMENT",
  consomme: "CONSOMME",
  consommes: "CONSOMME",
  consome: "CONSOMME",
  consomes: "CONSOMME",
  dessert: "DESSERT",
  desserts: "DESSERT",
  postre: "DESSERT",
  postres: "DESSERT",
};

type ParsedDish = {
  name: string;
  type: CatalogDishType;
};

function normalizeLabel(value: unknown) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ");
}

function getType(value: unknown) {
  const key = normalizeLabel(value).replace(/\s/g, "");
  return typeAliases[key];
}

function cleanDishName(value: unknown) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}

function isHeaderCell(value: string) {
  const label = normalizeLabel(value).replace(/\s/g, "");
  return ["name", "nombre", "platillo", "dish", "dishes", "alimento", "alimentos"].includes(label);
}

function parseWorkbook(buffer: Buffer) {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const dishes: ParsedDish[] = [];

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1, blankrows: false });
    const sheetType = getType(sheetName);

    if (sheetType) {
      rows.flat().forEach((cell) => {
        const name = cleanDishName(cell);
        if (name && !getType(name) && !isHeaderCell(name)) {
          dishes.push({ name, type: sheetType });
        }
      });
      return;
    }

    const [headers = [], ...bodyRows] = rows;
    const typedColumns = headers
      .map((header, index) => ({ index, type: getType(header) }))
      .filter((column): column is { index: number; type: CatalogDishType } => Boolean(column.type));

    bodyRows.forEach((row) => {
      typedColumns.forEach(({ index, type }) => {
        const name = cleanDishName(row[index]);
        if (name) {
          dishes.push({ name, type });
        }
      });
    });
  });

  const unique = new Map<string, ParsedDish>();
  dishes.forEach((dish) => {
    unique.set(`${dish.type}:${dish.name.toLowerCase()}`, dish);
  });

  return [...unique.values()];
}

async function ensureCatalogTable() {
  await prisma.$executeRawUnsafe(`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'CatalogDishType') THEN
        CREATE TYPE "CatalogDishType" AS ENUM ('BREAKFAST', 'LUNCH', 'COMPLEMENT', 'CONSOMME', 'DESSERT');
      END IF;
    END
    $$;
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "CatalogDish" (
      "id" SERIAL NOT NULL,
      "name" TEXT NOT NULL,
      "type" "CatalogDishType" NOT NULL,
      "active" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "CatalogDish_pkey" PRIMARY KEY ("id")
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE UNIQUE INDEX IF NOT EXISTS "CatalogDish_name_type_key" ON "CatalogDish"("name", "type");
  `);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Sube un archivo Excel valido." }, { status: 400 });
  }

  const parsedDishes = parseWorkbook(Buffer.from(await file.arrayBuffer()));

  if (parsedDishes.length === 0) {
    return NextResponse.json(
      {
        error:
          "No encontre platillos. Usa hojas o columnas llamadas breakfast, lunch, complementos, consomes y desserts.",
      },
      { status: 400 },
    );
  }

  await ensureCatalogTable();

  await prisma.$transaction([
    prisma.catalogDish.deleteMany({}),
    prisma.catalogDish.createMany({
      data: parsedDishes.map((dish) => ({
        name: dish.name,
        type: dish.type,
      })),
      skipDuplicates: true,
    }),
  ]);

  const counts = Object.fromEntries(catalogTypes.map((type) => [type, 0])) as Record<CatalogDishType, number>;
  parsedDishes.forEach((dish) => {
    counts[dish.type] += 1;
  });

  return NextResponse.json({ total: parsedDishes.length, counts });
}
