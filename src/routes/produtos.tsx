import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { categories, categoryIds, products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import type { CategoryId } from "@/types/product";

const searchSchema = z.object({
  categoria: z.enum(categoryIds as [CategoryId, ...CategoryId[]]).optional().catch(undefined),
  ordem: z.enum(["relevancia", "menor", "maior"]).optional().catch(undefined),
});

export const Route = createFileRoute("/produtos")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Produtos | Três Marias Essências" },
      { name: "description", content: "Catálogo completo: body splash, velas aromáticas, wax melts e kits personalizados." },
      { property: "og:title", content: "Catálogo Três Marias Essências" },
      { property: "og:description", content: "Body splash, velas aromáticas, wax melts e kits personalizados." },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const { categoria, ordem = "relevancia" } = Route.useSearch();
  const navigate = Route.useNavigate();
  const list = products
    .filter((p) => !categoria || p.category === categoria)
    .sort((a, b) => {
      if (ordem === "relevancia") return a.relevance - b.relevance;
      const pa = a.price ?? Infinity;
      const pb = b.price ?? Infinity;
      return ordem === "menor" ? pa - pb : (b.price ?? -1) - (a.price ?? -1);
    });
  const current = categories.find((c) => c.id === categoria);
  const chip = (active: boolean) =>
    `whitespace-nowrap border px-4 py-2.5 text-[0.7rem] uppercase tracking-[0.15em] transition-colors ${
      active ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
    }`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <header className="mb-10">
        <p className="eyebrow">Catálogo</p>
        <h1 className="mt-3 text-5xl md:text-6xl">{current?.name ?? "Todos os produtos"}</h1>
        {current && <p className="mt-3 text-muted-foreground">{current.description}</p>}
      </header>

      <div className="mb-10 flex flex-col gap-4 border-y border-border py-4 md:flex-row md:items-center md:justify-between">
        <nav aria-label="Filtrar por categoria" className="-mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
          <Link to="/produtos" search={{ ordem }} className={chip(!categoria)}>
            Todos
          </Link>
          {categories.map((c) => (
            <Link key={c.id} to="/produtos" search={{ categoria: c.id, ordem }} className={chip(categoria === c.id)}>
              {c.name}
            </Link>
          ))}
        </nav>
        <label className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">
          Ordenar
          <select
            value={ordem}
            onChange={(e) =>
              navigate({ search: { categoria, ordem: e.target.value as typeof ordem }, replace: true })
            }
            className="h-10 border border-input bg-background px-3 text-sm normal-case tracking-normal text-foreground"
          >
            <option value="relevancia">Relevância</option>
            <option value="menor">Menor preço</option>
            <option value="maior">Maior preço</option>
          </select>
        </label>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">{list.length} {list.length === 1 ? "produto" : "produtos"}</p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
