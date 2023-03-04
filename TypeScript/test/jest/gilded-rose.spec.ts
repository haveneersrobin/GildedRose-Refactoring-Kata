import { GildedRose } from "@/gilded-rose";
import { Item } from "@/item";

const initialItems = [
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

describe("Gilded Rose", () => {
  it("should update items correctly after one day", () => {
    const gildedRose = new GildedRose(initialItems);

    const expectedResult = [
      new Item("+5 Dexterity Vest", 9, 19),
      new Item("Aged Brie", 1, 1),
      new Item("Elixir of the Mongoose", 4, 6),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 14, 21),
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 50),
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 50),
      new Item("Conjured Mana Cake", 2, 4),
    ];

    expect(gildedRose.updateQuality()).toStrictEqual(expectedResult);
  });

  it("should degrade a normal item twice as fast if sellIn date has passed", () => {
    const initialItems = [new Item("+5 Dexterity Vest", 2, 10)];
    const gildedRose = new GildedRose(initialItems);

    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("+5 Dexterity Vest", 1, 9),
    ]);
    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("+5 Dexterity Vest", 0, 8),
    ]);
    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("+5 Dexterity Vest", -1, 6),
    ]);
    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("+5 Dexterity Vest", -2, 4),
    ]);
  });

  it("should never have a quality below 0", () => {
    const initialItems = [new Item("+5 Dexterity Vest", 0, 2)];
    const gildedRose = new GildedRose(initialItems);

    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("+5 Dexterity Vest", -1, 0),
    ]);
    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("+5 Dexterity Vest", -2, 0),
    ]);
  });

  it("should increase quality over time for Aged Brie and Backstage Pass, but drop to 0 for the latter after concert", () => {
    const initialItems = [
      new Item("Aged Brie", 1, 3),
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 2),
    ];
    const gildedRose = new GildedRose(initialItems);

    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("Aged Brie", 0, 4),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5),
    ]);
    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("Aged Brie", -1, 6),
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0),
    ]);
  });

  it("should should never increase quality above 50", () => {
    const initialItems = [
      new Item("Aged Brie", 5, 49),
      new Item("Aged Brie", 0, 48),
    ];
    const gildedRose = new GildedRose(initialItems);

    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("Aged Brie", 4, 50),
      new Item("Aged Brie", -1, 50),
    ]);
    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("Aged Brie", 3, 50),
      new Item("Aged Brie", -2, 50),
    ]);
  });

  it("should never sell or decrease quality of legendary items", () => {
    const initialItems = [
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 40),
    ];
    const gildedRose = new GildedRose(initialItems);

    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 40),
    ]);
  });

  it("should correctly increase value of backstage passes as sellIn date approaches", () => {
    const initialItems = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 5),
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10),
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, 30),
    ];
    const gildedRose = new GildedRose(initialItems);

    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 6),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 12),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 33),
    ]);

    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("Backstage passes to a TAFKAL80ETC concert", 9, 8),
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, 15),
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0),
    ]);
  });

  it("should decrease quality of conjured items twice as fast", () => {
    const initialItems = [
      new Item("Conjured Mana Cake", 3, 6),
      new Item("Conjured Mana Cake", 1, 20),
    ];
    const gildedRose = new GildedRose(initialItems);

    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("Conjured Mana Cake", 2, 4),
      new Item("Conjured Mana Cake", 0, 18),
    ]);
    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("Conjured Mana Cake", 1, 2),
      new Item("Conjured Mana Cake", -1, 14),
    ]);
    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("Conjured Mana Cake", 0, 0),
      new Item("Conjured Mana Cake", -2, 10),
    ]);
    expect(gildedRose.updateQuality()).toStrictEqual([
      new Item("Conjured Mana Cake", -1, 0),
      new Item("Conjured Mana Cake", -3, 6),
    ]);
  });
});
