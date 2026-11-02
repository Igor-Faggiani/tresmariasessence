import type { CartItem } from "@/types/product";

export const WHATSAPP_NUMBER = "5547992771105";
export const WHATSAPP_DISPLAY = "+55 47 99277-1105";
export const INSTAGRAM_URL = "https://www.instagram.com/tresmarias.essencias/";

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace(/\u00a0/g, " ");

export const waLink = (text: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const itemLabel = (i: Pick<CartItem, "name" | "scent" | "model">) =>
  [i.name, i.model, i.scent].filter(Boolean).join(" - ");

export const cartTotal = (items: CartItem[]) =>
  Math.round(items.reduce((s, i) => s + i.price * i.quantity, 0) * 100) / 100;

export function buildOrderMessage(items: CartItem[]): string {
  const lines = items.map(
    (i) =>
      `${i.quantity}x ${itemLabel(i)} — ${formatBRL(i.price)} un. | subtotal ${formatBRL(i.price * i.quantity)}`,
  );
  return [
    "Olá! Gostaria de fazer um pedido na Três Marias Essências.",
    "",
    "Meu pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatBRL(cartTotal(items))}`,
    "",
    "Gostaria de confirmar a disponibilidade e combinar a entrega. Obrigado!",
  ].join("\n");
}

export const generalMessage = "Olá! Vim pelo site da Três Marias Essências e gostaria de mais informações.";
export const kitMessage =
  "Olá! Gostaria de montar um kit personalizado da Três Marias Essências para presente. Pode me ajudar?";
