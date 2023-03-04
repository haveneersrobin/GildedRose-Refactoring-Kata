import { GildedRose } from "@/gilded-rose";
import { Item } from "@/item";

const items = [
  new Item("+5 Dexterity Vest", 10, 20), //
  new Item("Aged Brie", 2, 0), //
  new Item("Elixir of the Mongoose", 5, 7), //
  new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  new Item("Conjured Mana Cake", 3, 6),
];

const gildedRose = new GildedRose(items);

let days: number = 2;
if (process.argv.length > 2) {
  days = +process.argv[2];
}

const printItems = (items: Item[]) => {
  console.log("name, sellIn, quality");
  items.forEach((element) => {
    console.log(`${element.name} ${element.sellIn} ${element.quality}`);
  });
  console.log();
};

for (let i = 0; i < days; i++) {
  console.log(`-------- day ${i} --------`);
  printItems(items);
  const result = gildedRose.updateQuality();
  if (i === days - 1) {
    console.log("-------- result --------");
    printItems(result);
  }
}
