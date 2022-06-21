---
title: Implementing difference, intersection, union and xor in ES6 javascript
description: Skip lodash and up your game with 0 dependency solutions for array filtering, diffing & unioning
image: /images/posts/card-deck.jpg
tags:
  - Javascript
  - TypeScript
date: 2022-06-18
---

> It's easy to want to pull in lodash or underscore for javascript array operations, but here are a few quick one liners that accomplish the same things.

## Arrays and you

If you’ve ever had arrays of data that you needed to massage, filter or manipulate and immediately reached for `lodash` or `underscore` - you aren’t alone.

However, there’s another way and as an advocate for understanding how to write code instead of just pulling in libraries at will, let’s talk about how to use plain Javascript arrays to manipulate our two arrays of data into our desired final result set.

Let’s assume we have two arrays constructed like so:

```typescript
const mammals: string[] = ['cat', 'dog'];
const animals: string[] = ['dog', 'gecko', 'shark'];
```

## Union

Union is the simplest of all, just adding items from each array and coming up with a final aggregated array of items.

```typescript
const results: string[] = [...mammals, ...animals];

console.log(results); // ['cat', 'dog', 'dog', 'gecko', 'shark']
```

If you didn’t notice, there’s a problem with the output above. `dog` shows up twice. The reason for this is that spreading both arrays into a single array doesn’t enforce any kind of uniqueness across array elements.

The good news is that there’s an easy fix for this using ES6’s `Set` object which can only contain unique values and will automatically de-duplicate - then we can just spread the set back to a plain array.

```typescript
const results: string[] = [...new Set<string>([...mammals, ...animals])];

console.log(results); // ['cat', 'dog', 'gecko', 'shark']
```

While the above syntax is correct, it can look and feel a bit awkward - the following, using `Array.from` will convert the contents of the `Set` back to a plain array.

```typescript
const results: string[] = Array.from(new Set([...mammals, ...animals]));

console.log(results); // ['cat', 'dog', 'gecko', 'shark']
```

## Intersection

Intersection is just a fancy way of saying “give me the elements that only exist in both arrays”. Using our arrays above, we should end up with an array containing `dog`.

```typescript
const results: string[] = animals.filter((animal) => mammals.includes(animal));

console.log(results); // ['dog']
```

## Difference

Difference will return to us the elements in our “first” array that are not in our “second” array. First denotes the array that we are calling `filter` on and second is the array that we are calling `includes` on.

```typescript
const mammalResults: string[] = mammals.filter(
  (mammal) => !animals.includes(mammal),
);

console.log(mammalResults); // ['cat']

const animalResults: string[] = animals.filter(
  (animal) => !mammals.includes(animal),
);

console.log(animalResults); // ['gecko', 'shark']
```

## XOR

XOR (exclusive or) or symmetric difference is especially handy when we want to get an array of results that only contain elements that don’t exist in the other array and vice versa. Imagine a Venn diagram where we return _only_ the results that don't exist in the center overlapping area. This is best illustrated with an example.

```typescript
const results: string[] = mammals
  .filter((mammal) => !animals.includes(mammal))
  .concat(animals.filter((animal) => !mammals.includes(animal)));

console.log(results); // ['cat', 'gecko', 'shark']
```

---

Knowing that we can succinctly come up with arrays of filtered/union’ed data we have to ask whether we really need `lodash` or `underscore` for this low hanging fruit. Gone are the days of old StackOverflow articles with solutions initializing empty arrays and using forEach loops to put elements into the array.

Go forth and conquer one difference, intersection or xor at a time.
