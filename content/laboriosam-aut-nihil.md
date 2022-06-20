---
title: Implementing difference, interaction, union and xor in ES6 javascript
description: Skip lodash and up your game with 0 dependency solutions for array filtering
image: https://images.pexels.com/photos/414628/pexels-photo-414628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
tags:
  - Javascript
  - TypeScript
date: 2022-06-18
---

_It's easy to want to pull in lodash or underscore for javascript array operations, but here are a few quick one liners that accomplish the same things._

### Summary

- [Arrays and you](#arrays-and-you)
- [Union](#union)
- [Intersection](#intersection)
- [Difference](#difference)
- [XOR](#xor)

## Arrays and you

If you’ve ever had a couple arrays of data that you needed to massage and immediately leaned into `lodash` or `underscore` - you aren’t alone.

However, there’s another way and as an advocate for understanding how to write code instead of just pulling in libraries at will, let’s talk about how to use plain Javascript arrays to manipulate our two arrays of data into our desired final result set.

Foobar

Let’s assume we have two arrays constructed like so:

```javascript
const mammals = ['cat', 'dog'];
const animals = ['dog', 'gecko', 'shark'];
```

## Union

Union is the simplest of all, just adding items from each array and coming up with a final aggregated array of items.

    const results = [...mammals, ...animals];

    console.log(results); // ['cat', 'dog', 'dog', 'gecko', 'shark']

JavaScript

Copy

If you didn’t notice, there’s a problem with the output above. `dog` shows up twice. The reason for this is that spreading both arrays into a single array doesn’t care about uniqueness across array elements.

The good news is that there’s an easy fix for this using ES6’s `Set` object which can only contain unique values.

    const results = [...new Set([...mammals, ...animals])];

    console.log(results); // ['cat', 'dog', 'gecko', 'shark']

JavaScript

Copy

By spreading our arrays into a `Set` we get the natural de-duping behavior inherent to a `Set` and then just spread that object back to a plain array.

## Intersection

Intersection is just a fancy way of saying “give me the elements that only exist in both arrays”. Using our arrays above, we should end up with an array containing `dog`.

    const results = animals.filter(animal => mammals.includes(animal));

    console.log(results); // ['dog']

JavaScript

Copy

## Difference

Difference will return to us the elements in our “first” array that are not in our “second” array. First denotes the array that we are calling `filter` on and second is the array that we are calling `includes` on.

    const mammalResults = mammals.filter(mammal => !animals.includes(mammal));

    console.log(mammalResults); // ['cat']

    const animalResults = animals.filter(animal => !mammals.includes(animal));

    console.log(animalResults); // ['gecko', 'shark']

JavaScript

Copy

## XOR

XOR (exclusive or) or symmetric difference is especially handy when we want to get an array of results that only contain elements that don’t exist in the other array and vice versa. This can best be thought of doing a union on difference’d arrays. This is best illustrated with an example.

    const results = mammals.filter(mammal => !animals.includes(mammal))
      .concat(animals.filter(animal => !mammals.includes(animal)));

    console.log(results); // ['cat', 'gecko', 'shark']

JavaScript

Copy

---

Knowing that we can succinctly come up with arrays of filtered/union’ed data we have to ask whether we really need `lodash` or `underscore` for this low hanging fruit. Gone are the days of old StackOverflow articles with solutions initializing empty arrays and using forEach loops to put elements into the array.

Go forth and conquer one difference, intersection or xor at a time.
