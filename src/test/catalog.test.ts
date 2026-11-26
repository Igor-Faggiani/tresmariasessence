import { describe, expect, it } from "vitest";
import { allProducts } from "@/data/products";

describe("Unified product catalog", () => {
  it("includes products from all three collections", () => {
    const collections = new Set(allProducts.map((product) => product.collection));

    expect(collections).toEqual(new Set(["standard", "faith", "christmas"]));
  });

  it("keeps product slugs unique across collections", () => {
    const slugs = allProducts.map((product) => product.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("allows collection and category filters to be combined", () => {
    const filteredProducts = allProducts.filter(
      (product) => product.collection === "faith" && product.category === "kits",
    );

    expect(filteredProducts.length).toBeGreaterThan(0);
    expect(filteredProducts.every((product) => product.collection === "faith" && product.category === "kits")).toBe(true);
  });
});
