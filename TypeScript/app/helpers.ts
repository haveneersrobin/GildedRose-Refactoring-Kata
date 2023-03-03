import {
  BackstagePasses,
  isOfType,
  LegendaryItems,
  QualityIncreasers,
} from "@/gilded-rose-config";
import { Item } from "@/item";
import { ConjuredItems } from "./gilded-rose-config";

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
