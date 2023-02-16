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

const regexp = /(?<name>[ab])({.*)/ as TypedRegExp<[`{${string}`],{name:"a"|"b"}>;
const match = "string to match".match(regexp);
if (match) {
  const namedGroup = match.groups.name;
  // => "a"|"b"
  const group = match[1];
  // => `{${string}`
}
```

## Links

- [Codeberg](https://codeberg.org/Sertonix/typed-regexp) (main repo)
- [Github](https://github.com/Sertonix/typed-regexp) (only mirror)
- [npm](https://www.npmjs.com/package/typed-regexp)