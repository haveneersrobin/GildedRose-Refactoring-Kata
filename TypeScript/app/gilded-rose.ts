import { isQualityIncreaser } from "@/helpers";
import {
  decreaseItemQuality,
  increaseItemQuality,
  Item,
  resetItemQuality,
} from "@/item";
import { isLegendaryItem } from "./helpers";

export class GildedRose {
  items: Array<Item>;

  constructor(items: Array<Item> = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      // Early return for legendary item as they don't need any updating
      if (isLegendaryItem(item)) {
        return;
      }

      if (!isQualityIncreaser(item)) {
        decreaseItemQuality(item);
      } else {
        increaseItemQuality(item);
        if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
          if (item.sellIn < 11) {
            increaseItemQuality(item);
          }
          if (item.sellIn < 6) {
            increaseItemQuality(item);
          }
        }
      }
      item.sellIn = item.sellIn - 1;
      if (item.sellIn < 0) {
        if (item.name != "Aged Brie") {
          if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
            decreaseItemQuality(item);
          } else {
            resetItemQuality(item);
          }
        } else {
          increaseItemQuality(item);
        }
      }
    });

    return this.items;
  }
}
