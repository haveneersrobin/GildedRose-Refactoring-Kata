import { isBackstagePass } from "@/helpers";
import { Item } from "@/item";

export const MAX_REGULAR_QUALITY = 50;
export const MIN_QUALITY = 0;

export const BackstagePasses = [
  "Backstage passes to a TAFKAL80ETC concert",
] as const;
export const ConjuredItems = ["Conjured Mana Cake"] as const;
export const LegendaryItems = ["Sulfuras, Hand of Ragnaros"] as const;
export const RegularItems = [
  "+5 Dexterity Vest",
  "Elixir of the Mongoose",
] as const;
export const QualityIncreasers = ["Aged Brie", ...BackstagePasses] as const;

type ItemType =
  | typeof BackstagePasses
  | typeof ConjuredItems
  | typeof LegendaryItems
  | typeof RegularItems
  | typeof QualityIncreasers;

export const isOfType = <T extends ItemType>(name: string): name is T[number] =>
  name !== undefined;

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
