import {
  EXPIRED_ITEMS_QUALITY_MULTIPLIER,
  getQualityChange,
  MAX_REGULAR_QUALITY,
  MIN_QUALITY,
} from "@/gilded-rose-config";
import {
  isBackstagePass,
  isQualityIncreaser,
  lessThanMaximumQuality,
  moreThanMinimumQuality,
} from "@/helpers";
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
  if (lessThanMaximumQuality(item)) {
    const increasedAmount = item.quality + multiplier * getQualityChange(item);
    item.quality = Math.min(increasedAmount, MAX_REGULAR_QUALITY);
  }
};

const resetItemQuality = (item: Item) => (item.quality = 0);

const decreaseItemQuality = (
  item: Item,
  { multiplier = 1 }: QualityChangeOptions = {}
) => {
  if (moreThanMinimumQuality(item)) {
    const decreasedAmount = item.quality - multiplier * getQualityChange(item);
    item.quality = Math.max(decreasedAmount, MIN_QUALITY);
  }
};

export const changeQuality = (item: Item) => {
  // If items are 'expired', their quality changes with a factor * 2
  const options: QualityChangeOptions = {
    multiplier: item.sellIn <= 0 ? EXPIRED_ITEMS_QUALITY_MULTIPLIER : 1,
  };
  if (isQualityIncreaser(item)) {
    // A 'qualityIncreaser' is an item whos quality increases the longer it is unsold
    increaseItemQuality(item, options);
  } else {
    decreaseItemQuality(item, options);
  }
};

export const updateItem = (item: Item) => {
  // End of the day: ticket will become (or remain) worhtless tomorrow if sellIn <= 0
  if (isBackstagePass(item) && item.sellIn <= 0) {
    resetItemQuality(item);
  } else {
    changeQuality(item);
  }
  item.sellIn -= 1;
};
