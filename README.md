# typed-regexp
A typescript package that strongly restricts types of regular expressions.

## Examples

As direct dependency: `npm i typed-regexp`
```ts
import { TypedRegExp } from "typed-regexp";

const string = "string to match";
const regexp = new TypedRegExp<[`{${string}`],{group:"a"|"b"}>("(?<group>[ab])({.*)");
const match = string.match(regexp);
if (match) {
  const namedGroup = match.groups.group;
  // => "a"|"b"
  const group = match[1];
  // => `{${string}`
}
```

or as dev dependency: `npm i -D typed-regexp`
```ts
import type { TypedRegExp } from "typed-regexp";

const string = "string to match";
const regexp = /(?<group>[ab])({.*)/ as TypedRegExp<[`{${string}`],{group:"a"|"b"}>;
const match = string.match(regexp);
if (match) {
  const namedGroup = match.groups.group;
  // => "a"|"b"
  const group = match[1];
  // => `{${string}`
}
```
