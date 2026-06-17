import Link from "next/link";
import categories from "@/data/categories.json";

export default function Navbar() {
  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center gap-4">
        <Link href="/" className="text-xl font-bold whitespace-nowrap">
          车载语音功能库
        </Link>
        <nav className="flex gap-3 overflow-x-auto py-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="px-3 py-1 rounded bg-slate-700 hover:bg-blue-600 text-sm whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}