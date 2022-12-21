import type {
  TypedRegExp,
  TypedRegExpMatchArray,
  TypedRegExpExecArray,
} from "..";

// --- Tools for testings ---
type MatchType<A,B> = [A] extends [B] ? [B] extends [A] ? true : false : false;
declare const e: <Got,Expected>( this: MatchType<Got,Expected> extends true ? void : {expected:Expected,got:Got} ) => void;
declare const t: <Got>( got: Got ) => <Expected>( this: MatchType<Got,Expected> extends true ? void : {expected:Expected,got:Got} ) => void;

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

declare const regexp1: TypedRegExp<["$1","$2"],{some?:"test group",other?:"more"},"gdi"|"dim">;
declare const regexp2: TypedRegExp<["2-$1","2-$2"],{}>;

t(regexp1.dotAll)<true>();
t(regexp1.global)<true|false>();
t(regexp1.ignoreCase)<true>();
t(regexp1.multiline)<true|false>();
t(regexp1.unicode)<false>();
t(regexp1.sticky)<false>();
t(regexp1.flags)<"dgi"|"dim">(); // BUG fix SortRegExpFlags with union type
if (regexp1.global) {
  t(regexp1.multiline)<false>(); // BUG
}
t(regexp1.compile("","gdi"))<TypedRegExp<["$1","$2"],{some?:"test group",other?:"more"},"gdi">>();
// @ts-expect-error
regexp1.compile("","u");
t(regexp1[Symbol.match]("test"))<TypedRegExpMatchArray<["$1","$2"],{some?:"test group",other?:"more"},"test">|null>();
t(regexp1[Symbol.replace]("",""))<string>();
t(regexp1[Symbol.replace]("", ( _m: string, _g1: "$1", _g2: "$2", _i: number, _s: string, _g: { some?: "test group", other?: "more" } ) => "" ))<string>();
t(regexp2[Symbol.replace]("", ( _m: string, _g1: "2-$1", _g2: "2-$2", _i: number, _s: string ) => "" ))<string>();

const match = "".match(regexp1);

t(match)<TypedRegExpMatchArray<["$1","$2"],{some?:"test group",other?:"more"}>|null>();

if (match) {
  t(match)<TypedRegExpMatchArray<["$1","$2"],{some?:"test group",other?:"more"}>>();
  t(match[0])<string>();
  t(match[1])<"$1">();
  t(match[2])<"$2">();
  t(match[3])<undefined>();
  t(match.index)<undefined|number>();
  t(match.input)<undefined|string>();
  t( match.sort(() => 0) )<typeof match>();
  // BUG remove/fix groups property
  e<keyof typeof match.groups,"other"|"some">();
  if (match.groups.some) {
    t(match.groups)<{other:"more"|undefined,some:"test group"}>();
  } else if (match.groups.other) {
    t(match.groups)<{other:"more",some:undefined}>();
  } else {
    t(match.groups)<{other:undefined,some:undefined}>();
  }
} else {
  t(match)<null>();
}
