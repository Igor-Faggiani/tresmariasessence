import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { getCategory, getProductBySlug } from "@/data/products";
import { useCart } from "@/lib/cart";
import { buildOrderMessage, kitMessage, waLink } from "@/lib/whatsapp";
import { priceLabel } from "@/components/ProductCard";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Produto não encontrado | Três Marias" }, { name: "robots", content: "noindex" }] };
    const t = `${p.name} | Três Marias Essências`;
    return {
      meta: [
        { title: t },
        { name: "description", content: p.description },
        { property: "og:title", content: t },
        { property: "og:description", content: p.description },
      ],
    };
  },
  component: ProductPage,
});

function Selector({ label, options, value, onChange }: { label: string; options: string[]; value?: string; onChange: (v: string) => void }) {
  return (
    <fieldset className="mt-8">
      <legend className="eyebrow mb-3">
        {label} <span className="text-destructive">*</span>
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={`min-h-11 border px-5 text-sm transition-colors ${
              value === o ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const { add } = useCart();
  const [active, setActive] = useState(0);
  const [scent, setScent] = useState<string>();
  const [model, setModel] = useState<string>();
  const [qty, setQty] = useState(1);
  const [tried, setTried] = useState(false);

  const needsScent = p.availableScents.length > 0;
  const needsModel = p.availableModels.length > 0;
  const valid = (!needsScent || scent) && (!needsModel || model);
  const size = p.volume ?? p.weight;

  const item = () => ({ productId: p.id, name: p.name, price: p.price!, image: p.images[0], scent, model, quantity: qty });
  const guard = () => {
    setTried(true);
    return !!valid;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-14">
      <Link to="/produtos" search={{ categoria: p.category }} className="mb-6 inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
        <ChevronLeft className="size-4" /> {getCategory(p.category).name}
      </Link>
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <div className="aspect-[4/5] overflow-hidden bg-secondary">
            <img src={p.images[active]} alt={p.name} className="h-full w-full object-cover" />
          </div>
          {p.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {p.images.map((src, i) => (
                <button key={src} onClick={() => setActive(i)} aria-label={`Ver foto ${i + 1}`} className={`aspect-square w-20 overflow-hidden border-2 ${i === active ? "border-foreground" : "border-transparent opacity-70"}`}>
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="md:pt-6">
          {size && <p className="eyebrow">{size}</p>}
          <h1 className="mt-2 text-4xl leading-tight md:text-5xl">{p.name}</h1>
          <p className="mt-4 font-serif text-3xl">{priceLabel(p)}</p>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">{p.description}</p>

          {p.price === null ? (
            <a href={waLink(kitMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-solid mt-10 w-full sm:w-auto">
              <WhatsAppIcon className="size-4" /> Montar meu kit pelo WhatsApp
            </a>
          ) : (
            <>
              {needsModel && <Selector label="Modelo" options={p.availableModels} value={model} onChange={setModel} />}
              {needsScent && <Selector label="Fragrância" options={p.availableScents} value={scent} onChange={setScent} />}

              <div className="mt-8">
                <p className="eyebrow mb-3">Quantidade</p>
                <div className="inline-flex items-center border border-border">
                  <button className="grid size-11 place-items-center" aria-label="Diminuir quantidade" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                    <Minus className="size-4" />
                  </button>
                  <span className="w-10 text-center" aria-live="polite">{qty}</span>
                  <button className="grid size-11 place-items-center" aria-label="Aumentar quantidade" onClick={() => setQty((q) => Math.min(99, q + 1))}>
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>

              {tried && !valid && (
                <p role="alert" className="mt-5 text-sm text-destructive">
                  Selecione {needsModel && !model ? "o modelo" : ""}{needsModel && !model && needsScent && !scent ? " e " : ""}{needsScent && !scent ? "a fragrância" : ""} para continuar.
                </p>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button className="btn btn-outline flex-1" onClick={() => guard() && add(item())}>
                  Adicionar à sacola
                </button>
                <a
                  href={valid ? waLink(buildOrderMessage([{ ...item(), key: "x" }])) : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => !guard() && e.preventDefault()}
                  className="btn btn-solid flex-1 cursor-pointer"
                >
                  <WhatsAppIcon className="size-4" /> Pedir pelo WhatsApp
                </a>
              </div>
            </>
          )}

          <ul className="mt-10 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
            <li>Pagamento: PIX, cartão de crédito ou débito.</li>
            <li>Entregas locais e envios para outras cidades — frete combinado pelo WhatsApp.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
