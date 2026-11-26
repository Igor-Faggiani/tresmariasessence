import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Instagram } from "lucide-react";
import { allProducts, categories, collections } from "@/data/products";
import { img } from "@/data/images";
import { ProductCard } from "@/components/ProductCard";
import { Constellation } from "@/components/Constellation";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { INSTAGRAM_URL, generalMessage, kitMessage, waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Três Marias Essências | Body Splash, Velas Aromáticas e Presentes" },
      {
        name: "description",
        content:
          "Fragrâncias e aromas criados para tornar seus momentos ainda mais especiais. Body splash, velas, wax melts e kits.",
      },
      { property: "og:title", content: "Três Marias Essências" },
      {
        property: "og:description",
        content: "Body splash, velas aromáticas, wax melts e kits personalizados para presentear.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const collectionHighlights = [
    { id: "standard", productId: "p3", eyebrow: "Linha permanente", cta: "Conheça a coleção" },
    { id: "faith", productId: "fe-01", eyebrow: "Peças especiais", cta: "Conheça a coleção" },
    { id: "christmas", productId: "natal-01", eyebrow: "Edição sazonal", cta: "Conheça a coleção" },
  ] as const;
  const featured = ["p1", "p3", "fe-01", "fe-05", "natal-01", "natal-03"]
    .map((id) => allProducts.find((product) => product.id === id))
    .filter((product): product is (typeof allProducts)[number] => Boolean(product));
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2 md:items-center md:gap-12 md:px-8 md:py-16">
          <div className="relative z-10 order-2 min-w-0 px-6 py-10 md:order-1 md:px-0 md:py-0">
            <Constellation className="pointer-events-none absolute -top-2 right-6 size-16 text-greige md:-left-4 md:-top-10 md:right-auto md:size-20" />
            <p className="eyebrow fade-up">Body splash · Velas · Wax melts</p>
            <h1 className="fade-up mt-5 text-[2.35rem] leading-[1.04] sm:text-[2.6rem] md:text-6xl lg:text-7xl">
              Transforme momentos simples em <em className="text-cocoa">experiências especiais.</em>
            </h1>
            <p className="fade-up mt-5 max-w-md pr-10 text-base leading-relaxed text-muted-foreground sm:pr-0">
              Fragrâncias e aromas criados para tornar seus momentos ainda mais especiais.
            </p>
            <div className="fade-up mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/produtos" className="btn btn-solid w-full sm:w-auto">
                Conheça nossos produtos <ArrowRight className="size-4" strokeWidth={1.4} />
              </Link>
              <a
                href={waLink(generalMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline w-full sm:w-auto"
              >
                Fale conosco
              </a>
            </div>
          </div>
          <div className="order-1 grid aspect-square w-full min-w-0 grid-cols-[3fr_2fr] grid-rows-1 gap-2 overflow-hidden md:order-2 md:aspect-[4/5] md:max-h-[620px] md:gap-3">
            <img
              src={img.copoOpen}
              alt="Vela aromática em copo de vidro com tampa de madeira"
              className="h-full min-h-0 w-full object-cover"
            />
            <div className="grid min-h-0 grid-rows-2 gap-2 md:gap-3">
              <img
                src={img.splashFamily}
                alt="Body splashes Três Marias de 100ml e 200ml"
                className="h-full min-h-0 w-full object-cover"
              />
              <img
                src={img.waxCoracao}
                alt="Wax melts em formato de coração"
                className="h-full min-h-0 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Coleções */}
      <section
        className="mx-auto max-w-7xl px-4 pb-8 pt-16 md:px-8 md:pb-12 md:pt-20"
        aria-labelledby="collections-title"
      >
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="eyebrow">Encontre o que combina com você</p>
          <h2 id="collections-title" className="mt-3 text-4xl md:text-5xl">
            Nossas coleções
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            Cada coleção tem seu próprio encanto. Explore nossas criações e encontre aromas e
            presentes para cada momento.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {collectionHighlights.map((highlight) => {
            const collection = collections.find((item) => item.id === highlight.id);
            const product = allProducts.find((item) => item.id === highlight.productId);
            if (!collection || !product) return null;
            return (
              <Link
                key={collection.id}
                to="/produtos"
                search={{ colecao: collection.id }}
                className="group relative block overflow-hidden bg-secondary"
              >
                <div className="aspect-[4/5] overflow-hidden md:aspect-[5/6]">
                  <img
                    src={product.images[0]}
                    alt={`${collection.name} — ${product.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-5 pb-6 pt-20 text-white md:px-6 md:pb-7">
                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-white/75">
                    {highlight.eyebrow}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl">{collection.name}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.16em]">
                    {highlight.cta}{" "}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Categorias */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8" aria-labelledby="cat-title">
        <div className="mb-10 text-center">
          <p className="eyebrow">Categorias</p>
          <h2 id="cat-title" className="mt-3 text-4xl md:text-5xl">
            Escolha seu aroma
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {categories.map((c) => (
            <Link key={c.id} to="/produtos" search={{ categoria: c.id }} className="group block">
              <div className="aspect-[3/4] overflow-hidden bg-secondary">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-xl md:text-2xl">{c.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground md:text-sm">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Destaques */}
      <section className="bg-secondary/50 py-20" aria-labelledby="dest-title">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Uma seleção especial</p>
              <h2 id="dest-title" className="mt-3 text-4xl md:text-5xl">
                Produtos em destaque
              </h2>
              <p className="mt-3 max-w-lg text-sm text-muted-foreground">
                Um pouco de cada coleção para você conhecer algumas das nossas criações.
              </p>
            </div>
            <Link
              to="/produtos"
              className="hidden items-center gap-2 text-xs uppercase tracking-[0.2em] underline-offset-8 hover:underline sm:inline-flex"
            >
              Ver todos <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Kits */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2">
          <div className="grid grid-cols-2">
            <img
              src={img.kitA}
              alt="Kit presente com body splash e vela"
              loading="lazy"
              className="aspect-[3/4] h-full w-full object-cover"
            />
            <img
              src={img.kitB}
              alt="Kit presente na embalagem kraft com laço"
              loading="lazy"
              className="aspect-[3/4] h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 md:px-16">
            <p className="eyebrow text-sand">Kits personalizados</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">
              Presentes que carregam significado.
            </h2>
            <p className="mt-5 text-primary-foreground/75">
              Monte seu kit personalizado e surpreenda quem você ama.
            </p>
            <a
              href={waLink(kitMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light mt-9 self-start"
            >
              <WhatsAppIcon className="size-4" /> Monte seu presente pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Institucional */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-24 md:grid-cols-2 md:gap-20 md:px-8">
        <img
          src={img.lataBlackOpen}
          alt="Vela aromática em lata aberta"
          loading="lazy"
          className="aspect-[4/5] w-full object-cover"
        />
        <div>
          <Constellation className="size-14 text-greige" />
          <h2 className="mt-6 text-4xl leading-tight md:text-5xl">
            Mais do que aromas, pequenos momentos de cuidado.
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
            A Três Marias nasceu da vontade de transformar aromas em experiências especiais. Cada
            produto é pensado para proporcionar sensações, criar memórias e tornar os pequenos
            momentos do dia ainda mais agradáveis.
          </p>
          <Link to="/sobre" className="btn btn-outline mt-8">
            Sobre nós
          </Link>
        </div>
      </section>

      {/* Instagram */}
      <section className="mx-auto max-w-7xl px-4 pt-24 text-center md:px-8">
        <p className="eyebrow">@tresmarias.essencias</p>
        <h2 className="mt-3 text-4xl md:text-5xl">Um pouco do universo Três Marias.</h2>
        <div className="mt-10 grid grid-cols-3 gap-1.5 md:grid-cols-6 md:gap-3">
          {[
            img.splashVanilla100,
            img.latinhasSilver,
            img.copoWhisky,
            img.waxCapivara,
            img.lataBlack,
            img.splashGoodGirl200b,
          ].map((src, i) => (
            <a
              key={src}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block aspect-square overflow-hidden"
            >
              <img
                src={src}
                alt={`Foto ${i + 1} dos produtos Três Marias`}
                loading="lazy"
                className="h-full w-full object-cover transition-opacity group-hover:opacity-80"
              />
            </a>
          ))}
        </div>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline mt-10"
        >
          <Instagram className="size-4" strokeWidth={1.4} /> Conheça nosso Instagram
        </a>
      </section>
    </>
  );
}
