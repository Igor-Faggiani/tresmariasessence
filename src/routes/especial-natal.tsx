import { createFileRoute, Link } from "@tanstack/react-router";
import { Gift, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { natalProducts } from "@/data/natalProducts";

export const Route = createFileRoute("/especial-natal")({
  head: () => ({
    meta: [
      { title: "Especial de Natal | Três Marias Essências" },
      {
        name: "description",
        content: "Conheça a coleção especial de Natal da Três Marias Essências: velas aromáticas, kits para presentear e wax melts.",
      },
      { property: "og:title", content: "Especial de Natal | Três Marias Essências" },
      {
        property: "og:description",
        content: "Presentes aromáticos para deixar o Natal ainda mais especial.",
      },
    ],
  }),
  component: ChristmasCollection,
});

function ChristmasCollection() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-border bg-[#f1ece4]">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-24">
          <div className="relative z-10 max-w-2xl">
            <p className="eyebrow flex items-center gap-2 text-[#8a725c]">
              <Sparkles className="size-3.5" strokeWidth={1.4} /> Coleção especial 2026
            </p>
            <h1 className="mt-5 font-serif text-5xl leading-[1.08] text-[#40352e] md:text-7xl">
              Um Natal cheio de carinho e aroma.
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-[#74665b] md:text-base">
              Presentes feitos para transformar pequenos momentos em lembranças especiais. Escolha seus favoritos e monte seu pedido com a gente.
            </p>
            <a href="#colecao-natal" className="btn btn-solid mt-8 inline-flex border-[#40352e] bg-[#40352e] text-white hover:bg-[#5b493d]">
              <Gift className="size-4" strokeWidth={1.5} /> Conheça a coleção
            </a>
          </div>
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rotate-3 border border-[#c8b7a5]" />
            <img
              src={natalProducts[0].images[0]}
              alt="Caixa com kit de velas aromáticas da coleção de Natal"
              className="relative aspect-[4/5] w-full object-cover shadow-sm"
              fetchPriority="high"
            />
          </div>
        </div>
        <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full border border-[#c8b7a5]/50 md:size-96" />
      </section>

      <section id="colecao-natal" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 md:px-8 md:py-20">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow">Três Marias Essências</p>
          <h2 className="mt-3 font-serif text-4xl text-foreground md:text-5xl">Presentes para encantar</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            Explore os produtos da nossa coleção natalina. As fragrâncias disponíveis são Panetonne, Gingerbread, Cookie de chocolate e Maçã e canela.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-x-3 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {natalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 px-4 py-12 text-center md:py-16">
        <p className="eyebrow">Feito para presentear</p>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl">Seu presente de Natal começa aqui.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
          Escolha seus produtos favoritos e finalize sua encomenda pelo WhatsApp. Consulte por lá as opções de entrega e pagamento.
        </p>
        <Link to="/produtos" className="btn btn-outline mt-7 inline-flex">Ver catálogo completo</Link>
      </section>
    </main>
  );
}
