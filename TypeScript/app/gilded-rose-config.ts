import { isBackstagePass } from "@/helpers";
import { Item } from "@/item";

export const MAX_REGULAR_QUALITY = 50;
export const MIN_QUALITY = 0;

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

export const backstagePasses = ["Backstage passes to a TAFKAL80ETC concert"];

const QualityIncreasers: TypedItem = {
  items: ["Aged Brie", ...backstagePasses],
  type: ItemType.QualityIncreaser,
};

export const getQualityModifyAmount = (item: Item) => {
  if (isBackstagePass(item)) {
    if (item.sellIn <= 5) {
      return 3;
    }
    if (item.sellIn <= 10) {
      return 2;
    }
  }
  return 1;
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
