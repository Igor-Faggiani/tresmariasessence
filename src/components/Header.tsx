import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { generalMessage, waLink } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import type { CategoryId } from "@/types/product";

type NavItem = { label: string; to: "/" | "/produtos" | "/sobre"; categoria?: CategoryId };
export const NAV: NavItem[] = [
  { label: "Início", to: "/" },
  { label: "Produtos", to: "/produtos" },
  { label: "Velas", to: "/produtos", categoria: "velas" },
  { label: "Body Splash", to: "/produtos", categoria: "body-splash" },
  { label: "Kits", to: "/produtos", categoria: "kits" },
  { label: "Sobre nós", to: "/sobre" },
];

export function NavLink({ item, onClick, className }: { item: NavItem; onClick?: () => void; className?: string }) {
  if (item.to === "/produtos")
    return (
      <Link to="/produtos" search={{ categoria: item.categoria }} onClick={onClick} className={className}>
        {item.label}
      </Link>
    );
  return (
    <Link to={item.to} onClick={onClick} className={className}>
      {item.label}
    </Link>
  );
}

export function Header() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
  }, [menu]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-20 md:px-8">
        <button
          className="-ml-2 grid size-11 place-items-center lg:hidden"
          aria-label="Abrir menu"
          onClick={() => setMenu(true)}
        >
          <Menu className="size-5" strokeWidth={1.4} />
        </button>
        <Link to="/" aria-label="Três Marias — início" className="lg:-ml-2">
          <Logo className="h-10 md:h-12" />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <NavLink
              key={n.label}
              item={n}
              className="text-[0.7rem] uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-cocoa"
            />
          ))}
        </nav>
        <div className="-mr-2 flex items-center">
          <a
            href={waLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="hidden size-11 place-items-center transition-colors hover:text-cocoa sm:grid"
          >
            <WhatsAppIcon className="size-[1.15rem]" />
          </a>
          <button
            onClick={() => setOpen(true)}
            aria-label={`Abrir sacola (${count} itens)`}
            className="relative grid size-11 place-items-center transition-colors hover:text-cocoa"
          >
            <ShoppingBag className="size-5" strokeWidth={1.4} />
            {count > 0 && (
              <span className="absolute right-1 top-1.5 grid min-w-4 place-items-center rounded-full bg-primary px-1 text-[0.6rem] leading-4 text-primary-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {menu && (
        <div className="fixed inset-0 z-50 bg-background lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex h-16 items-center justify-between px-4">
            <Logo className="h-10" />
            <button className="grid size-11 place-items-center" aria-label="Fechar menu" onClick={() => setMenu(false)}>
              <X className="size-5" strokeWidth={1.4} />
            </button>
          </div>
          <nav className="flex flex-col px-6 pt-8" aria-label="Menu móvel">
            {NAV.map((n, i) => (
              <NavLink
                key={n.label}
                item={n}
                onClick={() => setMenu(false)}
                className="fade-up border-b border-border py-4 font-serif text-3xl"
              />
            ))}
            <a
              href={waLink(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid mt-10"
            >
              <WhatsAppIcon className="size-4" /> Fale conosco
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
