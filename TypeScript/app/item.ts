import { isBackstagePass, isQualityIncreaser } from "@/helpers";
import {
  EXPIRED_ITEMS_MULTIPLIER,
  getQualityModifyAmount,
  MAX_REGULAR_QUALITY,
  MIN_QUALITY,
} from "./gilded-rose-config";
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
  const increasedAmount =
    item.quality + multiplier * getQualityModifyAmount(item);
  item.quality = Math.min(increasedAmount, MAX_REGULAR_QUALITY);
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

export const changeQuality = (item: Item) => {
  const options = {
    multiplier: item.sellIn <= 0 ? EXPIRED_ITEMS_MULTIPLIER : 1,
  };
  if (isQualityIncreaser(item)) {
    increaseItemQuality(item, options);
  } else {
    decreaseItemQuality(item, options);
  }
};

export const updateItem = (item: Item) => {
  // End of the day: ticket will (stil) be worhtless tomorrow if sellIn <= 0
  if (isBackstagePass(item) && item.sellIn <= 0) {
    resetItemQuality(item);
  } else {
    changeQuality(item);
  }
  item.sellIn = item.sellIn - 1;
};
