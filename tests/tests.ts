import type {
  TypedRegExp,
  TypedRegExpMatchArray,
  TypedRegExpExecArray,
} from "..";

// --- Tools for testings ---
type MatchType<A,B> = [A] extends [B] ? [B] extends [A] ? true : false : false;
declare const e: <A,B>( this: MatchType<A,B> extends true ? void : {expected:A,got:B} ) => void;
declare const t: <A>( a: A ) => <B>( this: MatchType<A,B> extends true ? void : {expected:B,got:A} ) => void;

// --- Ensure test system works ---
e<1,1>();
e<1|2,1|2>();
// @ts-expect-error
e<1,2>();
// @ts-expect-error
e<1,1|2>();
t(2 as const)<2>();
t(2 as 1|2)<1|2>();
// @ts-expect-error
t(2 as const)<1>();
// @ts-expect-error
t(2 as const)<1|2>();

// --- Tests ---

const match = "".match(/ / as TypedRegExp<["a"],any,"">);

t(match)<TypedRegExpMatchArray<["a"],any>|null>();

if (match) {
  t(match)<TypedRegExpMatchArray<["a"],any>>();
  t(match[0])<string>();
  t(match[1])<"a">();
  t(match[2])<undefined>();
} else {
  t(match)<null>();
}
