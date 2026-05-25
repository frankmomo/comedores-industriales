'use client';

/**
 * Admin › Nuevo Menú Semanal  (8 bloques por día, días opcionalmente vacíos)
 * Bloques: Desayuno 1, Desayuno 2, Comida 1, Comida 2,
 *           Complemento 1, Complemento 2, Consomé, Postre
 * La etiqueta de semana se autocompleta (ISO week) y es editable si lo necesitas.
 */



import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

/* ------------------------------------------------------------------
 * Configuración de categorías
 * ----------------------------------------------------------------*/
const CATEGORIES = [
  { label: 'Desayuno 1',   type: 'BREAKFAST' },
  { label: 'Desayuno 2',   type: 'BREAKFAST' },
  { label: 'Comida 1',     type: 'LUNCH'     },
  { label: 'Comida 2',     type: 'LUNCH'     },
  { label: 'Complemento 1',type: 'SIDE'      },
  { label: 'Complemento 2',type: 'SIDE'      },
  { label: 'Consomé',      type: 'BROTH'     },
  { label: 'Postre',       type: 'DESSERT'   },
] as const;

/* Tipos derivados */
type DishType = typeof CATEGORIES[number]['type'];

/* ------------------------------------------------------------------
 * Zod Schemas
 * ----------------------------------------------------------------*/
const DishSchema = z.object({
  name: z.string().min(1, 'Requerido'),
  type: z.enum(['BREAKFAST', 'LUNCH', 'SIDE', 'BROTH', 'DESSERT']),
});

const DaySchema = z.object({
  day: z.enum(['MON','TUE','WED','THU','FRI','SAT','SUN']),
  /**
   * Permitimos días vacíos → 0, o hasta 8 platillos válidos.
   * Antes de enviar filtramos los platillos con nombre vacío.
   */
  dishes: z.array(DishSchema).max(8),
});

const WeekMenuSchema = z.object({
  label: z.string(),          // autogenerada
  days: z.array(DaySchema).length(7),
});

export type WeekMenuForm = z.infer<typeof WeekMenuSchema>;

/* ---------------- Valores por defecto --------------------------- */
function getISOWeek(date: Date) {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  return Math.ceil(((target.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

const currentWeek = `Semana ${getISOWeek(new Date())}`;

const emptyDishArray = CATEGORIES.map(c => ({ name: '', type: c.type as DishType }));

const DAYS: WeekMenuForm['days'] = [
  { day: 'MON', dishes: [...emptyDishArray] },
  { day: 'TUE', dishes: [...emptyDishArray] },
  { day: 'WED', dishes: [...emptyDishArray] },
  { day: 'THU', dishes: [...emptyDishArray] },
  { day: 'FRI', dishes: [...emptyDishArray] },
  { day: 'SAT', dishes: [...emptyDishArray] },
  { day: 'SUN', dishes: [...emptyDishArray] },
];

export default function NewMenuPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WeekMenuForm>({
    resolver: zodResolver(WeekMenuSchema),
    defaultValues: { label: currentWeek, days: DAYS },
    mode: 'onChange',
  });

  /* ---------------------- Submit handler ------------------------- */
  const onSubmit = async (data: WeekMenuForm) => {
    // Filtra platillos sin nombre para permitir días vacíos o bloques vacíos
    const cleaned = {
      ...data,
      days: data.days.map(d => ({
        ...d,
        dishes: d.dishes.filter(ds => ds.name.trim() !== ''),
      })),
    };

    try {
      const res = await fetch('/api/admin/menus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleaned),
      });
      if (!res.ok) throw new Error('Error al guardar');
      toast.success('Menú creado ✅');
      router.push('/admin/menus');
    } catch (err: any) {
      toast.error(err.message ?? 'Error desconocido');
    }
  };

  /* ----------------------------- UI ------------------------------ */
  return (
    <div className="container mx-auto max-w-5xl py-8">
      <h1 className="mb-6 text-2xl font-bold">Nuevo menú semanal</h1>

      {/* Etiqueta de semana */}
      <div className="mb-6">
        <Label htmlFor="label">Etiqueta de la semana</Label>
        <Input id="label" readOnly {...register('label')} className="mt-1" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {DAYS.map((d, dayIdx) => (
          <Card key={d.day} className="border border-muted-foreground/20">
            <CardHeader className="font-semibold uppercase">{d.day}</CardHeader>
            <CardContent className="space-y-4">
              {CATEGORIES.map((cat, idx) => (
                <div key={cat.label} className="grid gap-2 md:grid-cols-2">
                  <div>
                    <Label>{cat.label}</Label>
                    <Input
                      placeholder={cat.label}
                      {...register(`days.${dayIdx}.dishes.${idx}.name`)}
                    />
                    <input
                      type="hidden"
                      {...register(`days.${dayIdx}.dishes.${idx}.type`)}
                      value={cat.type}
                    />
                  </div>
                </div>
              ))}
              {errors.days?.[dayIdx]?.dishes && (
                <p className="text-sm text-red-600">
                  {(errors.days[dayIdx]!.dishes as any).message}
                </p>
              )}
            </CardContent>
          </Card>
        ))}

        <Button type="submit" disabled={isSubmitting} className="mt-4">
          {isSubmitting ? 'Guardando…' : 'Guardar menú'}
        </Button>
      </form>
    </div>
  );
}
