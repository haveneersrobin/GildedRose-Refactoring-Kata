import { Item, updateItem } from "@/item";
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

      updateItem(item);
    });

    return this.items;
  }
}
