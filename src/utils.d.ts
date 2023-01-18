/** Defines all possible flags for regular expressions. */
export type RegExpFlags = "d"|"g"|"i"|"m"|"u"|"y";

/** A tool to create all possible strings that matches the defined flags */
export type RegExpFlagCombos<F extends {[key in RegExpFlags]?: boolean} = {}> = FlagCombosGenerator<{[key in RegExpFlags]: boolean} & F>;

/** returns the string keys of an object */
export type StringKeysOf<T> = Extract<keyof T,string>;

/** if condition in types */
export type If<I,T,F> = I extends true ? T : T extends false ? F : T|F;

/** returns true if flag is in the flag combo */
export type HasFlag<FlagCombo extends RegExpFlagCombos,Flag extends RegExpFlags> = IfIn<FlagCombo,Flag,true,false>;

/** returns all values of an object */
export type ValueOf<T> = T[keyof T];

/** toggle if the object has no true values */
export type NoAlwaysTrueValue<O extends {[k:string]:boolean},T> = {[k in keyof O as O[k] extends true ? k : never]:k} extends {[k:string]:never} ? T : never;

/** modified array that fixes return value from the sort function when the type is used in an intersection */
export interface IntersectedArray<T,S> extends Array<T> {
  sort(compareFn?: (a: T, b: T) => number): this & S;
  [n: number]: never; // elements are defined by the intersected array
}

/** toggle if a substring is in a string */
export type IfIn<String extends string,SubString extends string,True,False=never> = String extends `${string}${SubString}${string}` ? True : False;

/** returns all possible combinations with the given flags */
export type FlagCombosGenerator<F extends {[k:string]: boolean}> = ValueOf<{[f in StringKeysOf<F>]-?: `${true extends F[f] ? f : ""}${FlagCombosGenerator<Omit<F,f>> extends infer R ? R extends string ? R : "" : ""}` }> | NoAlwaysTrueValue<F,"">;

/** sorts the flag alphabetically */
export type SortRegExpFlags<FlagCombo extends RegExpFlagCombos> = `${IfIn<FlagCombo,"d","d","">}${IfIn<FlagCombo,"g","g","">}${IfIn<FlagCombo,"i","i","">}${IfIn<FlagCombo,"m","m","">}${IfIn<FlagCombo,"u","u","">}${IfIn<FlagCombo,"y","y","">}`;
