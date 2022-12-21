import type {
  OneNotOptional,
  IntersectedArray,
  RegExpFlagCombos,
  If,
  HasFlag,
  SortRegExpFlags,
} from "./utils";

export type TypedRegExpMatchArray<Groups extends string[] = string[], NamedGroups extends { [key: string]: string } = { [key: string]: string }, InputString extends string = string> = {
    index?: number;
    input?: InputString;
    groups: OneNotOptional<NamedGroups>;
} & ( [string,...Groups] & IntersectedArray<string,TypedRegExpMatchArray<Groups,NamedGroups,InputString>> );

export type TypedRegExpExecArray<Groups extends string[] = string[], NamedGroups extends { [key: string]: string } = { [key: string]: string }, InputString extends string = string> = TypedRegExpMatchArray<Groups,NamedGroups,InputString> & {
    index: number;
    input: InputString;
};

export interface TypedRegExp<
    Groups extends string[] = string[],
    NamedGroups extends { [key: string]: string } = { [key: string]: string },
    FlagCombo extends RegExpFlagCombos = RegExpFlagCombos,
> extends RegExp {
    // IDEA only override if existing in the RegExp interface to support more versions
    exec<InputString extends string, Matches extends boolean = boolean>(string: InputString): If<Matches,TypedRegExpExecArray<Groups,NamedGroups,InputString>,null>;
    readonly dotAll: HasFlag<FlagCombo,"d">;
    readonly global: HasFlag<FlagCombo,"g">;
    readonly ignoreCase: HasFlag<FlagCombo,"i">;
    readonly multiline: HasFlag<FlagCombo,"m">;
    readonly unicode: HasFlag<FlagCombo,"u">;
    readonly sticky: HasFlag<FlagCombo,"y">;
    readonly flags: SortRegExpFlags<FlagCombo>;
    // this method is restricted to return a sub type so that the type safety is kept
    compile< NewGroups extends Groups = Groups, NewNamedGroups extends NamedGroups = NamedGroups, NewFlagCombo extends FlagCombo = FlagCombo >(pattern: string, flags?: NewFlagCombo): this & TypedRegExp<NewGroups,NewNamedGroups,NewFlagCombo>;
    [Symbol.match]<InputString extends string, Matches extends boolean = boolean>(string: InputString): If<Matches,TypedRegExpMatchArray<Groups,NamedGroups,InputString>,null>;
    [Symbol.replace](string: string, replaceValue: string): string;
    [Symbol.replace](string: string, replacer: (substring: string, ...args: [...Groups,number,string,...(keyof NamedGroups extends never ? [] : [NamedGroups])]) => string): string;
    [Symbol.matchAll]<InputString extends string>(str: InputString): IterableIterator<TypedRegExpMatchArray<Groups,NamedGroups,InputString>>;
}

export declare const TypedRegExp: TypedRegExpConstructor;

type RegExpConstructor = typeof RegExp;
interface TypedRegExpConstructor extends RegExpConstructor {
    new (): TypedRegExp<[],{},"">;
    new <Groups extends string[], NamedGroups extends { [key: string]: string }>(pattern: string): TypedRegExp<Groups,NamedGroups,"">;
    new <Groups extends string[], NamedGroups extends { [key: string]: string }, FlagCombo extends RegExpFlagCombos>(pattern: string, flags: FlagCombo): TypedRegExp<Groups,NamedGroups,FlagCombo>;
    new <Groups extends string[], NamedGroups extends { [key: string]: string }, FlagCombo extends RegExpFlagCombos>(pattern: TypedRegExp<Groups,NamedGroups,FlagCombo>): TypedRegExp<Groups,NamedGroups,FlagCombo>;
    new <Groups extends string[], NamedGroups extends { [key: string]: string }, FlagCombo extends RegExpFlagCombos>(pattern: TypedRegExp<Groups,NamedGroups>, flags: FlagCombo): TypedRegExp<Groups,NamedGroups,FlagCombo>;
    <Groups extends string[], NamedGroups extends { [key: string]: string }>(pattern: string): TypedRegExp<Groups,NamedGroups,"">;
    <Groups extends string[], NamedGroups extends { [key: string]: string }, FlagCombo extends RegExpFlagCombos>(pattern: string, flags: FlagCombo): TypedRegExp<Groups,NamedGroups,FlagCombo>;
    <Groups extends string[], NamedGroups extends { [key: string]: string }, FlagCombo extends RegExpFlagCombos>(pattern: TypedRegExp<Groups,NamedGroups,FlagCombo>): TypedRegExp<Groups,NamedGroups,FlagCombo>;
    <Groups extends string[], NamedGroups extends { [key: string]: string }, FlagCombo extends RegExpFlagCombos>(pattern: TypedRegExp<Groups,NamedGroups>, flags: FlagCombo): TypedRegExp<Groups,NamedGroups,FlagCombo>;
    readonly prototype: TypedRegExp;
    readonly [Symbol.species]: TypedRegExpConstructor;
}

/** @experimental This class is intended to prevent overloads from the default string methods. */
export interface TypedRegExpString extends Omit<String,"match"|"matchAll"|"replace"|"replaceAll"> /* excludes the old properties to prevent overloads */ {
    // IDEA use return value from the Regexp[Symbol.match] etc. definitions
    // IDEA pass this as string to matches
    match<Groups extends string[], NamedGroups extends { [key: string]: string }, FlagCombo extends RegExpFlagCombos = RegExpFlagCombos, Matches extends boolean = boolean>(regexp: string | TypedRegExp<Groups,NamedGroups,FlagCombo>): If<Matches,TypedRegExpMatchArray<Groups,NamedGroups>,null>;
    matchAll<Groups extends string[], NamedGroups extends { [key: string]: string }, FlagCombo extends RegExpFlagCombos<{g:true}> = RegExpFlagCombos<{g:true}>>(regexp: TypedRegExp<Groups,NamedGroups,FlagCombo>): IterableIterator<TypedRegExpMatchArray<Groups,NamedGroups>>;
    replace<Groups extends string[], NamedGroups extends { [key: string]: string }, FlagCombo extends RegExpFlagCombos = RegExpFlagCombos>(searchValue: string | TypedRegExp<Groups,NamedGroups,FlagCombo>, replacer: (substring: string, ...args: [...Groups,number,string,...(keyof NamedGroups extends never ? [] : [NamedGroups])]) => string): string;
    replaceAll<Groups extends string[], NamedGroups extends { [key: string]: string }, FlagCombo extends RegExpFlagCombos<{g:true}> = RegExpFlagCombos<{g:true}>>(searchValue: string | TypedRegExp<Groups,NamedGroups,FlagCombo>, replacer: (substring: string, ...args: [...Groups,number,string,...(keyof NamedGroups extends never ? [] : [NamedGroups])]) => string): string;
}

declare global {
    interface String {
        // IDEA add a toggle to apply the modifications to the String class directly
        match<Groups extends string[], NamedGroups extends { [key: string]: string }, FlagCombo extends RegExpFlagCombos = RegExpFlagCombos, Matches extends boolean = boolean>(regexp: string | TypedRegExp<Groups,NamedGroups,FlagCombo>): If<Matches,TypedRegExpMatchArray<Groups,NamedGroups>,null>;
        matchAll<Groups extends string[], NamedGroups extends { [key: string]: string }, FlagCombo extends RegExpFlagCombos<{g:true}> = RegExpFlagCombos<{g:true}>>(regexp: TypedRegExp<Groups,NamedGroups,FlagCombo>): IterableIterator<TypedRegExpMatchArray<Groups,NamedGroups>>;
        replace<Groups extends string[], NamedGroups extends { [key: string]: string }, FlagCombo extends RegExpFlagCombos = RegExpFlagCombos>(searchValue: string | TypedRegExp<Groups,NamedGroups,FlagCombo>, replacer: (substring: string, ...args: [...Groups,number,string,...(keyof NamedGroups extends never ? [] : [NamedGroups])]) => string): string;
        replaceAll<Groups extends string[], NamedGroups extends { [key: string]: string }, FlagCombo extends RegExpFlagCombos<{g:true}> = RegExpFlagCombos<{g:true}>>(searchValue: string | TypedRegExp<Groups,NamedGroups,FlagCombo>, replacer: (substring: string, ...args: [...Groups,number,string,...(keyof NamedGroups extends never ? [] : [NamedGroups])]) => string): string;
    }
}
