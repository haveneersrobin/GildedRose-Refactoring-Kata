import { Item } from "@/item";

export const MAX_REGULAR_QUALITY = 50;
export const FIXED_LEGENDARY_QUALITY = 80;

export enum ItemType {
  QualityIncreaser,
  Conjured,
  Legendary,
  Regular,
}

type TypedItem = {
  readonly items: Array<Item["name"]>;
  readonly type: ItemType;
};

const QualityIncreasers: TypedItem = {
  items: ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert"],
  type: ItemType.QualityIncreaser,
};

const ConjuredItems: TypedItem = {
  items: ["Conjured Mana Cake"],
  type: ItemType.Conjured,
};

const LegendaryItems: TypedItem = {
  items: ["Sulfuras, Hand of Ragnaros"],
  type: ItemType.Legendary,
};

const RegularItems: TypedItem = {
  items: ["+5 Dexterity Vest", "Elixir of the Mongoose"],
  type: ItemType.Regular,
};

export const typedItems = [
  QualityIncreasers,
  ConjuredItems,
  LegendaryItems,
  RegularItems,
];
