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

const match = "".match(/ / as TypedRegExp<["$1","$2"],{some?:"test group",other?:"more"},"">);

t(match)<TypedRegExpMatchArray<["$1","$2"],{some?:"test group",other?:"more"}>|null>();

if (match) {
  t(match)<TypedRegExpMatchArray<["$1","$2"],{some?:"test group",other?:"more"}>>();
  t(match[0])<string>();
  t(match[1])<"$1">();
  t(match[2])<"$2">();
  t(match[3])<undefined>();
  if (match.groups) {
    if (match.groups.some) {
      t(match.groups.some)<"test group">();
      e<keyof typeof match.groups,"some"|"other">();
    } else {
      t(match.groups)<{other:"more"}>();
      t(match.groups.other)<"more">();
      e<typeof match.groups,{other:"more"}>();
      e<keyof typeof match.groups,"other">(); // TODO why error?
    }
  } else {
    t(match.groups)<never>();
  }
} else {
  t(match)<null>();
}
