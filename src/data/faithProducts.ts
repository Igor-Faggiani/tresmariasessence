import type { Product } from "@/types/product";
import nsChantilly from "@/assets/fe/nossa-senhora-chantilly.webp";
import nsGel from "@/assets/fe/nossa-senhora-gel.webp";
import sagradaFamilia from "@/assets/fe/sagrada-familia.webp";
import santinha1980 from "@/assets/fe/santinha-1980.webp";
import peonia from "@/assets/fe/peonia.webp";
import rosa from "@/assets/fe/rosa.webp";
import anjinho1980 from "@/assets/fe/anjinho-1980.webp";
import santinha1499a from "@/assets/fe/santinha-1499-a.webp";
import nossaSenhoraFatima from "@/assets/fe/nossa-senhora-fatima.webp";
import anjinho1499a from "@/assets/fe/anjinho-1499-a.webp";
import presepio from "@/assets/fe/presepio.webp";
import anjinho1499b from "@/assets/fe/anjinho-1499-b.webp";
import kitMargaridas from "@/assets/fe/kit-margaridas.webp";
import kitRosas from "@/assets/fe/kit-rosas.webp";
import santinha1499b from "@/assets/fe/santinha-1499-b.webp";
import anjinho1499c from "@/assets/fe/anjinho-1499-c.webp";

export const FAITH_SCENTS = [
  "Vanilla",
  "Amora branca",
  "Chá-branco",
  "Capim & limão",
  "Flor de algodão",
];

const faithProduct = (
  id: string,
  slug: string,
  name: string,
  price: number,
  image: string,
  relevance: number,
  category: "velas" | "kits" = "velas",
): Product => ({
  id,
  slug,
  name,
  category,
  description: `${name}. Produto da Coleção Fé da Três Marias Essências. Escolha a fragrância disponível para personalizar sua peça.`,
  price,
  images: [image],
  availableScents: FAITH_SCENTS,
  availableModels: [],
  featured: true,
  relevance,
});

export const faithProducts: Product[] = [
  faithProduct("fe-01", "nossa-senhora-aparecida-chantilly", "Nossa Senhora Aparecida com Chantilly", 74.9, nsChantilly, 1),
  faithProduct("fe-02", "nossa-senhora-aparecida-parafina-gel", "Nossa Senhora Aparecida — Parafina em Gel", 84.9, nsGel, 2),
  faithProduct("fe-03", "sagrada-familia", "Sagrada Família", 19.8, santinha1980, 3),
  faithProduct("fe-04", "santinha-19-80", "Santinha", 19.8, sagradaFamilia, 4),
  faithProduct("fe-05", "peonia", "Peônia", 19.8, peonia, 5),
  faithProduct("fe-06", "rosa", "Rosa", 19.8, rosa, 6),
  faithProduct("fe-07", "anjinho-19-80", "Anjinho", 19.8, anjinho1980, 7),
  faithProduct("fe-08", "santinha-14-99-opcao-1", "Santinha", 14.99, santinha1499a, 8),
  faithProduct("fe-09", "anjinho-14-99-opcao-1", "Anjinho", 14.99, anjinho1499a, 9),
  faithProduct("fe-10", "nossa-senhora-de-fatima", "Nossa Senhora de Fátima", 14.99, nossaSenhoraFatima, 10),
  faithProduct("fe-11", "anjinho-14-99-opcao-2", "Anjinho", 14.99, presepio, 11),
  faithProduct("fe-12", "presepio", "Presépio", 14.99, anjinho1499b, 12),
  faithProduct("fe-13", "kit-margaridas", "Kit Margaridas", 14.99, kitMargaridas, 13, "kits"),
  faithProduct("fe-14", "kit-rosas", "Kit Rosas", 14.99, kitRosas, 14, "kits"),
  //{ ...faithProduct("fe-15", "santinha-14-99-opcao-2", "Santinha", 14.99, santinha1499b, 15), images: [santinha1499b, anjinho1499c] },
];
