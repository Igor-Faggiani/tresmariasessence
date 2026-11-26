import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { allProducts, categories, categoryIds, collections, collectionIds } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import type { CategoryId, CollectionId } from "@/types/product";

const searchSchema = z.object({
  categoria: z.enum(categoryIds as [CategoryId, ...CategoryId[]]).optional().catch(undefined),
  colecao: z.enum(collectionIds as [CollectionId, ...CollectionId[]]).optional().catch(undefined),
  ordem: z.enum(["relevancia", "menor", "maior"]).optional().catch(undefined),
});

export const Route = createFileRoute("/produtos")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Produtos | Três Marias Essências" },
      { name: "description", content: "Explore todos os produtos das coleções Tradicional, Fé e Especial de Natal da Três Marias Essências." },
      { property: "og:title", content: "Catálogo Três Marias Essências" },
      { property: "og:description", content: "Conheça nossas velas aromáticas, body splash, wax melts e kits personalizados." },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const { categoria, colecao, ordem = "relevancia" } = Route.useSearch();
  const navigate = Route.useNavigate();
  const list = allProducts
    .filter((product) => !colecao || product.collection === colecao)
    .filter((product) => !categoria || product.category === categoria)
    .sort((a, b) => {
      if (ordem === "relevancia") return a.relevance - b.relevance;
      const pa = a.price ?? Infinity;
      const pb = b.price ?? Infinity;
      return ordem === "menor" ? pa - pb : (b.price ?? -1) - (a.price ?? -1);
    });

  const currentCollection = collections.find((collection) => collection.id === colecao);
  const currentCategory = categories.find((category) => category.id === categoria);
  const chip = (active: boolean) =>
    `whitespace-nowrap border px-4 py-2.5 text-[0.7rem] uppercase tracking-[0.15em] transition-colors ${
      active ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
    }`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <header className="mb-10">
        <p className="eyebrow">Catálogo</p>
        <h1 className="mt-3 text-5xl md:text-6xl">
          {currentCollection?.name ?? currentCategory?.name ?? "Todos os produtos"}
        </h1>
        {(currentCollection || currentCategory) && (
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {[currentCollection?.description, currentCategory?.description].filter(Boolean).join(" ")}
          </p>
        )}
      </header>

      <div className="mb-10 space-y-4 border-y border-border py-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-start">
          <span className="w-28 shrink-0 pt-2 text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">Coleção</span>
          <nav aria-label="Filtrar por coleção" className="-mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
            <Link to="/produtos" search={{ categoria, ordem }} className={chip(!colecao)}>
              Todas
            </Link>
            {collections.map((collection) => (
              <Link
                key={collection.id}
                to="/produtos"
                search={{ categoria, colecao: collection.id, ordem }}
                className={chip(colecao === collection.id)}
              >
                {collection.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 md:flex-row md:items-start">
          <span className="w-28 shrink-0 pt-2 text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">Categoria</span>
          <nav aria-label="Filtrar por categoria" className="-mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
            <Link to="/produtos" search={{ colecao, ordem }} className={chip(!categoria)}>
              Todas
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                to="/produtos"
                search={{ colecao, categoria: category.id, ordem }}
                className={chip(categoria === category.id)}
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex justify-end">
          <label className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Ordenar
            <select
              value={ordem}
              onChange={(event) =>
                navigate({ search: { categoria, colecao, ordem: event.target.value as typeof ordem }, replace: true })
              }
              className="h-10 border border-input bg-background px-3 text-sm normal-case tracking-normal text-foreground"
            >
              <option value="relevancia">Relevância</option>
              <option value="menor">Menor preço</option>
              <option value="maior">Maior preço</option>
            </select>
          </label>
        </div>
      </div>

      <p className="mb-6 text-sm text-muted-foreground">
        {list.length} {list.length === 1 ? "produto encontrado" : "produtos encontrados"}
      </p>
      {list.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {list.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="border border-border px-6 py-14 text-center">
          <p className="font-serif text-2xl">Nenhum produto encontrado</p>
          <p className="mt-2 text-sm text-muted-foreground">Tente combinar outra coleção ou categoria.</p>
          <Link to="/produtos" className="btn btn-outline mt-6 inline-flex">Limpar filtros</Link>
        </div>
      )}
    </div>
  );
}
