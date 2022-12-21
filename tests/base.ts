// --- Tools for testings ---
type MatchType<A,B> = [A] extends [B] ? [B] extends [A] ? true : false : false;
export declare const e: <Got,Expected>( this: MatchType<Got,Expected> extends true ? void : {expected:Expected,got:Got} ) => void;
export declare const t: <Got>( got: Got ) => <Expected>( this: MatchType<Got,Expected> extends true ? void : {expected:Expected,got:Got} ) => void;

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
