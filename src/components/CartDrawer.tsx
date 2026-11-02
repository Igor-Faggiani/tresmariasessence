import { Link } from "@tanstack/react-router";
import { Check, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { buildOrderMessage, formatBRL, waLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function CartDrawer() {
  const { items, total, open, setOpen, setQty, remove } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-foreground/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Sacola de pedidos"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <h2 className="text-2xl">Sua sacola</h2>
          <button className="grid size-11 place-items-center" aria-label="Fechar sacola" onClick={() => setOpen(false)}>
            <X className="size-5" strokeWidth={1.4} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <ShoppingBag className="size-10 text-greige" strokeWidth={1} />
            <p className="font-serif text-2xl">Sua sacola está vazia</p>
            <p className="text-sm text-muted-foreground">Escolha suas fragrâncias favoritas no catálogo.</p>
            <Link to="/produtos" onClick={() => setOpen(false)} className="btn btn-outline mt-2">
              Ver produtos
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {items.map((i) => (
                <li key={i.key} className="flex gap-4 py-5">
                  <img src={i.image} alt={i.name} className="h-24 w-20 shrink-0 bg-secondary object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="font-serif text-lg leading-tight">{i.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {[i.model, i.scent].filter(Boolean).join(" · ")}
                    </p>
                    <p className="mt-1 text-sm">{formatBRL(i.price)}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-border">
                        <button className="grid size-9 place-items-center" aria-label="Diminuir" onClick={() => setQty(i.key, i.quantity - 1)}>
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm" aria-live="polite">{i.quantity}</span>
                        <button className="grid size-9 place-items-center" aria-label="Aumentar" onClick={() => setQty(i.key, i.quantity + 1)}>
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button className="grid size-9 place-items-center text-muted-foreground hover:text-destructive" aria-label={`Remover ${i.name}`} onClick={() => remove(i.key)}>
                        <Trash2 className="size-4" strokeWidth={1.4} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-border bg-secondary/50 p-5">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow">Subtotal</span>
                <span className="font-serif text-2xl">{formatBRL(total)}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Entrega e pagamento combinados pelo WhatsApp.</p>
              <a
                href={waLink(buildOrderMessage(items))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid mt-4 w-full"
              >
                <WhatsAppIcon className="size-4" /> Finalizar pelo WhatsApp
              </a>
              <button onClick={() => setOpen(false)} className="mt-3 w-full py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                Continuar comprando
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export function CartNotice() {
  const { notice, setOpen } = useCart();
  if (!notice) return null;
  return (
    <div role="status" className="fade-up fixed inset-x-4 bottom-24 z-40 mx-auto flex max-w-sm items-center gap-3 bg-primary px-4 py-3 text-sm text-primary-foreground shadow-soft">
      <Check className="size-4 shrink-0" />
      <span className="flex-1">{notice}</span>
      <button className="text-xs uppercase tracking-widest underline underline-offset-4" onClick={() => setOpen(true)}>
        Ver
      </button>
    </div>
  );
}
