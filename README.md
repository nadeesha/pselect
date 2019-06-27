# pselect

Safely select arbitrarily nested nullable fields (with strong types).

```js
import { select } from "pselect";

const foo = {};

const baz = select(foo, p => p.bar.baz); // No Error!
console.log(baz); // undefined
```

## How?

pselect uses the JavaScript `Proxy` object and `Reflect`ion to safely select the nullable field. If `Proxy` support doesn't exist (ex: due to an old browser), if gracefully falls back to the less effiecient, but always available try-catch.

### Installing

```sh
npm install pselect
```

### API

#### select

`select` takes in your subject and a selector function and returns the value or `undefined`.

```ts
const select: <TObj, TResult>(
  subject: TObj,
  selector: (obj: TObj) => TResult
) => TResult;
```

Example:

```js
import { select } from "pselect";

const foo = {};

const baz = select(foo, p => p.bar.baz); // No Error!
console.log(baz); // undefined
```

#### cselect

`cselect` is the curried version of the `select` function. It lets you write nice functional code that you can pipe and chain. (See example)

```ts
const cselect: <TObj, TResult>(
  selector: (subject: TObj) => TResult
) => (subject: TObj) => TResult;
```

Examples:

```js
import { cselect } from "pselect";

const foo = {};

const getBaz = p => p.bar.baz;

console.log(getBaz(foo)); // undefined
```

```ts
import { cselect } from "pselect";

interface IPerson {
  name: string;
  identification?: {
    passport?: {
      passportNumber: "111";
    };
  };
}

const getPerson = (id: number) => {
  return people.find(...);
}

const passportNumber = pipe(
  getPerson,
  cselect(p => p.identification!.passport!.passportNumber),
  passportNumber => passportNumber || "NO_PASSPORT"
);

const fred: IPerson = {
  name: "fred"
};

passportNumber(fred); // NO_PASSPORT
```

### Prior Art

- [Optional (null-safe) in javascript](https://dev.to/pichardoj/optional-null-safe-in-javascript-1b7k) by [jpitchardo](https://twitter.com/jpitchardo)
- [facebookincubator/idx](https://github.com/facebookincubator/idx)

### Licence

MIT
