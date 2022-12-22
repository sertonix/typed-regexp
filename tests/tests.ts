import type {
  TypedRegExp,
  TypedRegExpMatchArray,
  TypedRegExpExecArray,
} from "..";
import {e,t} from "./base";

declare const regexp1: TypedRegExp<["$1","$2"],{some?:"test group",other?:"more"},"gdi"|"dim">;
declare const regexp2: TypedRegExp<["2-$1","2-$2"],{}>;

t(regexp1.dotAll)<true>();
t(regexp1.global)<true|false>();
t(regexp1.ignoreCase)<true>();
t(regexp1.multiline)<true|false>();
t(regexp1.unicode)<false>();
t(regexp1.sticky)<false>();
t(regexp1.flags)<"di" | "dim" | "dgi" | "dgim">(); // TODO fix SortRegExpFlags with union type
// t(regexp1.flags)<"dgi"|"dim">();
if (regexp1.global) t(regexp1.multiline)<true|false>(); // TODO better type gate
// if (regexp1.global) t(regexp1.multiline)<false>();
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
    t(match)<TypedRegExpMatchArray<["$1","$2"],{some?:"test group",other?:"more"}>>();
  t(match[0])<string>();
  t(match[1])<"$1">();
  t(match[2])<"$2">();
  t(match[3])<undefined>();
  t(match.index)<undefined|number>();
  t(match.input)<undefined|string>();
  t( match.sort(() => 0) )<typeof match>();
  e<keyof typeof match.groups,"other"|"some">();
  // TODO fix groups property
  if (match.groups) {
    if (match.groups.some) {
      t(match.groups)<{other?:"more",some:"test group"}|{other:"more",some?:"test group"}>();
      // t(match.groups)<{other:"more"|undefined,some:"test group"}>();
    } else if (match.groups.other) {
      t(match.groups)<{other:"more"}>();
      // t(match.groups)<{other:"more",some:undefined}>();
    } else {
      // t(match.groups)<{other:undefined,some:undefined}>();
    }
  }
} else {
  t(match)<null>();
}

const exec = regexp1.exec("exec string");

t(exec)<TypedRegExpExecArray<["$1","$2"],{some?:"test group",other?:"more"},"exec string">|null>();

if (exec) {
  t(exec)<TypedRegExpExecArray<["$1","$2"],{some?:"test group",other?:"more"},"exec string">>();
  t(exec[0])<string>();
  t(exec[1])<"$1">();
  t(exec[2])<"$2">();
  t(exec[3])<undefined>();
  t(exec.index)<number>();
  t(exec.input)<"exec string">();
  t( exec.sort(() => 0) )<typeof exec>();
  e<keyof typeof exec.groups,"other"|"some">();
  // TODO fix groups property
  if (exec.groups) {
    if (exec.groups.some) {
      t(exec.groups)<{other?:"more",some:"test group"}|{other:"more",some?:"test group"}>();
      // t(exec.groups)<{other:"more"|undefined,some:"test group"}>();
    } else if (exec.groups.other) {
      t(exec.groups)<{other:"more"}>();
      // t(exec.groups)<{other:"more",some:undefined}>();
    } else {
      // t(exec.groups)<{other:undefined,some:undefined}>();
    }
  }
} else {
  t(exec)<null>();
}
