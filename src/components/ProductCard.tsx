import { Link } from "@tanstack/react-router";
import type { Product } from "@/types/product";
import { formatBRL, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const priceLabel = (p: Product) => (p.price === null ? "Sob consulta" : formatBRL(p.price));

export function ProductCard({ product }: { product: Product }) {
  const size = product.volume ?? product.weight;
  return (
    <article className="group flex flex-col">
      <Link
        to="/produto/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-[4/5] overflow-hidden bg-secondary"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        {size && <p className="eyebrow">{size}</p>}
        <h3 className="mt-1 text-lg leading-snug md:text-xl">
          <Link to="/produto/$slug" params={{ slug: product.slug }} className="hover:text-cocoa">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm">{priceLabel(product)}</p>
        <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row">
          <Link to="/produto/$slug" params={{ slug: product.slug }} className="btn btn-outline min-h-10 flex-1 px-3 text-[0.65rem]">
            Detalhes
          </Link>
          <a
            href={waLink(`Olá! Tenho interesse no produto ${product.name} da Três Marias Essências.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid min-h-10 flex-1 px-3 text-[0.65rem]"
            aria-label={`Pedir ${product.name} pelo WhatsApp`}
          >
            <WhatsAppIcon className="size-3.5" /> Pedir
          </a>
        </div>
      </div>
    </article>
  );
}
