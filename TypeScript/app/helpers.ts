import { ItemType, typedItems } from "@/gilded-rose-config";
import { Item } from "@/item";

export const isLegendaryItem = (item: Item) =>
  getItemType(item) === ItemType.Legendary;

export const isQualityIncreaser = (item: Item) =>
  getItemType(item) === ItemType.QualityIncreaser;

export const getItemType = (item: Item) =>
  typedItems.find((typedItem) => typedItem.items.includes(item.name))?.type;
