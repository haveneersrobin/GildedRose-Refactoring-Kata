import { MAX_REGULAR_QUALITY } from "./gilded-rose-config";
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

// The isLegendaryItem checks below *should* not be necessary due
// to the early return in updateQuality but better safe than sorry :-)
export const increaseItemQuality = (item: Item) => {
  if (!isLegendaryItem(item) && item.quality < MAX_REGULAR_QUALITY) {
    item.quality = item.quality + 1;
  }
};

export const resetItemQuality = (item: Item) => {
  if (!isLegendaryItem(item)) {
    item.quality = 0;
  }
};

export const decreaseItemQuality = (item: Item) => {
  if (!isLegendaryItem(item) && item.quality > 0) {
    item.quality = item.quality - 1;
  }
};
