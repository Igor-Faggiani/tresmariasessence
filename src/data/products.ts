import type { Category, CategoryId, Product } from "@/types/product";
import { img } from "./images";

const BODY_SCENTS = ["Vanilla", "Morango", "Good Girl"];
const CANDLE_SCENTS = ["Vanilla", "Cereja e Avelã", "Café Verde"];

export const categories: Category[] = [
  { id: "body-splash", name: "Body Splash", description: "Leveza perfumada para o dia a dia.", image: img.splashFamily },
  { id: "velas", name: "Velas Aromáticas", description: "Luz suave e aroma que acolhe.", image: img.copoOpen },
  { id: "wax-melts", name: "Wax Melts", description: "Perfume para o ambiente, sem chama.", image: img.waxCoracao },
  { id: "kits", name: "Kits Personalizados", description: "Presentes montados com carinho.", image: img.kitA },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "body-splash-200ml",
    name: "Body Splash 200ml",
    category: "body-splash",
    description: "Body splash de fragrância delicada para perfumar a pele ao longo do dia.",
    price: 57.95,
    images: [img.splashTall200, img.splashGoodGirl200b, img.splashFamily],
    availableScents: BODY_SCENTS,
    availableModels: [],
    volume: "200ml",
    featured: true,
    relevance: 1,
  },
  {
    id: "p2",
    slug: "body-splash-100ml",
    name: "Body Splash 100ml",
    category: "body-splash",
    description: "A mesma fragrância delicada em tamanho prático para levar na bolsa.",
    price: 28.95,
    images: [img.splashVanilla100, img.splashMorango100, img.splashFamily],
    availableScents: BODY_SCENTS,
    availableModels: [],
    volume: "100ml",
    featured: true,
    relevance: 2,
  },
  {
    id: "p3",
    slug: "vela-aromatica-copo-de-whisky",
    name: "Vela Aromática — Copo de Whisky",
    category: "velas",
    description: "Vela aromática em copo de vidro com tampa de madeira.",
    price: 59.9,
    images: [img.copoWhisky, img.copoOpen],
    availableScents: CANDLE_SCENTS,
    availableModels: [],
    featured: true,
    relevance: 3,
  },
  {
    id: "p4",
    slug: "vela-aromatica-lata",
    name: "Vela Aromática — Lata",
    category: "velas",
    description: "Vela aromática em lata metálica com tampa.",
    price: 40,
    images: [img.lataBlack, img.lataBlackOpen],
    availableScents: CANDLE_SCENTS,
    availableModels: [],
    featured: true,
    relevance: 4,
  },
  {
    id: "p5",
    slug: "vela-aromatica-latinha",
    name: "Vela Aromática — Latinha",
    category: "velas",
    description: "Vela aromática em latinha pequena, ótima para lembrancinhas.",
    price: 7.99,
    images: [img.latinhasSilver, img.latinhaOpen],
    availableScents: CANDLE_SCENTS,
    availableModels: [],
    featured: false,
    relevance: 5,
  },
  {
    id: "p6",
    slug: "wax-melts-30g",
    name: "Wax Melts 30g",
    category: "wax-melts",
    description: "Pastilhas de cera aromática para usar em rechaud e perfumar o ambiente.",
    price: 20.9,
    images: [img.waxCoracao, img.waxCapivara],
    availableScents: CANDLE_SCENTS,
    availableModels: ["Coração", "Capivara"],
    weight: "30g",
    featured: true,
    relevance: 6,
  },
  {
    id: "p7",
    slug: "kit-personalizado",
    name: "Kit Personalizado",
    category: "kits",
    description: "Kits personalizados para presentear. Escolha os produtos e fragrâncias e monte a composição pelo WhatsApp.",
    price: null,
    images: [img.kitA, img.kitB],
    availableScents: [],
    availableModels: [],
    featured: false,
    relevance: 7,
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (id: CategoryId) => categories.find((c) => c.id === id)!;
export const categoryIds = categories.map((c) => c.id);
