import { isBackstagePass, isQualityIncreaser } from "@/helpers";
import {
  getQualityModifyAmount,
  MAX_REGULAR_QUALITY,
  MIN_QUALITY,
} from "./gilded-rose-config";
import { isLegendaryItem } from "./helpers";
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

interface QualityChangeOptions {
  multiplier?: number;
}

const increaseItemQuality = (
  item: Item,
  { multiplier = 1 }: QualityChangeOptions = {}
) => {
  if (isQualityIncreaser(item)) {
    const increasedAmount =
      item.quality + multiplier * getQualityModifyAmount(item);
    item.quality = Math.min(increasedAmount, MAX_REGULAR_QUALITY);
  }
};

const resetItemQuality = (item: Item) => (item.quality = 0);

const decreaseItemQuality = (
  item: Item,
  { multiplier = 1 }: QualityChangeOptions = {}
) => {
  const decreasedAmount =
    item.quality - multiplier * getQualityModifyAmount(item);
  item.quality = Math.max(decreasedAmount, MIN_QUALITY);
};

export const changeQuality = (item: Item, options?: QualityChangeOptions) => {
  if (!isQualityIncreaser(item)) {
    decreaseItemQuality(item, options);
  } else {
    increaseItemQuality(item, options);
  }
};

export const changeSetIn = (item: Item) => {
  if (!isLegendaryItem(item)) {
    item.sellIn = item.sellIn - 1;

    if (item.sellIn < 0) {
      if (isBackstagePass(item)) {
        resetItemQuality(item);
      } else {
        changeQuality(item, { multiplier: 1 });
      }
    }
  }
};
