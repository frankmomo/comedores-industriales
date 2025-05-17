import Image from "next/image";

interface Props {
  title: string;
  img: string;
  side1: string;
  side2: string;
}

export default function MenuCard({ title, img, side1, side2 }: Props) {
  return (
    <article className="overflow-hidden rounded-2xl shadow transition hover:scale-[1.02]">
      <div className="relative h-40 w-full">
        <Image src={img} alt={title} fill className="object-cover" />
      </div>
      <div className="space-y-1 bg-white p-4">
        <h3 className="text-lg font-semibold text-secondary">{title}</h3>
        <p className="text-sm text-secondary/70">
          {side1} · {side2}
        </p>
      </div>
    </article>
  );
}
