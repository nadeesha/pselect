import { proxyselect } from "./proxyselect";
import { trycatchselect } from "./trycatchselect";

const tests: Array<{ input: [any, (p: any) => any]; output: any }> = [
  { input: [{}, p => p.foo], output: undefined },
  { input: [{ foo: "bar" }, p => p.foo], output: "bar" },
  { input: [{ foo: { bar: "baz" } }, p => p.foo.bar], output: "baz" },
  { input: [{ foo: { bar: "baz" } }, p => p.foo], output: { bar: "baz" } },
  {
    input: [{ foo: { bar: ["baz0", "baz1"] } }, p => p.foo.bar[1]],
    output: "baz1"
  },
  {
    input: [{ foo: { bar: ["baz0", "baz1"] } }, p => p.foo.bar[2]],
    output: undefined
  }
];

describe("select()", () => {
  tests.forEach(({ input, output }) => {
    test(`${JSON.stringify(input[0])} with ${input[1].toString()}`, () => {
      expect(proxyselect(input[0], input[1])).toStrictEqual(output);
      expect(trycatchselect(input[0], input[1])).toStrictEqual(output);
    });
  });
});
