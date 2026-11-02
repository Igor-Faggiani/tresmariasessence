import { createFileRoute, Link } from "@tanstack/react-router";
import { img } from "@/data/images";
import { Constellation } from "@/components/Constellation";
import { generalMessage, waLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre nós | Três Marias Essências" },
      { name: "description", content: "Mais do que aromas, pequenos momentos de cuidado. Conheça a Três Marias Essências." },
      { property: "og:title", content: "Sobre a Três Marias Essências" },
      { property: "og:description", content: "Mais do que aromas, pequenos momentos de cuidado." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <Constellation className="mx-auto size-16 text-greige" />
        <p className="eyebrow mt-6">Sobre nós</p>
        <h1 className="mt-4 text-5xl leading-tight md:text-6xl">Mais do que aromas, pequenos momentos de cuidado.</h1>
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
          A Três Marias nasceu da vontade de transformar aromas em experiências especiais. Cada produto é pensado para
          proporcionar sensações, criar memórias e tornar os pequenos momentos do dia ainda mais agradáveis.
        </p>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          Nosso símbolo é a constelação das Três Marias — três estrelas que brilham juntas.
        </p>
      </div>
      <div className="mt-16 grid grid-cols-3 gap-2 md:gap-4">
        <img src={img.splashFamily} alt="Body splashes Três Marias" loading="lazy" className="aspect-[3/4] w-full object-cover" />
        <img src={img.copoWhisky} alt="Vela aromática em copo de whisky" loading="lazy" className="aspect-[3/4] w-full object-cover" />
        <img src={img.kitB} alt="Kit presente Três Marias" loading="lazy" className="aspect-[3/4] w-full object-cover" />
      </div>
      <div className="mt-14 flex flex-col justify-center gap-3 sm:flex-row">
        <Link to="/produtos" className="btn btn-solid">Ver produtos</Link>
        <a href={waLink(generalMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Fale conosco</a>
      </div>
    </div>
  );
}
