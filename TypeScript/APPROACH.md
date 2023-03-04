# Refactoring and improvement approach

The refactoring of this code and subsequently trying to improve it, was done in a few steps which I'll try to outline shortly here. Other considerations and/or alternatives are also provided.

## 0. Setup

Since I opted to perform this assignment in TypeScript, I removed unused files. Jest was chosen as the testing framework so the unused files/folders were removed. I ran `npm i`, extracted the `Item` class to its own file (`app/item.ts`). I simplified some printing methods in `golden-master-text-test.ts` and ran ESLint and Prettier. (_See: [`ef133b2`](https://github.com/haveneersrobin/gildedrose-ts-robin-haveneers/commit/ef133b2729b890a06ec947966ea50f6491a4d93f), [`f7cc632`](https://github.com/haveneersrobin/gildedrose-ts-robin-haveneers/commit/f7cc632b3925720be59fde247df68e6ce9af6035) and [`dd9631f`](https://github.com/haveneersrobin/gildedrose-ts-robin-haveneers/commit/dd9631f0deb7e62f4e09704e6704cffbe5609c01)_)

## 1. Testing

Seen as though this is quite an 'artificial' and academic example, a test-driven-approach was necessary and justified. The code in `gilded-rose.ts` was quite unreadable due to the deeply nested conditional blocks, inline string comparison, repetition ... Refactoring it would almost certainly lead to unwanted results. Therefore, assuming the code **did** work however, I firstly wrote tests in `test/jest/gilded-rose.spec.ts`. (_See [`25c0908`](https://github.com/haveneersrobin/gildedrose-ts-robin-haveneers/commit/25c090805c1e5c2abe946259e652258e6b514c7a)_)

## 2. Refactoring

Satisfied with these tests and the 'coverage' they provided, I began refactoring.

I began simple, doing the following

- replaced the main `for`-loop in `gilded-rose.ts` with a more readable `.forEach` on `items`. This way we don't need to acces the array using the index every time.
- added some helper methods in `app/helpers.ts` and added an early return for _Legendary items_ seen as though they do not required any actions. This way, I could remove the checks for the string "_Sulfuras, ..._"
- replace the increase/decrease of the quality by a helper function, avoiding repitition
- simplified the logic of these methods by passing arguments and re-using existing parts

(_See these commits [`25c0908...b1123864`](https://github.com/haveneersrobin/gildedrose-ts-robin-haveneers/compare/25c090805c1e5c2abe946259e652258e6b514c7a...b112386481bd483cbcada94ea9010997a5fb8813))_

## 3. New feature

To account for the new 'conjured' item type, I started by added failing tests for this case. (See [`e01bdf2`](https://github.com/haveneersrobin/gildedrose-ts-robin-haveneers/commit/e01bdf2cdc8594398be9eba1bb7b966542ccb45c))

Finally, adding the logic for this item was simple enough: I just needed to add a new 'multiplier' and return it in case we have a 'conjured' item. Finally, I did some cleanup and moved around some code. (See [`f73a5a1`](https://github.com/haveneersrobin/gildedrose-ts-robin-haveneers/commit/f73a5a1cfd9189caf0e437b246cc59029f9ea665))

## 4. Config file

I opted to create a `gilded-rose-config.ts` file to centralize all 'configuration' values. For example, the mininmum and maximum quality, special multipliers (e.g. for conjured items) and different types of items are gathered here. This way, changing parts of the logic is easy and centralized ('refactor for maintainability').

## 5. Alternatives and considerations

##### `sellIn` value

After thinking about the flow, changing the `sellIn` property can be done at the end, and is the same for all items. The implications can be calculated 'the next day' instead of immediately. This simplifies the logic.

##### Item subclasses

The file `app/helpers.ts` contains helper functions to distinguish the different types of items. At first I considered creating new classes extending from `Item` (e.g. `ConjuredItem`) with their own `changeQuality` methods. This way, however, I would have to change the test file (e.g. using new/different constructors) or the `Item` class itself, and I think that is not allowed and this was not allowed according to the instructions.

##### Unit tests for helper functions

I added unit tests for the `app/helpers.ts` only later on. They were covered by the initial tests but at a certain point I was experimenting with some other approaches and tried refactoring it, so I thought some unit tests for this isolated part was in place.

##### Template literals

Lastly, I replaced string concatenation with interpolation because it is more readable and I like it more :)
