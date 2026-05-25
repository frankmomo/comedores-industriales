// pages/menu/page.tsx
import MenuViewer from "@/components/MenuViewer";
import { getWeek } from "@/utils/getWeek";

export default function MenuPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <MenuViewer week={getWeek()} />
    </div>
  );
}