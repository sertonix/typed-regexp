# typed-regexp
A typescript package that strongly restricts types of regular expressions.

## Examples

As direct dependency: `npm i typed-regexp`
```ts
import { TypedRegExp } from "typed-regexp";

const regexp = new TypedRegExp<[`{${string}`],{name:"a"|"b"}>("(?<name>[ab])({.*)");
const match = "string to match".match(regexp);
if (match) {
  const namedGroup = match.groups.name;
  // => "a"|"b"
  const group = match[1];
  // => `{${string}`
}
```

or as dev dependency: `npm i -D typed-regexp`
```ts
import type { TypedRegExp } from "typed-regexp";

const regexp = /(?<name>[ab])({.*)/ as TypedRegExp<[`{${name}`],{group:"a"|"b"}>;
const match = "string to match".match(regexp);
if (match) {
  const namedGroup = match.groups.name;
  // => "a"|"b"
  const group = match[1];
  // => `{${string}`
}
```
