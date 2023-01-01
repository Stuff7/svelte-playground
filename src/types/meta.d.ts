type WS = ' ' | '\n' | '\t';

declare type TrimLeft<S extends string, E extends string = WS> =
S extends `${WS | E}${infer Rest}` ?
  TrimLeft<Rest, E> :
S;

declare type TrimRight<S extends string, E extends string = WS> =
S extends `${infer Rest}${WS | E}` ?
  TrimRight<Rest, E> :
S;

declare type Trim<S extends string, E extends string = WS> = TrimLeft<TrimRight<S, E>, E>;

declare type ReplaceOrNever<S extends string, From extends string, To extends string> =
From extends '' ?
  S :
S extends `${infer Prefix}${From}${infer Suffix}` ?
  `${Prefix}${To}${Suffix}` :
never;

declare type Replace<S extends string, From extends string, To extends string> =
From extends '' ?
  S :
S extends `${infer Prefix}${From}${infer Suffix}` ?
  `${Prefix}${To}${Suffix}` :
S;

declare type IsNumber<S extends string | number> =
[S] extends [never] ?
  false :
Trim<S> extends `${number}` ? true : false;

declare type IsEmptyString<S extends string> =
Trim<S> extends '' ? true : false;

declare type DeepPartial<T> = T extends Record<string, unknown> ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

declare type Option<T> = T | null;
