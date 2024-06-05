import { R, S } from "./foo";

class Foo {
  public a: string[];
  public constructor() {
    const things = [...R, ...S];
    this.a = [
      ...things
        .filter((it) => it)
        .map((it) => it.name ?? it.constructor?.name ?? it.toString()),
    ];
  }
}

const foo = new Foo();
console.log(foo.a);
