import {
  BackstagePasses,
  isOfType,
  LegendaryItems,
  QualityIncreasers,
} from "@/gilded-rose-config";
import { Item } from "@/item";
import { ConjuredItems } from "./gilded-rose-config";

// The type guard is necessary seen as though we are using `.includes` on readonly arrays
export const isLegendaryItem = (item: Item) =>
  isOfType<typeof LegendaryItems>(item.name) &&
  LegendaryItems.includes(item.name);

export const isQualityIncreaser = (item: Item) =>
  isOfType<typeof QualityIncreasers>(item.name) &&
  QualityIncreasers.includes(item.name);

export const isBackstagePass = (item: Item) =>
  isOfType<typeof BackstagePasses>(item.name) &&
  BackstagePasses.includes(item.name);

export const isConjuredItem = (item: Item) =>
  isOfType<typeof ConjuredItems>(item.name) &&
  ConjuredItems.includes(item.name);
