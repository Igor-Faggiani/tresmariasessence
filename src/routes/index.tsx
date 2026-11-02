import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Instagram } from "lucide-react";
import { categories, products } from "@/data/products";
import { img } from "@/data/images";
import { ProductCard } from "@/components/ProductCard";
import { Constellation } from "@/components/Constellation";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { INSTAGRAM_URL, generalMessage, kitMessage, waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Três Marias Essências | Body Splash, Velas Aromáticas e Presentes" },
      { name: "description", content: "Fragrâncias e aromas criados para tornar seus momentos ainda mais especiais. Body splash, velas, wax melts e kits." },
      { property: "og:title", content: "Três Marias Essências" },
      { property: "og:description", content: "Body splash, velas aromáticas, wax melts e kits personalizados para presentear." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.featured);
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2 md:items-center md:gap-12 md:px-8 md:py-16">
          <div className="relative order-2 px-6 py-12 md:order-1 md:px-0">
            <Constellation className="absolute -top-2 right-6 size-16 text-greige md:-left-4 md:-top-10 md:right-auto md:size-20" />
            <p className="eyebrow fade-up">Body splash · Velas · Wax melts</p>
            <h1 className="fade-up mt-5 text-[2.6rem] leading-[1.02] md:text-6xl lg:text-7xl">
              Transforme momentos simples em <em className="text-cocoa">experiências especiais.</em>
            </h1>
            <p className="fade-up mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Fragrâncias e aromas criados para tornar seus momentos ainda mais especiais.
            </p>
            <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/produtos" className="btn btn-solid">
                Conheça nossos produtos <ArrowRight className="size-4" strokeWidth={1.4} />
              </Link>
              <a href={waLink(generalMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Fale conosco
              </a>
            </div>
          </div>
          <div className="order-1 grid grid-cols-5 gap-2 md:order-2 md:gap-3">
            <img src={img.copoOpen} alt="Vela aromática em copo de vidro com tampa de madeira" className="col-span-3 aspect-[3/4] h-full w-full object-cover" />
            <div className="col-span-2 grid gap-2 md:gap-3">
              <img src={img.splashFamily} alt="Body splashes Três Marias de 100ml e 200ml" className="aspect-square h-full w-full object-cover" />
              <img src={img.waxCoracao} alt="Wax melts em formato de coração" className="aspect-square h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8" aria-labelledby="cat-title">
        <div className="mb-10 text-center">
          <p className="eyebrow">Categorias</p>
          <h2 id="cat-title" className="mt-3 text-4xl md:text-5xl">Escolha seu aroma</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
          {categories.map((c) => (
            <Link key={c.id} to="/produtos" search={{ categoria: c.id }} className="group block">
              <div className="aspect-[3/4] overflow-hidden bg-secondary">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
              <p className="eyebrow">Mais queridos</p>
              <h2 id="dest-title" className="mt-3 text-4xl md:text-5xl">Destaques</h2>
            </div>
            <Link to="/produtos" className="hidden text-xs uppercase tracking-[0.2em] underline-offset-8 hover:underline sm:block">
              Ver todos
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-5">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Institucional */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-24 md:grid-cols-2 md:gap-20 md:px-8">
        <img src={img.lataBlackOpen} alt="Vela aromática em lata aberta" loading="lazy" className="aspect-[4/5] w-full object-cover" />
        <div>
          <Constellation className="size-14 text-greige" />
          <h2 className="mt-6 text-4xl leading-tight md:text-5xl">Mais do que aromas, pequenos momentos de cuidado.</h2>
          <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
            A Três Marias nasceu da vontade de transformar aromas em experiências especiais. Cada produto é pensado
            para proporcionar sensações, criar memórias e tornar os pequenos momentos do dia ainda mais agradáveis.
          </p>
          <Link to="/sobre" className="btn btn-outline mt-8">Sobre nós</Link>
        </div>
      </section>

      {/* Kits */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2">
          <div className="grid grid-cols-2">
            <img src={img.kitA} alt="Kit presente com body splash e vela" loading="lazy" className="aspect-[3/4] h-full w-full object-cover" />
            <img src={img.kitB} alt="Kit presente na embalagem kraft com laço" loading="lazy" className="aspect-[3/4] h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 md:px-16">
            <p className="eyebrow text-sand">Kits personalizados</p>
            <h2 className="mt-4 text-4xl leading-tight md:text-5xl">Presentes que carregam significado.</h2>
            <p className="mt-5 text-primary-foreground/75">Monte seu kit personalizado e surpreenda quem você ama.</p>
            <a href={waLink(kitMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-9 self-start">
              <WhatsAppIcon className="size-4" /> Monte seu presente pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="mx-auto max-w-7xl px-4 pt-24 text-center md:px-8">
        <p className="eyebrow">@tresmarias.essencias</p>
        <h2 className="mt-3 text-4xl md:text-5xl">Um pouco do universo Três Marias.</h2>
        <div className="mt-10 grid grid-cols-3 gap-1.5 md:grid-cols-6 md:gap-3">
          {[img.splashVanilla100, img.latinhasSilver, img.copoWhisky, img.waxCapivara, img.lataBlack, img.splashGoodGirl200b].map((src, i) => (
            <a key={src} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="group block aspect-square overflow-hidden">
              <img src={src} alt={`Foto ${i + 1} dos produtos Três Marias`} loading="lazy" className="h-full w-full object-cover transition-opacity group-hover:opacity-80" />
            </a>
          ))}
        </div>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-10">
          <Instagram className="size-4" strokeWidth={1.4} /> Conheça nosso Instagram
        </a>
      </section>
    </>
  );
}
