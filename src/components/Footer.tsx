import { Instagram } from "lucide-react";
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, generalMessage, waLink } from "@/lib/whatsapp";
import { NAV, NavLink } from "./Header";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <Logo className="h-16" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Body splashes, velas aromáticas, wax melts e kits para presentear.
          </p>
        </div>
        <div>
          <h2 className="eyebrow mb-5">Navegação</h2>
          <ul className="space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.label}>
                <NavLink item={n} className="transition-colors hover:text-cocoa" />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-5">Atendimento</h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={waLink(generalMessage)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-cocoa">
                <WhatsAppIcon className="size-4" /> {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-cocoa">
                <Instagram className="size-4" strokeWidth={1.4} /> @tresmarias.essencias
              </a>
            </li>
            <li className="leading-relaxed text-muted-foreground">
              Entregas locais e envios para outras cidades. Valores e condições combinados pelo WhatsApp.
            </li>
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-5">Pagamento</h2>
          <ul className="flex flex-wrap gap-2 text-xs">
            {["PIX", "Cartão de crédito", "Cartão de débito"].map((p) => (
              <li key={p} className="border border-border bg-background px-3 py-2">
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">Pagamento combinado diretamente pelo WhatsApp.</p>
        </div>
      </div>
      <div className="border-t border-border px-6 py-6 text-center text-xs tracking-wide text-muted-foreground">
        Três Marias Essências — Pequenos detalhes, grandes sensações.
      </div>
    </footer>
  );
}
