---
title: Implementing difference, intersection, union and xor in ES6 javascript
description: Skip lodash and up your game with 0 dependency solutions for array filtering, diffing & unioning
image: /images/posts/card-deck.jpg
tags:
  - Javascript
  - TypeScript
date: 2022-06-18
featured: true
---

> It's easy to pull in `lodash` for javascript array operations, but here are a few quick hits that give the same results - without yet another dependency!

While libraries like `lodash` can help us be more productive and not re-invent the wheel, they can also be a crutch and source of trouble when we don't make the effort to understand how the functions we rely on, operate. In an effort to not rely on these crutches, let’s talk about how to use plain Javascript arrays to manipulate arrays of data into our desired final result.

Let’s assume we have two arrays constructed like so:

```typescript
const pets: string[] = ['cat', 'dog'];
const animals: string[] = ['dog', 'alligator', 'shark'];
```

## Union

Union is the simplest of all, just adding items from each array and coming up with a final aggregated array of items.

```typescript
const results: string[] = [...pets, ...animals];

console.log(results); // ['cat', 'dog', 'dog', 'alligator', 'shark']
```

If you didn’t notice, there’s a problem with the output above. `dog` shows up twice. The reason for this is that spreading both arrays into a single array doesn’t enforce any kind of uniqueness across array elements.

The good news is that there’s an easy fix for this using ES6’s `Set` object which can only contain unique values and will automatically de-duplicate - then we can just spread the set back to a plain array.

```typescript
const results: string[] = [...new Set<string>([...pets, ...animals])];

console.log(results); // ['cat', 'dog', 'alligator', 'shark']
```

While the above syntax is correct, it can look and feel a bit awkward - the following, using `Array.from` will convert the contents of the `Set` back to a plain array.

```typescript
const results: string[] = Array.from(new Set([...pets, ...animals]));

console.log(results); // ['cat', 'dog', 'alligator', 'shark']
```

## Intersection

Intersection is just a fancy way of saying “give me the elements that only exist in both arrays”. Using our arrays above, we should end up with an array containing `dog`.

```typescript
const results: string[] = animals.filter((animal) => pets.includes(animal));

console.log(results); // ['dog']
```

## Difference

Difference will return to us the elements in our “first” array that are not in our “second” array. First denotes the array that we are calling `filter` on and second is the array that we are calling `includes` on.

```typescript
const petResults: string[] = pets.filter((pet) => !animals.includes(pet));

console.log(petResults); // ['cat']

const animalResults: string[] = animals.filter(
  (animal) => !pets.includes(animal),
);

console.log(animalResults); // ['alligator', 'shark']
```

## XOR

XOR (exclusive or) or symmetric difference is especially handy when we want to get an array of results that only contain elements that don’t exist in the other array and vice versa. Imagine a Venn diagram where we return _only_ the results that don't exist in the center overlapping area. This is best illustrated with an example.

```typescript
const results: string[] = pets
  .filter((pet) => !animals.includes(pet))
  .concat(animals.filter((animal) => !pets.includes(animal)));

console.log(results); // ['cat', 'alligator', 'shark']
```

---

Knowing that we can succinctly come up with arrays of filtered/union’ed data we have to ask whether we really need `lodash` or `underscore` for this low hanging fruit. Gone are the days of old StackOverflow articles with solutions initializing empty arrays and using forEach loops to put elements into the array.

Go forth and conquer one difference, intersection or xor at a time.
