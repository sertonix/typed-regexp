import type {TypedRegExp} from "..";

// --- Tools for testings ---
type E<A,B> = A extends B ? B extends A ? true : false : false;
declare const t: <T extends true>(t: T) => T;

// --- Ensure test system works ---
t<true>;
// @ts-expect-error
t<false>;
t<E<1,1>>;
// @ts-expect-error
t<E<1,1|2>>;

// --- Tests ---

const match = "".match(/ / as TypedRegExp<["a"],any,"">);
if (match) t<E<"a",typeof match[1]>>;
