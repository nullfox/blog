---
title: Multiple exports with types in a Typescript Package
excerpt: Supporting multiple exports with full type declarations in a Typescript package isn't always straightforward.
image: /images/posts/types.jpg
tags:
  - Typescript
date: 2022-07-09
featured: true
published: true
---

> Supporting multiple exports with full type declarations in a Typescript package isn't always straightforward.

You've mastered typescript basics, conquered generics and squashed overloads; but there's one thing you still haven't tackled - multiple package exports in typescript.

To get started, let's look at the anatomy of a regular single export starting with our package's manifest.

```json
{
  "name": "my-typescript-module",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

In the above example, the first 2 lines should look familiar with our modules name and version. Moving on to the next 2 lines:

- `main` lets node know the entry point to our package when we required/import it
- `types` is typescript specific and lets our editor know where to find type declarations for our module

For a module with a single export, the above setup works great - upon requiring/importing we get type information and all is well. However, should you want to have multiple exports, we'll need to change up our `package.json` in a few ways shown in the example below.

```json
{
  "name": "my-typescript-module",
  "version": "1.0.0",
  "exports": {
    ".": "./dist/index.js",
    "./engine": "./dist/engine.js"
  },
  "typesVersions": {
    "*": {
      "*": ["./dist/*"]
    }
  }
}
```

In the above example, we can see the same 2 familiar first lines with name and version. We've also removed the `main` and `types` declarations in favor of the lines below it as follows:

- `exports` is effectively `main` on steroids and allows us to define an object containing all of our exports. The key denotes the name of the export with `.` being a special placeholder for our "root export"
- `typesVersions` is a typescript-specific object containing a nested object where the top level key matches `semver` range Typescript version where `*` matches any. Within that key is another object containing a path map allowing us to specify where our type declarations live.

The `typesVersions` in the above example is essentially globbing for all type declarations regardless of Typescript version and what export were referencing, allowing us to quickly manage multiple exports with room to target specific versions of Typescript and more specific declarations in the future, should we need it.
