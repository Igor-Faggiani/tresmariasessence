import { describe, expect, it } from "vitest";
import { buildOrderMessage, cartTotal, waLink } from "@/lib/whatsapp";
import { products } from "@/data/products";
import type { CartItem } from "@/types/product";

const items: CartItem[] = [
  { key: "a", productId: "p1", name: "Body Splash 200ml", price: 57.95, image: "", scent: "Vanilla", quantity: 1 },
  { key: "b", productId: "p3", name: "Vela Aromática — Copo de Whisky", price: 59.9, image: "", scent: "Cereja e Avelã", quantity: 1 },
];

describe("pedido pelo WhatsApp", () => {
  it("soma o total do exemplo do briefing", () => {
    expect(cartTotal(items)).toBe(117.85);
    expect(buildOrderMessage(items)).toContain("Total: R$ 117,85");
  });
  it("lista quantidade, produto e fragrância", () => {
    expect(buildOrderMessage(items)).toContain("1x Body Splash 200ml - Vanilla");
  });
  it("envia para o número da marca com texto codificado", () => {
    const url = waLink("Olá & ação");
    expect(url).toBe("https://wa.me/5547992771105?text=Ol%C3%A1%20%26%20a%C3%A7%C3%A3o");
  });
  it("kit personalizado não tem preço fictício", () => {
    expect(products.find((p) => p.slug === "kit-personalizado")?.price).toBeNull();
  });
  it("preços do catálogo", () => {
    const price = (s: string) => products.find((p) => p.slug === s)?.price;
    expect(price("body-splash-100ml")).toBe(28.95);
    expect(price("vela-aromatica-lata")).toBe(40);
    expect(price("vela-aromatica-latinha")).toBe(7.99);
    expect(price("wax-melts-30g")).toBe(20.9);
  });
});
