import type {
  IntersectedArray,
  RegExpFlagCombos,
  If,
  HasFlag,
  SortRegExpFlags,
} from "./utils";

type Groups = string[];
type NamedGroups = undefined | { [key: string]: string };

export type TypedRegExpMatchArray<TGroups extends Groups = Groups, TNamedGroups extends NamedGroups = NamedGroups, TInputString extends string = string> = {
    index?: number;
    input?: TInputString;
    groups: TNamedGroups;
} & ( [string,...TGroups] & IntersectedArray<string,TypedRegExpMatchArray<TGroups,TNamedGroups,TInputString>> );

export type TypedRegExpExecArray<TGroups extends Groups = Groups, TNamedGroups extends NamedGroups = NamedGroups, TInputString extends string = string> = TypedRegExpMatchArray<TGroups,TNamedGroups,TInputString> & {
    index: number;
    input: TInputString;
};

export interface TypedRegExp<
    TGroups extends Groups = Groups,
    TNamedGroups extends NamedGroups = NamedGroups,
    TFlagCombo extends RegExpFlagCombos = RegExpFlagCombos,
> extends RegExp {
    exec<TInputString extends string, TMatches extends boolean = boolean>(string: TInputString): If<TMatches,TypedRegExpExecArray<TGroups,TNamedGroups,TInputString>,null>;
    readonly dotAll: HasFlag<TFlagCombo,"d">;
    readonly global: HasFlag<TFlagCombo,"g">;
    readonly ignoreCase: HasFlag<TFlagCombo,"i">;
    readonly multiline: HasFlag<TFlagCombo,"m">;
    readonly unicode: HasFlag<TFlagCombo,"u">;
    readonly sticky: HasFlag<TFlagCombo,"y">;
    readonly flags: SortRegExpFlags<TFlagCombo>;
    // this method is restricted to return a sub type so that the type safety is kept
    compile< TNewGroups extends TGroups = TGroups, TNewNamedGroups extends TNamedGroups = TNamedGroups, NewFlagCombo extends TFlagCombo = TFlagCombo >(pattern: string, flags?: NewFlagCombo): this & TypedRegExp<TNewGroups,TNewNamedGroups,NewFlagCombo>;
    [Symbol.match]<TInputString extends string, TMatches extends boolean = boolean>(string: TInputString): If<TMatches,TypedRegExpMatchArray<TGroups,TNamedGroups,TInputString>,null>;
    [Symbol.replace](string: string, replaceValue: string): string;
    [Symbol.replace](string: string, replacer: (substring: string, ...args: [...TGroups,number,string,...(undefined extends TNamedGroups ? [] : [TNamedGroups])]) => string): string;
    [Symbol.matchAll]<TInputString extends string>(str: TInputString): IterableIterator<TypedRegExpMatchArray<TGroups,TNamedGroups,TInputString>>;
}

export declare const TypedRegExp: TypedRegExpConstructor;

type RegExpConstructor = typeof RegExp;
interface TypedRegExpConstructor extends RegExpConstructor {
    new (): TypedRegExp<[],{},"">;
    new <TGroups extends Groups, TNamedGroups extends NamedGroups>(pattern: string): TypedRegExp<TGroups,TNamedGroups,"">;
    new <TGroups extends Groups, TNamedGroups extends NamedGroups, TFlagCombo extends RegExpFlagCombos>(pattern: string, flags: TFlagCombo): TypedRegExp<TGroups,TNamedGroups,TFlagCombo>;
    new <TGroups extends Groups, TNamedGroups extends NamedGroups, TFlagCombo extends RegExpFlagCombos>(pattern: TypedRegExp<TGroups,TNamedGroups,TFlagCombo>): TypedRegExp<TGroups,TNamedGroups,TFlagCombo>;
    new <TGroups extends Groups, TNamedGroups extends NamedGroups, TFlagCombo extends RegExpFlagCombos>(pattern: TypedRegExp<TGroups,TNamedGroups>, flags: TFlagCombo): TypedRegExp<TGroups,TNamedGroups,TFlagCombo>;
    <TGroups extends Groups, TNamedGroups extends NamedGroups>(pattern: string): TypedRegExp<TGroups,TNamedGroups,"">;
    <TGroups extends Groups, TNamedGroups extends NamedGroups, TFlagCombo extends RegExpFlagCombos>(pattern: string, flags: TFlagCombo): TypedRegExp<TGroups,TNamedGroups,TFlagCombo>;
    <TGroups extends Groups, TNamedGroups extends NamedGroups, TFlagCombo extends RegExpFlagCombos>(pattern: TypedRegExp<TGroups,TNamedGroups,TFlagCombo>): TypedRegExp<TGroups,TNamedGroups,TFlagCombo>;
    <TGroups extends Groups, TNamedGroups extends NamedGroups, TFlagCombo extends RegExpFlagCombos>(pattern: TypedRegExp<TGroups,TNamedGroups>, flags: TFlagCombo): TypedRegExp<TGroups,TNamedGroups,TFlagCombo>;
    readonly prototype: TypedRegExp;
    readonly [Symbol.species]: TypedRegExpConstructor;
}

/** @experimental This class is intended to prevent overloads from the default string methods. */
export interface TypedRegExpString extends Omit<String,"match"|"matchAll"|"replace"|"replaceAll"> /* excludes the old properties to prevent overloads */ {
    // IDEA use return value from the Regexp[Symbol.match] etc. definitions
    // IDEA pass this as string to matches
    match<TGroups extends Groups, TNamedGroups extends NamedGroups, TFlagCombo extends RegExpFlagCombos = RegExpFlagCombos, TMatches extends boolean = boolean>(regexp: string | TypedRegExp<TGroups,TNamedGroups,TFlagCombo>): If<TMatches,TypedRegExpMatchArray<TGroups,TNamedGroups>,null>;
    matchAll<TGroups extends Groups, TNamedGroups extends NamedGroups, TFlagCombo extends RegExpFlagCombos<{g:true}> = RegExpFlagCombos<{g:true}>>(regexp: TypedRegExp<TGroups,TNamedGroups,TFlagCombo>): IterableIterator<TypedRegExpMatchArray<TGroups,TNamedGroups>>;
    replace<TGroups extends Groups, TNamedGroups extends NamedGroups, TFlagCombo extends RegExpFlagCombos = RegExpFlagCombos>(searchValue: string | TypedRegExp<TGroups,TNamedGroups,TFlagCombo>, replacer: (substring: string, ...args: [...TGroups,number,string,...(keyof TNamedGroups extends never ? [] : [TNamedGroups])]) => string): string;
    replaceAll<TGroups extends Groups, TNamedGroups extends NamedGroups, TFlagCombo extends RegExpFlagCombos<{g:true}> = RegExpFlagCombos<{g:true}>>(searchValue: string | TypedRegExp<TGroups,TNamedGroups,TFlagCombo>, replacer: (substring: string, ...args: [...TGroups,number,string,...(keyof TNamedGroups extends never ? [] : [TNamedGroups])]) => string): string;
}

declare global {
    interface String {
        // IDEA add a toggle to apply the modifications to the String class directly
        match<TGroups extends Groups, TNamedGroups extends NamedGroups, TFlagCombo extends RegExpFlagCombos = RegExpFlagCombos, TMatches extends boolean = boolean>(regexp: string | TypedRegExp<TGroups,TNamedGroups,TFlagCombo>): If<TMatches,TypedRegExpMatchArray<TGroups,TNamedGroups>,null>;
        matchAll<TGroups extends Groups, TNamedGroups extends NamedGroups, TFlagCombo extends RegExpFlagCombos<{g:true}> = RegExpFlagCombos<{g:true}>>(regexp: TypedRegExp<TGroups,TNamedGroups,TFlagCombo>): IterableIterator<TypedRegExpMatchArray<TGroups,TNamedGroups>>;
        replace<TGroups extends Groups, TNamedGroups extends NamedGroups, TFlagCombo extends RegExpFlagCombos = RegExpFlagCombos>(searchValue: string | TypedRegExp<TGroups,TNamedGroups,TFlagCombo>, replacer: (substring: string, ...args: [...TGroups,number,string,...(keyof TNamedGroups extends never ? [] : [TNamedGroups])]) => string): string;
        replaceAll<TGroups extends Groups, TNamedGroups extends NamedGroups, TFlagCombo extends RegExpFlagCombos<{g:true}> = RegExpFlagCombos<{g:true}>>(searchValue: string | TypedRegExp<TGroups,TNamedGroups,TFlagCombo>, replacer: (substring: string, ...args: [...TGroups,number,string,...(keyof TNamedGroups extends never ? [] : [TNamedGroups])]) => string): string;
    }
}
