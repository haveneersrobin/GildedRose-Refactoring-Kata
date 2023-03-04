import { isBackstagePass, isConjuredItem, isQualityIncreaser } from "@/helpers";
import { Item } from "@/item";
import { isLegendaryItem } from "./../../app/helpers";

const initialItems = [
  new Item("+5 Dexterity Vest", 10, 20), //
  new Item("Aged Brie", 2, 0), //
  new Item("Elixir of the Mongoose", 5, 7), //
  new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  new Item("Conjured Mana Cake", 3, 6),
];

const allHelpers = [
  isLegendaryItem,
  isQualityIncreaser,
  isBackstagePass,
  isConjuredItem,
];

describe("Helper functins", () => {
  it("should return true or false correctly based on name of item", () => {
    const regularItem = new Item("+5 Dexterity Vest", 9, 19);
    expect(allHelpers.some((helper) => helper(regularItem))).toBe(false);

    const backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      15,
      20
    );
    expect(isQualityIncreaser(backstagePass)).toBe(true);
    expect(isBackstagePass(backstagePass)).toBe(true);
    expect(isLegendaryItem(backstagePass)).toBe(false);
    expect(isConjuredItem(backstagePass)).toBe(false);

    const legendaryItem = new Item("Sulfuras, Hand of Ragnaros", -1, 80);
    expect(isQualityIncreaser(legendaryItem)).toBe(false);
    expect(isBackstagePass(legendaryItem)).toBe(false);
    expect(isLegendaryItem(legendaryItem)).toBe(true);
    expect(isConjuredItem(legendaryItem)).toBe(false);

    const qualityIncreaser = new Item("Aged Brie", 2, 0);
    expect(isQualityIncreaser(qualityIncreaser)).toBe(true);
    expect(isBackstagePass(qualityIncreaser)).toBe(false);
    expect(isLegendaryItem(qualityIncreaser)).toBe(false);
    expect(isConjuredItem(qualityIncreaser)).toBe(false);

    const conjuredItem = new Item("Conjured Mana Cake", 3, 6);
    expect(isQualityIncreaser(conjuredItem)).toBe(false);
    expect(isBackstagePass(conjuredItem)).toBe(false);
    expect(isLegendaryItem(conjuredItem)).toBe(false);
    expect(isConjuredItem(conjuredItem)).toBe(true);
  });
});
