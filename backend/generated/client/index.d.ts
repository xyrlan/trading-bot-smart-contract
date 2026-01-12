
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model StrategyConfig
 * 
 */
export type StrategyConfig = $Result.DefaultSelection<Prisma.$StrategyConfigPayload>
/**
 * Model TradeSignal
 * 
 */
export type TradeSignal = $Result.DefaultSelection<Prisma.$TradeSignalPayload>
/**
 * Model Trade
 * 
 */
export type Trade = $Result.DefaultSelection<Prisma.$TradePayload>
/**
 * Model CandleData
 * 
 */
export type CandleData = $Result.DefaultSelection<Prisma.$CandleDataPayload>
/**
 * Model BotConfig
 * 
 */
export type BotConfig = $Result.DefaultSelection<Prisma.$BotConfigPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more StrategyConfigs
 * const strategyConfigs = await prisma.strategyConfig.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more StrategyConfigs
   * const strategyConfigs = await prisma.strategyConfig.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.strategyConfig`: Exposes CRUD operations for the **StrategyConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StrategyConfigs
    * const strategyConfigs = await prisma.strategyConfig.findMany()
    * ```
    */
  get strategyConfig(): Prisma.StrategyConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tradeSignal`: Exposes CRUD operations for the **TradeSignal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TradeSignals
    * const tradeSignals = await prisma.tradeSignal.findMany()
    * ```
    */
  get tradeSignal(): Prisma.TradeSignalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.trade`: Exposes CRUD operations for the **Trade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Trades
    * const trades = await prisma.trade.findMany()
    * ```
    */
  get trade(): Prisma.TradeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.candleData`: Exposes CRUD operations for the **CandleData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CandleData
    * const candleData = await prisma.candleData.findMany()
    * ```
    */
  get candleData(): Prisma.CandleDataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.botConfig`: Exposes CRUD operations for the **BotConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BotConfigs
    * const botConfigs = await prisma.botConfig.findMany()
    * ```
    */
  get botConfig(): Prisma.BotConfigDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    StrategyConfig: 'StrategyConfig',
    TradeSignal: 'TradeSignal',
    Trade: 'Trade',
    CandleData: 'CandleData',
    BotConfig: 'BotConfig'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "strategyConfig" | "tradeSignal" | "trade" | "candleData" | "botConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      StrategyConfig: {
        payload: Prisma.$StrategyConfigPayload<ExtArgs>
        fields: Prisma.StrategyConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StrategyConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StrategyConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyConfigPayload>
          }
          findFirst: {
            args: Prisma.StrategyConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StrategyConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyConfigPayload>
          }
          findMany: {
            args: Prisma.StrategyConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyConfigPayload>[]
          }
          create: {
            args: Prisma.StrategyConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyConfigPayload>
          }
          createMany: {
            args: Prisma.StrategyConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StrategyConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyConfigPayload>[]
          }
          delete: {
            args: Prisma.StrategyConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyConfigPayload>
          }
          update: {
            args: Prisma.StrategyConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyConfigPayload>
          }
          deleteMany: {
            args: Prisma.StrategyConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StrategyConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StrategyConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyConfigPayload>[]
          }
          upsert: {
            args: Prisma.StrategyConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StrategyConfigPayload>
          }
          aggregate: {
            args: Prisma.StrategyConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStrategyConfig>
          }
          groupBy: {
            args: Prisma.StrategyConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<StrategyConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.StrategyConfigCountArgs<ExtArgs>
            result: $Utils.Optional<StrategyConfigCountAggregateOutputType> | number
          }
        }
      }
      TradeSignal: {
        payload: Prisma.$TradeSignalPayload<ExtArgs>
        fields: Prisma.TradeSignalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeSignalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeSignalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeSignalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeSignalPayload>
          }
          findFirst: {
            args: Prisma.TradeSignalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeSignalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeSignalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeSignalPayload>
          }
          findMany: {
            args: Prisma.TradeSignalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeSignalPayload>[]
          }
          create: {
            args: Prisma.TradeSignalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeSignalPayload>
          }
          createMany: {
            args: Prisma.TradeSignalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeSignalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeSignalPayload>[]
          }
          delete: {
            args: Prisma.TradeSignalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeSignalPayload>
          }
          update: {
            args: Prisma.TradeSignalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeSignalPayload>
          }
          deleteMany: {
            args: Prisma.TradeSignalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeSignalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TradeSignalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeSignalPayload>[]
          }
          upsert: {
            args: Prisma.TradeSignalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradeSignalPayload>
          }
          aggregate: {
            args: Prisma.TradeSignalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTradeSignal>
          }
          groupBy: {
            args: Prisma.TradeSignalGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeSignalGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeSignalCountArgs<ExtArgs>
            result: $Utils.Optional<TradeSignalCountAggregateOutputType> | number
          }
        }
      }
      Trade: {
        payload: Prisma.$TradePayload<ExtArgs>
        fields: Prisma.TradeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TradeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TradeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findFirst: {
            args: Prisma.TradeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TradeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          findMany: {
            args: Prisma.TradeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          create: {
            args: Prisma.TradeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          createMany: {
            args: Prisma.TradeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TradeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          delete: {
            args: Prisma.TradeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          update: {
            args: Prisma.TradeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          deleteMany: {
            args: Prisma.TradeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TradeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TradeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>[]
          }
          upsert: {
            args: Prisma.TradeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TradePayload>
          }
          aggregate: {
            args: Prisma.TradeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrade>
          }
          groupBy: {
            args: Prisma.TradeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TradeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TradeCountArgs<ExtArgs>
            result: $Utils.Optional<TradeCountAggregateOutputType> | number
          }
        }
      }
      CandleData: {
        payload: Prisma.$CandleDataPayload<ExtArgs>
        fields: Prisma.CandleDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CandleDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandleDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CandleDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandleDataPayload>
          }
          findFirst: {
            args: Prisma.CandleDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandleDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CandleDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandleDataPayload>
          }
          findMany: {
            args: Prisma.CandleDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandleDataPayload>[]
          }
          create: {
            args: Prisma.CandleDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandleDataPayload>
          }
          createMany: {
            args: Prisma.CandleDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CandleDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandleDataPayload>[]
          }
          delete: {
            args: Prisma.CandleDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandleDataPayload>
          }
          update: {
            args: Prisma.CandleDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandleDataPayload>
          }
          deleteMany: {
            args: Prisma.CandleDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CandleDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CandleDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandleDataPayload>[]
          }
          upsert: {
            args: Prisma.CandleDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CandleDataPayload>
          }
          aggregate: {
            args: Prisma.CandleDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCandleData>
          }
          groupBy: {
            args: Prisma.CandleDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<CandleDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.CandleDataCountArgs<ExtArgs>
            result: $Utils.Optional<CandleDataCountAggregateOutputType> | number
          }
        }
      }
      BotConfig: {
        payload: Prisma.$BotConfigPayload<ExtArgs>
        fields: Prisma.BotConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BotConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BotConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotConfigPayload>
          }
          findFirst: {
            args: Prisma.BotConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BotConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotConfigPayload>
          }
          findMany: {
            args: Prisma.BotConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotConfigPayload>[]
          }
          create: {
            args: Prisma.BotConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotConfigPayload>
          }
          createMany: {
            args: Prisma.BotConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BotConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotConfigPayload>[]
          }
          delete: {
            args: Prisma.BotConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotConfigPayload>
          }
          update: {
            args: Prisma.BotConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotConfigPayload>
          }
          deleteMany: {
            args: Prisma.BotConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BotConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BotConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotConfigPayload>[]
          }
          upsert: {
            args: Prisma.BotConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotConfigPayload>
          }
          aggregate: {
            args: Prisma.BotConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBotConfig>
          }
          groupBy: {
            args: Prisma.BotConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<BotConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.BotConfigCountArgs<ExtArgs>
            result: $Utils.Optional<BotConfigCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    strategyConfig?: StrategyConfigOmit
    tradeSignal?: TradeSignalOmit
    trade?: TradeOmit
    candleData?: CandleDataOmit
    botConfig?: BotConfigOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StrategyConfigCountOutputType
   */

  export type StrategyConfigCountOutputType = {
    signals: number
  }

  export type StrategyConfigCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    signals?: boolean | StrategyConfigCountOutputTypeCountSignalsArgs
  }

  // Custom InputTypes
  /**
   * StrategyConfigCountOutputType without action
   */
  export type StrategyConfigCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyConfigCountOutputType
     */
    select?: StrategyConfigCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StrategyConfigCountOutputType without action
   */
  export type StrategyConfigCountOutputTypeCountSignalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeSignalWhereInput
  }


  /**
   * Models
   */

  /**
   * Model StrategyConfig
   */

  export type AggregateStrategyConfig = {
    _count: StrategyConfigCountAggregateOutputType | null
    _min: StrategyConfigMinAggregateOutputType | null
    _max: StrategyConfigMaxAggregateOutputType | null
  }

  export type StrategyConfigMinAggregateOutputType = {
    id: string | null
    userId: string | null
    walletAddress: string | null
    tokenPair: string | null
    strategyType: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StrategyConfigMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    walletAddress: string | null
    tokenPair: string | null
    strategyType: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StrategyConfigCountAggregateOutputType = {
    id: number
    userId: number
    walletAddress: number
    tokenPair: number
    strategyType: number
    config: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StrategyConfigMinAggregateInputType = {
    id?: true
    userId?: true
    walletAddress?: true
    tokenPair?: true
    strategyType?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StrategyConfigMaxAggregateInputType = {
    id?: true
    userId?: true
    walletAddress?: true
    tokenPair?: true
    strategyType?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StrategyConfigCountAggregateInputType = {
    id?: true
    userId?: true
    walletAddress?: true
    tokenPair?: true
    strategyType?: true
    config?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StrategyConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StrategyConfig to aggregate.
     */
    where?: StrategyConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StrategyConfigs to fetch.
     */
    orderBy?: StrategyConfigOrderByWithRelationInput | StrategyConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StrategyConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StrategyConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StrategyConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StrategyConfigs
    **/
    _count?: true | StrategyConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StrategyConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StrategyConfigMaxAggregateInputType
  }

  export type GetStrategyConfigAggregateType<T extends StrategyConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateStrategyConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStrategyConfig[P]>
      : GetScalarType<T[P], AggregateStrategyConfig[P]>
  }




  export type StrategyConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StrategyConfigWhereInput
    orderBy?: StrategyConfigOrderByWithAggregationInput | StrategyConfigOrderByWithAggregationInput[]
    by: StrategyConfigScalarFieldEnum[] | StrategyConfigScalarFieldEnum
    having?: StrategyConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StrategyConfigCountAggregateInputType | true
    _min?: StrategyConfigMinAggregateInputType
    _max?: StrategyConfigMaxAggregateInputType
  }

  export type StrategyConfigGroupByOutputType = {
    id: string
    userId: string
    walletAddress: string
    tokenPair: string
    strategyType: string
    config: JsonValue
    status: string
    createdAt: Date
    updatedAt: Date
    _count: StrategyConfigCountAggregateOutputType | null
    _min: StrategyConfigMinAggregateOutputType | null
    _max: StrategyConfigMaxAggregateOutputType | null
  }

  type GetStrategyConfigGroupByPayload<T extends StrategyConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StrategyConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StrategyConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StrategyConfigGroupByOutputType[P]>
            : GetScalarType<T[P], StrategyConfigGroupByOutputType[P]>
        }
      >
    >


  export type StrategyConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    walletAddress?: boolean
    tokenPair?: boolean
    strategyType?: boolean
    config?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    signals?: boolean | StrategyConfig$signalsArgs<ExtArgs>
    _count?: boolean | StrategyConfigCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["strategyConfig"]>

  export type StrategyConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    walletAddress?: boolean
    tokenPair?: boolean
    strategyType?: boolean
    config?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["strategyConfig"]>

  export type StrategyConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    walletAddress?: boolean
    tokenPair?: boolean
    strategyType?: boolean
    config?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["strategyConfig"]>

  export type StrategyConfigSelectScalar = {
    id?: boolean
    userId?: boolean
    walletAddress?: boolean
    tokenPair?: boolean
    strategyType?: boolean
    config?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StrategyConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "walletAddress" | "tokenPair" | "strategyType" | "config" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["strategyConfig"]>
  export type StrategyConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    signals?: boolean | StrategyConfig$signalsArgs<ExtArgs>
    _count?: boolean | StrategyConfigCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StrategyConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StrategyConfigIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StrategyConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StrategyConfig"
    objects: {
      signals: Prisma.$TradeSignalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      walletAddress: string
      tokenPair: string
      strategyType: string
      config: Prisma.JsonValue
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["strategyConfig"]>
    composites: {}
  }

  type StrategyConfigGetPayload<S extends boolean | null | undefined | StrategyConfigDefaultArgs> = $Result.GetResult<Prisma.$StrategyConfigPayload, S>

  type StrategyConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StrategyConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StrategyConfigCountAggregateInputType | true
    }

  export interface StrategyConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StrategyConfig'], meta: { name: 'StrategyConfig' } }
    /**
     * Find zero or one StrategyConfig that matches the filter.
     * @param {StrategyConfigFindUniqueArgs} args - Arguments to find a StrategyConfig
     * @example
     * // Get one StrategyConfig
     * const strategyConfig = await prisma.strategyConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StrategyConfigFindUniqueArgs>(args: SelectSubset<T, StrategyConfigFindUniqueArgs<ExtArgs>>): Prisma__StrategyConfigClient<$Result.GetResult<Prisma.$StrategyConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StrategyConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StrategyConfigFindUniqueOrThrowArgs} args - Arguments to find a StrategyConfig
     * @example
     * // Get one StrategyConfig
     * const strategyConfig = await prisma.strategyConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StrategyConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, StrategyConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StrategyConfigClient<$Result.GetResult<Prisma.$StrategyConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StrategyConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyConfigFindFirstArgs} args - Arguments to find a StrategyConfig
     * @example
     * // Get one StrategyConfig
     * const strategyConfig = await prisma.strategyConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StrategyConfigFindFirstArgs>(args?: SelectSubset<T, StrategyConfigFindFirstArgs<ExtArgs>>): Prisma__StrategyConfigClient<$Result.GetResult<Prisma.$StrategyConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StrategyConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyConfigFindFirstOrThrowArgs} args - Arguments to find a StrategyConfig
     * @example
     * // Get one StrategyConfig
     * const strategyConfig = await prisma.strategyConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StrategyConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, StrategyConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__StrategyConfigClient<$Result.GetResult<Prisma.$StrategyConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StrategyConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StrategyConfigs
     * const strategyConfigs = await prisma.strategyConfig.findMany()
     * 
     * // Get first 10 StrategyConfigs
     * const strategyConfigs = await prisma.strategyConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const strategyConfigWithIdOnly = await prisma.strategyConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StrategyConfigFindManyArgs>(args?: SelectSubset<T, StrategyConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StrategyConfig.
     * @param {StrategyConfigCreateArgs} args - Arguments to create a StrategyConfig.
     * @example
     * // Create one StrategyConfig
     * const StrategyConfig = await prisma.strategyConfig.create({
     *   data: {
     *     // ... data to create a StrategyConfig
     *   }
     * })
     * 
     */
    create<T extends StrategyConfigCreateArgs>(args: SelectSubset<T, StrategyConfigCreateArgs<ExtArgs>>): Prisma__StrategyConfigClient<$Result.GetResult<Prisma.$StrategyConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StrategyConfigs.
     * @param {StrategyConfigCreateManyArgs} args - Arguments to create many StrategyConfigs.
     * @example
     * // Create many StrategyConfigs
     * const strategyConfig = await prisma.strategyConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StrategyConfigCreateManyArgs>(args?: SelectSubset<T, StrategyConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StrategyConfigs and returns the data saved in the database.
     * @param {StrategyConfigCreateManyAndReturnArgs} args - Arguments to create many StrategyConfigs.
     * @example
     * // Create many StrategyConfigs
     * const strategyConfig = await prisma.strategyConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StrategyConfigs and only return the `id`
     * const strategyConfigWithIdOnly = await prisma.strategyConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StrategyConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, StrategyConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StrategyConfig.
     * @param {StrategyConfigDeleteArgs} args - Arguments to delete one StrategyConfig.
     * @example
     * // Delete one StrategyConfig
     * const StrategyConfig = await prisma.strategyConfig.delete({
     *   where: {
     *     // ... filter to delete one StrategyConfig
     *   }
     * })
     * 
     */
    delete<T extends StrategyConfigDeleteArgs>(args: SelectSubset<T, StrategyConfigDeleteArgs<ExtArgs>>): Prisma__StrategyConfigClient<$Result.GetResult<Prisma.$StrategyConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StrategyConfig.
     * @param {StrategyConfigUpdateArgs} args - Arguments to update one StrategyConfig.
     * @example
     * // Update one StrategyConfig
     * const strategyConfig = await prisma.strategyConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StrategyConfigUpdateArgs>(args: SelectSubset<T, StrategyConfigUpdateArgs<ExtArgs>>): Prisma__StrategyConfigClient<$Result.GetResult<Prisma.$StrategyConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StrategyConfigs.
     * @param {StrategyConfigDeleteManyArgs} args - Arguments to filter StrategyConfigs to delete.
     * @example
     * // Delete a few StrategyConfigs
     * const { count } = await prisma.strategyConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StrategyConfigDeleteManyArgs>(args?: SelectSubset<T, StrategyConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StrategyConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StrategyConfigs
     * const strategyConfig = await prisma.strategyConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StrategyConfigUpdateManyArgs>(args: SelectSubset<T, StrategyConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StrategyConfigs and returns the data updated in the database.
     * @param {StrategyConfigUpdateManyAndReturnArgs} args - Arguments to update many StrategyConfigs.
     * @example
     * // Update many StrategyConfigs
     * const strategyConfig = await prisma.strategyConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StrategyConfigs and only return the `id`
     * const strategyConfigWithIdOnly = await prisma.strategyConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StrategyConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, StrategyConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StrategyConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StrategyConfig.
     * @param {StrategyConfigUpsertArgs} args - Arguments to update or create a StrategyConfig.
     * @example
     * // Update or create a StrategyConfig
     * const strategyConfig = await prisma.strategyConfig.upsert({
     *   create: {
     *     // ... data to create a StrategyConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StrategyConfig we want to update
     *   }
     * })
     */
    upsert<T extends StrategyConfigUpsertArgs>(args: SelectSubset<T, StrategyConfigUpsertArgs<ExtArgs>>): Prisma__StrategyConfigClient<$Result.GetResult<Prisma.$StrategyConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StrategyConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyConfigCountArgs} args - Arguments to filter StrategyConfigs to count.
     * @example
     * // Count the number of StrategyConfigs
     * const count = await prisma.strategyConfig.count({
     *   where: {
     *     // ... the filter for the StrategyConfigs we want to count
     *   }
     * })
    **/
    count<T extends StrategyConfigCountArgs>(
      args?: Subset<T, StrategyConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StrategyConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StrategyConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StrategyConfigAggregateArgs>(args: Subset<T, StrategyConfigAggregateArgs>): Prisma.PrismaPromise<GetStrategyConfigAggregateType<T>>

    /**
     * Group by StrategyConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StrategyConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StrategyConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StrategyConfigGroupByArgs['orderBy'] }
        : { orderBy?: StrategyConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StrategyConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStrategyConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StrategyConfig model
   */
  readonly fields: StrategyConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StrategyConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StrategyConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    signals<T extends StrategyConfig$signalsArgs<ExtArgs> = {}>(args?: Subset<T, StrategyConfig$signalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeSignalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StrategyConfig model
   */
  interface StrategyConfigFieldRefs {
    readonly id: FieldRef<"StrategyConfig", 'String'>
    readonly userId: FieldRef<"StrategyConfig", 'String'>
    readonly walletAddress: FieldRef<"StrategyConfig", 'String'>
    readonly tokenPair: FieldRef<"StrategyConfig", 'String'>
    readonly strategyType: FieldRef<"StrategyConfig", 'String'>
    readonly config: FieldRef<"StrategyConfig", 'Json'>
    readonly status: FieldRef<"StrategyConfig", 'String'>
    readonly createdAt: FieldRef<"StrategyConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"StrategyConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StrategyConfig findUnique
   */
  export type StrategyConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyConfig
     */
    select?: StrategyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyConfig
     */
    omit?: StrategyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyConfigInclude<ExtArgs> | null
    /**
     * Filter, which StrategyConfig to fetch.
     */
    where: StrategyConfigWhereUniqueInput
  }

  /**
   * StrategyConfig findUniqueOrThrow
   */
  export type StrategyConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyConfig
     */
    select?: StrategyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyConfig
     */
    omit?: StrategyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyConfigInclude<ExtArgs> | null
    /**
     * Filter, which StrategyConfig to fetch.
     */
    where: StrategyConfigWhereUniqueInput
  }

  /**
   * StrategyConfig findFirst
   */
  export type StrategyConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyConfig
     */
    select?: StrategyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyConfig
     */
    omit?: StrategyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyConfigInclude<ExtArgs> | null
    /**
     * Filter, which StrategyConfig to fetch.
     */
    where?: StrategyConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StrategyConfigs to fetch.
     */
    orderBy?: StrategyConfigOrderByWithRelationInput | StrategyConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StrategyConfigs.
     */
    cursor?: StrategyConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StrategyConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StrategyConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StrategyConfigs.
     */
    distinct?: StrategyConfigScalarFieldEnum | StrategyConfigScalarFieldEnum[]
  }

  /**
   * StrategyConfig findFirstOrThrow
   */
  export type StrategyConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyConfig
     */
    select?: StrategyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyConfig
     */
    omit?: StrategyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyConfigInclude<ExtArgs> | null
    /**
     * Filter, which StrategyConfig to fetch.
     */
    where?: StrategyConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StrategyConfigs to fetch.
     */
    orderBy?: StrategyConfigOrderByWithRelationInput | StrategyConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StrategyConfigs.
     */
    cursor?: StrategyConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StrategyConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StrategyConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StrategyConfigs.
     */
    distinct?: StrategyConfigScalarFieldEnum | StrategyConfigScalarFieldEnum[]
  }

  /**
   * StrategyConfig findMany
   */
  export type StrategyConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyConfig
     */
    select?: StrategyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyConfig
     */
    omit?: StrategyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyConfigInclude<ExtArgs> | null
    /**
     * Filter, which StrategyConfigs to fetch.
     */
    where?: StrategyConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StrategyConfigs to fetch.
     */
    orderBy?: StrategyConfigOrderByWithRelationInput | StrategyConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StrategyConfigs.
     */
    cursor?: StrategyConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StrategyConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StrategyConfigs.
     */
    skip?: number
    distinct?: StrategyConfigScalarFieldEnum | StrategyConfigScalarFieldEnum[]
  }

  /**
   * StrategyConfig create
   */
  export type StrategyConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyConfig
     */
    select?: StrategyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyConfig
     */
    omit?: StrategyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a StrategyConfig.
     */
    data: XOR<StrategyConfigCreateInput, StrategyConfigUncheckedCreateInput>
  }

  /**
   * StrategyConfig createMany
   */
  export type StrategyConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StrategyConfigs.
     */
    data: StrategyConfigCreateManyInput | StrategyConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StrategyConfig createManyAndReturn
   */
  export type StrategyConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyConfig
     */
    select?: StrategyConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyConfig
     */
    omit?: StrategyConfigOmit<ExtArgs> | null
    /**
     * The data used to create many StrategyConfigs.
     */
    data: StrategyConfigCreateManyInput | StrategyConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StrategyConfig update
   */
  export type StrategyConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyConfig
     */
    select?: StrategyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyConfig
     */
    omit?: StrategyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a StrategyConfig.
     */
    data: XOR<StrategyConfigUpdateInput, StrategyConfigUncheckedUpdateInput>
    /**
     * Choose, which StrategyConfig to update.
     */
    where: StrategyConfigWhereUniqueInput
  }

  /**
   * StrategyConfig updateMany
   */
  export type StrategyConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StrategyConfigs.
     */
    data: XOR<StrategyConfigUpdateManyMutationInput, StrategyConfigUncheckedUpdateManyInput>
    /**
     * Filter which StrategyConfigs to update
     */
    where?: StrategyConfigWhereInput
    /**
     * Limit how many StrategyConfigs to update.
     */
    limit?: number
  }

  /**
   * StrategyConfig updateManyAndReturn
   */
  export type StrategyConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyConfig
     */
    select?: StrategyConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyConfig
     */
    omit?: StrategyConfigOmit<ExtArgs> | null
    /**
     * The data used to update StrategyConfigs.
     */
    data: XOR<StrategyConfigUpdateManyMutationInput, StrategyConfigUncheckedUpdateManyInput>
    /**
     * Filter which StrategyConfigs to update
     */
    where?: StrategyConfigWhereInput
    /**
     * Limit how many StrategyConfigs to update.
     */
    limit?: number
  }

  /**
   * StrategyConfig upsert
   */
  export type StrategyConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyConfig
     */
    select?: StrategyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyConfig
     */
    omit?: StrategyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the StrategyConfig to update in case it exists.
     */
    where: StrategyConfigWhereUniqueInput
    /**
     * In case the StrategyConfig found by the `where` argument doesn't exist, create a new StrategyConfig with this data.
     */
    create: XOR<StrategyConfigCreateInput, StrategyConfigUncheckedCreateInput>
    /**
     * In case the StrategyConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StrategyConfigUpdateInput, StrategyConfigUncheckedUpdateInput>
  }

  /**
   * StrategyConfig delete
   */
  export type StrategyConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyConfig
     */
    select?: StrategyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyConfig
     */
    omit?: StrategyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyConfigInclude<ExtArgs> | null
    /**
     * Filter which StrategyConfig to delete.
     */
    where: StrategyConfigWhereUniqueInput
  }

  /**
   * StrategyConfig deleteMany
   */
  export type StrategyConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StrategyConfigs to delete
     */
    where?: StrategyConfigWhereInput
    /**
     * Limit how many StrategyConfigs to delete.
     */
    limit?: number
  }

  /**
   * StrategyConfig.signals
   */
  export type StrategyConfig$signalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeSignal
     */
    select?: TradeSignalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeSignal
     */
    omit?: TradeSignalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeSignalInclude<ExtArgs> | null
    where?: TradeSignalWhereInput
    orderBy?: TradeSignalOrderByWithRelationInput | TradeSignalOrderByWithRelationInput[]
    cursor?: TradeSignalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TradeSignalScalarFieldEnum | TradeSignalScalarFieldEnum[]
  }

  /**
   * StrategyConfig without action
   */
  export type StrategyConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StrategyConfig
     */
    select?: StrategyConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StrategyConfig
     */
    omit?: StrategyConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StrategyConfigInclude<ExtArgs> | null
  }


  /**
   * Model TradeSignal
   */

  export type AggregateTradeSignal = {
    _count: TradeSignalCountAggregateOutputType | null
    _avg: TradeSignalAvgAggregateOutputType | null
    _sum: TradeSignalSumAggregateOutputType | null
    _min: TradeSignalMinAggregateOutputType | null
    _max: TradeSignalMaxAggregateOutputType | null
  }

  export type TradeSignalAvgAggregateOutputType = {
    price: number | null
    confidence: number | null
    amountIn: number | null
    amountOut: number | null
    slippage: number | null
  }

  export type TradeSignalSumAggregateOutputType = {
    price: number | null
    confidence: number | null
    amountIn: number | null
    amountOut: number | null
    slippage: number | null
  }

  export type TradeSignalMinAggregateOutputType = {
    id: string | null
    strategyId: string | null
    signal: string | null
    price: number | null
    confidence: number | null
    reason: string | null
    executed: boolean | null
    txSignature: string | null
    executedAt: Date | null
    amountIn: number | null
    amountOut: number | null
    slippage: number | null
    createdAt: Date | null
  }

  export type TradeSignalMaxAggregateOutputType = {
    id: string | null
    strategyId: string | null
    signal: string | null
    price: number | null
    confidence: number | null
    reason: string | null
    executed: boolean | null
    txSignature: string | null
    executedAt: Date | null
    amountIn: number | null
    amountOut: number | null
    slippage: number | null
    createdAt: Date | null
  }

  export type TradeSignalCountAggregateOutputType = {
    id: number
    strategyId: number
    signal: number
    price: number
    confidence: number
    indicators: number
    reason: number
    executed: number
    txSignature: number
    executedAt: number
    amountIn: number
    amountOut: number
    slippage: number
    createdAt: number
    _all: number
  }


  export type TradeSignalAvgAggregateInputType = {
    price?: true
    confidence?: true
    amountIn?: true
    amountOut?: true
    slippage?: true
  }

  export type TradeSignalSumAggregateInputType = {
    price?: true
    confidence?: true
    amountIn?: true
    amountOut?: true
    slippage?: true
  }

  export type TradeSignalMinAggregateInputType = {
    id?: true
    strategyId?: true
    signal?: true
    price?: true
    confidence?: true
    reason?: true
    executed?: true
    txSignature?: true
    executedAt?: true
    amountIn?: true
    amountOut?: true
    slippage?: true
    createdAt?: true
  }

  export type TradeSignalMaxAggregateInputType = {
    id?: true
    strategyId?: true
    signal?: true
    price?: true
    confidence?: true
    reason?: true
    executed?: true
    txSignature?: true
    executedAt?: true
    amountIn?: true
    amountOut?: true
    slippage?: true
    createdAt?: true
  }

  export type TradeSignalCountAggregateInputType = {
    id?: true
    strategyId?: true
    signal?: true
    price?: true
    confidence?: true
    indicators?: true
    reason?: true
    executed?: true
    txSignature?: true
    executedAt?: true
    amountIn?: true
    amountOut?: true
    slippage?: true
    createdAt?: true
    _all?: true
  }

  export type TradeSignalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradeSignal to aggregate.
     */
    where?: TradeSignalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeSignals to fetch.
     */
    orderBy?: TradeSignalOrderByWithRelationInput | TradeSignalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeSignalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeSignals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeSignals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TradeSignals
    **/
    _count?: true | TradeSignalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TradeSignalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TradeSignalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeSignalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeSignalMaxAggregateInputType
  }

  export type GetTradeSignalAggregateType<T extends TradeSignalAggregateArgs> = {
        [P in keyof T & keyof AggregateTradeSignal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTradeSignal[P]>
      : GetScalarType<T[P], AggregateTradeSignal[P]>
  }




  export type TradeSignalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeSignalWhereInput
    orderBy?: TradeSignalOrderByWithAggregationInput | TradeSignalOrderByWithAggregationInput[]
    by: TradeSignalScalarFieldEnum[] | TradeSignalScalarFieldEnum
    having?: TradeSignalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeSignalCountAggregateInputType | true
    _avg?: TradeSignalAvgAggregateInputType
    _sum?: TradeSignalSumAggregateInputType
    _min?: TradeSignalMinAggregateInputType
    _max?: TradeSignalMaxAggregateInputType
  }

  export type TradeSignalGroupByOutputType = {
    id: string
    strategyId: string
    signal: string
    price: number
    confidence: number
    indicators: JsonValue
    reason: string
    executed: boolean
    txSignature: string | null
    executedAt: Date | null
    amountIn: number | null
    amountOut: number | null
    slippage: number | null
    createdAt: Date
    _count: TradeSignalCountAggregateOutputType | null
    _avg: TradeSignalAvgAggregateOutputType | null
    _sum: TradeSignalSumAggregateOutputType | null
    _min: TradeSignalMinAggregateOutputType | null
    _max: TradeSignalMaxAggregateOutputType | null
  }

  type GetTradeSignalGroupByPayload<T extends TradeSignalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeSignalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeSignalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeSignalGroupByOutputType[P]>
            : GetScalarType<T[P], TradeSignalGroupByOutputType[P]>
        }
      >
    >


  export type TradeSignalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    strategyId?: boolean
    signal?: boolean
    price?: boolean
    confidence?: boolean
    indicators?: boolean
    reason?: boolean
    executed?: boolean
    txSignature?: boolean
    executedAt?: boolean
    amountIn?: boolean
    amountOut?: boolean
    slippage?: boolean
    createdAt?: boolean
    strategy?: boolean | StrategyConfigDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradeSignal"]>

  export type TradeSignalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    strategyId?: boolean
    signal?: boolean
    price?: boolean
    confidence?: boolean
    indicators?: boolean
    reason?: boolean
    executed?: boolean
    txSignature?: boolean
    executedAt?: boolean
    amountIn?: boolean
    amountOut?: boolean
    slippage?: boolean
    createdAt?: boolean
    strategy?: boolean | StrategyConfigDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradeSignal"]>

  export type TradeSignalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    strategyId?: boolean
    signal?: boolean
    price?: boolean
    confidence?: boolean
    indicators?: boolean
    reason?: boolean
    executed?: boolean
    txSignature?: boolean
    executedAt?: boolean
    amountIn?: boolean
    amountOut?: boolean
    slippage?: boolean
    createdAt?: boolean
    strategy?: boolean | StrategyConfigDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tradeSignal"]>

  export type TradeSignalSelectScalar = {
    id?: boolean
    strategyId?: boolean
    signal?: boolean
    price?: boolean
    confidence?: boolean
    indicators?: boolean
    reason?: boolean
    executed?: boolean
    txSignature?: boolean
    executedAt?: boolean
    amountIn?: boolean
    amountOut?: boolean
    slippage?: boolean
    createdAt?: boolean
  }

  export type TradeSignalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "strategyId" | "signal" | "price" | "confidence" | "indicators" | "reason" | "executed" | "txSignature" | "executedAt" | "amountIn" | "amountOut" | "slippage" | "createdAt", ExtArgs["result"]["tradeSignal"]>
  export type TradeSignalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    strategy?: boolean | StrategyConfigDefaultArgs<ExtArgs>
  }
  export type TradeSignalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    strategy?: boolean | StrategyConfigDefaultArgs<ExtArgs>
  }
  export type TradeSignalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    strategy?: boolean | StrategyConfigDefaultArgs<ExtArgs>
  }

  export type $TradeSignalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TradeSignal"
    objects: {
      strategy: Prisma.$StrategyConfigPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      strategyId: string
      signal: string
      price: number
      confidence: number
      indicators: Prisma.JsonValue
      reason: string
      executed: boolean
      txSignature: string | null
      executedAt: Date | null
      amountIn: number | null
      amountOut: number | null
      slippage: number | null
      createdAt: Date
    }, ExtArgs["result"]["tradeSignal"]>
    composites: {}
  }

  type TradeSignalGetPayload<S extends boolean | null | undefined | TradeSignalDefaultArgs> = $Result.GetResult<Prisma.$TradeSignalPayload, S>

  type TradeSignalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TradeSignalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TradeSignalCountAggregateInputType | true
    }

  export interface TradeSignalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TradeSignal'], meta: { name: 'TradeSignal' } }
    /**
     * Find zero or one TradeSignal that matches the filter.
     * @param {TradeSignalFindUniqueArgs} args - Arguments to find a TradeSignal
     * @example
     * // Get one TradeSignal
     * const tradeSignal = await prisma.tradeSignal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeSignalFindUniqueArgs>(args: SelectSubset<T, TradeSignalFindUniqueArgs<ExtArgs>>): Prisma__TradeSignalClient<$Result.GetResult<Prisma.$TradeSignalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TradeSignal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TradeSignalFindUniqueOrThrowArgs} args - Arguments to find a TradeSignal
     * @example
     * // Get one TradeSignal
     * const tradeSignal = await prisma.tradeSignal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeSignalFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeSignalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeSignalClient<$Result.GetResult<Prisma.$TradeSignalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TradeSignal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeSignalFindFirstArgs} args - Arguments to find a TradeSignal
     * @example
     * // Get one TradeSignal
     * const tradeSignal = await prisma.tradeSignal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeSignalFindFirstArgs>(args?: SelectSubset<T, TradeSignalFindFirstArgs<ExtArgs>>): Prisma__TradeSignalClient<$Result.GetResult<Prisma.$TradeSignalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TradeSignal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeSignalFindFirstOrThrowArgs} args - Arguments to find a TradeSignal
     * @example
     * // Get one TradeSignal
     * const tradeSignal = await prisma.tradeSignal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeSignalFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeSignalFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeSignalClient<$Result.GetResult<Prisma.$TradeSignalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TradeSignals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeSignalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TradeSignals
     * const tradeSignals = await prisma.tradeSignal.findMany()
     * 
     * // Get first 10 TradeSignals
     * const tradeSignals = await prisma.tradeSignal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeSignalWithIdOnly = await prisma.tradeSignal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeSignalFindManyArgs>(args?: SelectSubset<T, TradeSignalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeSignalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TradeSignal.
     * @param {TradeSignalCreateArgs} args - Arguments to create a TradeSignal.
     * @example
     * // Create one TradeSignal
     * const TradeSignal = await prisma.tradeSignal.create({
     *   data: {
     *     // ... data to create a TradeSignal
     *   }
     * })
     * 
     */
    create<T extends TradeSignalCreateArgs>(args: SelectSubset<T, TradeSignalCreateArgs<ExtArgs>>): Prisma__TradeSignalClient<$Result.GetResult<Prisma.$TradeSignalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TradeSignals.
     * @param {TradeSignalCreateManyArgs} args - Arguments to create many TradeSignals.
     * @example
     * // Create many TradeSignals
     * const tradeSignal = await prisma.tradeSignal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeSignalCreateManyArgs>(args?: SelectSubset<T, TradeSignalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TradeSignals and returns the data saved in the database.
     * @param {TradeSignalCreateManyAndReturnArgs} args - Arguments to create many TradeSignals.
     * @example
     * // Create many TradeSignals
     * const tradeSignal = await prisma.tradeSignal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TradeSignals and only return the `id`
     * const tradeSignalWithIdOnly = await prisma.tradeSignal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeSignalCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeSignalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeSignalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TradeSignal.
     * @param {TradeSignalDeleteArgs} args - Arguments to delete one TradeSignal.
     * @example
     * // Delete one TradeSignal
     * const TradeSignal = await prisma.tradeSignal.delete({
     *   where: {
     *     // ... filter to delete one TradeSignal
     *   }
     * })
     * 
     */
    delete<T extends TradeSignalDeleteArgs>(args: SelectSubset<T, TradeSignalDeleteArgs<ExtArgs>>): Prisma__TradeSignalClient<$Result.GetResult<Prisma.$TradeSignalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TradeSignal.
     * @param {TradeSignalUpdateArgs} args - Arguments to update one TradeSignal.
     * @example
     * // Update one TradeSignal
     * const tradeSignal = await prisma.tradeSignal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeSignalUpdateArgs>(args: SelectSubset<T, TradeSignalUpdateArgs<ExtArgs>>): Prisma__TradeSignalClient<$Result.GetResult<Prisma.$TradeSignalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TradeSignals.
     * @param {TradeSignalDeleteManyArgs} args - Arguments to filter TradeSignals to delete.
     * @example
     * // Delete a few TradeSignals
     * const { count } = await prisma.tradeSignal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeSignalDeleteManyArgs>(args?: SelectSubset<T, TradeSignalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradeSignals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeSignalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TradeSignals
     * const tradeSignal = await prisma.tradeSignal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeSignalUpdateManyArgs>(args: SelectSubset<T, TradeSignalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TradeSignals and returns the data updated in the database.
     * @param {TradeSignalUpdateManyAndReturnArgs} args - Arguments to update many TradeSignals.
     * @example
     * // Update many TradeSignals
     * const tradeSignal = await prisma.tradeSignal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TradeSignals and only return the `id`
     * const tradeSignalWithIdOnly = await prisma.tradeSignal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TradeSignalUpdateManyAndReturnArgs>(args: SelectSubset<T, TradeSignalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradeSignalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TradeSignal.
     * @param {TradeSignalUpsertArgs} args - Arguments to update or create a TradeSignal.
     * @example
     * // Update or create a TradeSignal
     * const tradeSignal = await prisma.tradeSignal.upsert({
     *   create: {
     *     // ... data to create a TradeSignal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TradeSignal we want to update
     *   }
     * })
     */
    upsert<T extends TradeSignalUpsertArgs>(args: SelectSubset<T, TradeSignalUpsertArgs<ExtArgs>>): Prisma__TradeSignalClient<$Result.GetResult<Prisma.$TradeSignalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TradeSignals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeSignalCountArgs} args - Arguments to filter TradeSignals to count.
     * @example
     * // Count the number of TradeSignals
     * const count = await prisma.tradeSignal.count({
     *   where: {
     *     // ... the filter for the TradeSignals we want to count
     *   }
     * })
    **/
    count<T extends TradeSignalCountArgs>(
      args?: Subset<T, TradeSignalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeSignalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TradeSignal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeSignalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TradeSignalAggregateArgs>(args: Subset<T, TradeSignalAggregateArgs>): Prisma.PrismaPromise<GetTradeSignalAggregateType<T>>

    /**
     * Group by TradeSignal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeSignalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TradeSignalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeSignalGroupByArgs['orderBy'] }
        : { orderBy?: TradeSignalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TradeSignalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeSignalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TradeSignal model
   */
  readonly fields: TradeSignalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TradeSignal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeSignalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    strategy<T extends StrategyConfigDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StrategyConfigDefaultArgs<ExtArgs>>): Prisma__StrategyConfigClient<$Result.GetResult<Prisma.$StrategyConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TradeSignal model
   */
  interface TradeSignalFieldRefs {
    readonly id: FieldRef<"TradeSignal", 'String'>
    readonly strategyId: FieldRef<"TradeSignal", 'String'>
    readonly signal: FieldRef<"TradeSignal", 'String'>
    readonly price: FieldRef<"TradeSignal", 'Float'>
    readonly confidence: FieldRef<"TradeSignal", 'Float'>
    readonly indicators: FieldRef<"TradeSignal", 'Json'>
    readonly reason: FieldRef<"TradeSignal", 'String'>
    readonly executed: FieldRef<"TradeSignal", 'Boolean'>
    readonly txSignature: FieldRef<"TradeSignal", 'String'>
    readonly executedAt: FieldRef<"TradeSignal", 'DateTime'>
    readonly amountIn: FieldRef<"TradeSignal", 'Float'>
    readonly amountOut: FieldRef<"TradeSignal", 'Float'>
    readonly slippage: FieldRef<"TradeSignal", 'Float'>
    readonly createdAt: FieldRef<"TradeSignal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TradeSignal findUnique
   */
  export type TradeSignalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeSignal
     */
    select?: TradeSignalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeSignal
     */
    omit?: TradeSignalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeSignalInclude<ExtArgs> | null
    /**
     * Filter, which TradeSignal to fetch.
     */
    where: TradeSignalWhereUniqueInput
  }

  /**
   * TradeSignal findUniqueOrThrow
   */
  export type TradeSignalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeSignal
     */
    select?: TradeSignalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeSignal
     */
    omit?: TradeSignalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeSignalInclude<ExtArgs> | null
    /**
     * Filter, which TradeSignal to fetch.
     */
    where: TradeSignalWhereUniqueInput
  }

  /**
   * TradeSignal findFirst
   */
  export type TradeSignalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeSignal
     */
    select?: TradeSignalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeSignal
     */
    omit?: TradeSignalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeSignalInclude<ExtArgs> | null
    /**
     * Filter, which TradeSignal to fetch.
     */
    where?: TradeSignalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeSignals to fetch.
     */
    orderBy?: TradeSignalOrderByWithRelationInput | TradeSignalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradeSignals.
     */
    cursor?: TradeSignalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeSignals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeSignals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradeSignals.
     */
    distinct?: TradeSignalScalarFieldEnum | TradeSignalScalarFieldEnum[]
  }

  /**
   * TradeSignal findFirstOrThrow
   */
  export type TradeSignalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeSignal
     */
    select?: TradeSignalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeSignal
     */
    omit?: TradeSignalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeSignalInclude<ExtArgs> | null
    /**
     * Filter, which TradeSignal to fetch.
     */
    where?: TradeSignalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeSignals to fetch.
     */
    orderBy?: TradeSignalOrderByWithRelationInput | TradeSignalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TradeSignals.
     */
    cursor?: TradeSignalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeSignals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeSignals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TradeSignals.
     */
    distinct?: TradeSignalScalarFieldEnum | TradeSignalScalarFieldEnum[]
  }

  /**
   * TradeSignal findMany
   */
  export type TradeSignalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeSignal
     */
    select?: TradeSignalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeSignal
     */
    omit?: TradeSignalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeSignalInclude<ExtArgs> | null
    /**
     * Filter, which TradeSignals to fetch.
     */
    where?: TradeSignalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TradeSignals to fetch.
     */
    orderBy?: TradeSignalOrderByWithRelationInput | TradeSignalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TradeSignals.
     */
    cursor?: TradeSignalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TradeSignals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TradeSignals.
     */
    skip?: number
    distinct?: TradeSignalScalarFieldEnum | TradeSignalScalarFieldEnum[]
  }

  /**
   * TradeSignal create
   */
  export type TradeSignalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeSignal
     */
    select?: TradeSignalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeSignal
     */
    omit?: TradeSignalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeSignalInclude<ExtArgs> | null
    /**
     * The data needed to create a TradeSignal.
     */
    data: XOR<TradeSignalCreateInput, TradeSignalUncheckedCreateInput>
  }

  /**
   * TradeSignal createMany
   */
  export type TradeSignalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TradeSignals.
     */
    data: TradeSignalCreateManyInput | TradeSignalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TradeSignal createManyAndReturn
   */
  export type TradeSignalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeSignal
     */
    select?: TradeSignalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TradeSignal
     */
    omit?: TradeSignalOmit<ExtArgs> | null
    /**
     * The data used to create many TradeSignals.
     */
    data: TradeSignalCreateManyInput | TradeSignalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeSignalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TradeSignal update
   */
  export type TradeSignalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeSignal
     */
    select?: TradeSignalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeSignal
     */
    omit?: TradeSignalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeSignalInclude<ExtArgs> | null
    /**
     * The data needed to update a TradeSignal.
     */
    data: XOR<TradeSignalUpdateInput, TradeSignalUncheckedUpdateInput>
    /**
     * Choose, which TradeSignal to update.
     */
    where: TradeSignalWhereUniqueInput
  }

  /**
   * TradeSignal updateMany
   */
  export type TradeSignalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TradeSignals.
     */
    data: XOR<TradeSignalUpdateManyMutationInput, TradeSignalUncheckedUpdateManyInput>
    /**
     * Filter which TradeSignals to update
     */
    where?: TradeSignalWhereInput
    /**
     * Limit how many TradeSignals to update.
     */
    limit?: number
  }

  /**
   * TradeSignal updateManyAndReturn
   */
  export type TradeSignalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeSignal
     */
    select?: TradeSignalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TradeSignal
     */
    omit?: TradeSignalOmit<ExtArgs> | null
    /**
     * The data used to update TradeSignals.
     */
    data: XOR<TradeSignalUpdateManyMutationInput, TradeSignalUncheckedUpdateManyInput>
    /**
     * Filter which TradeSignals to update
     */
    where?: TradeSignalWhereInput
    /**
     * Limit how many TradeSignals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeSignalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TradeSignal upsert
   */
  export type TradeSignalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeSignal
     */
    select?: TradeSignalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeSignal
     */
    omit?: TradeSignalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeSignalInclude<ExtArgs> | null
    /**
     * The filter to search for the TradeSignal to update in case it exists.
     */
    where: TradeSignalWhereUniqueInput
    /**
     * In case the TradeSignal found by the `where` argument doesn't exist, create a new TradeSignal with this data.
     */
    create: XOR<TradeSignalCreateInput, TradeSignalUncheckedCreateInput>
    /**
     * In case the TradeSignal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeSignalUpdateInput, TradeSignalUncheckedUpdateInput>
  }

  /**
   * TradeSignal delete
   */
  export type TradeSignalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeSignal
     */
    select?: TradeSignalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeSignal
     */
    omit?: TradeSignalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeSignalInclude<ExtArgs> | null
    /**
     * Filter which TradeSignal to delete.
     */
    where: TradeSignalWhereUniqueInput
  }

  /**
   * TradeSignal deleteMany
   */
  export type TradeSignalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TradeSignals to delete
     */
    where?: TradeSignalWhereInput
    /**
     * Limit how many TradeSignals to delete.
     */
    limit?: number
  }

  /**
   * TradeSignal without action
   */
  export type TradeSignalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TradeSignal
     */
    select?: TradeSignalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TradeSignal
     */
    omit?: TradeSignalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TradeSignalInclude<ExtArgs> | null
  }


  /**
   * Model Trade
   */

  export type AggregateTrade = {
    _count: TradeCountAggregateOutputType | null
    _avg: TradeAvgAggregateOutputType | null
    _sum: TradeSumAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  export type TradeAvgAggregateOutputType = {
    amountIn: number | null
    amountOut: number | null
    price: number | null
    slippage: number | null
  }

  export type TradeSumAggregateOutputType = {
    amountIn: number | null
    amountOut: number | null
    price: number | null
    slippage: number | null
  }

  export type TradeMinAggregateOutputType = {
    id: string | null
    walletAddress: string | null
    tokenPair: string | null
    type: string | null
    amountIn: number | null
    amountOut: number | null
    price: number | null
    slippage: number | null
    txSignature: string | null
    blockTime: Date | null
    status: string | null
    strategyId: string | null
    signalId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TradeMaxAggregateOutputType = {
    id: string | null
    walletAddress: string | null
    tokenPair: string | null
    type: string | null
    amountIn: number | null
    amountOut: number | null
    price: number | null
    slippage: number | null
    txSignature: string | null
    blockTime: Date | null
    status: string | null
    strategyId: string | null
    signalId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TradeCountAggregateOutputType = {
    id: number
    walletAddress: number
    tokenPair: number
    type: number
    amountIn: number
    amountOut: number
    price: number
    slippage: number
    txSignature: number
    blockTime: number
    status: number
    strategyId: number
    signalId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TradeAvgAggregateInputType = {
    amountIn?: true
    amountOut?: true
    price?: true
    slippage?: true
  }

  export type TradeSumAggregateInputType = {
    amountIn?: true
    amountOut?: true
    price?: true
    slippage?: true
  }

  export type TradeMinAggregateInputType = {
    id?: true
    walletAddress?: true
    tokenPair?: true
    type?: true
    amountIn?: true
    amountOut?: true
    price?: true
    slippage?: true
    txSignature?: true
    blockTime?: true
    status?: true
    strategyId?: true
    signalId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TradeMaxAggregateInputType = {
    id?: true
    walletAddress?: true
    tokenPair?: true
    type?: true
    amountIn?: true
    amountOut?: true
    price?: true
    slippage?: true
    txSignature?: true
    blockTime?: true
    status?: true
    strategyId?: true
    signalId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TradeCountAggregateInputType = {
    id?: true
    walletAddress?: true
    tokenPair?: true
    type?: true
    amountIn?: true
    amountOut?: true
    price?: true
    slippage?: true
    txSignature?: true
    blockTime?: true
    status?: true
    strategyId?: true
    signalId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TradeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trade to aggregate.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Trades
    **/
    _count?: true | TradeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TradeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TradeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TradeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TradeMaxAggregateInputType
  }

  export type GetTradeAggregateType<T extends TradeAggregateArgs> = {
        [P in keyof T & keyof AggregateTrade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrade[P]>
      : GetScalarType<T[P], AggregateTrade[P]>
  }




  export type TradeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TradeWhereInput
    orderBy?: TradeOrderByWithAggregationInput | TradeOrderByWithAggregationInput[]
    by: TradeScalarFieldEnum[] | TradeScalarFieldEnum
    having?: TradeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TradeCountAggregateInputType | true
    _avg?: TradeAvgAggregateInputType
    _sum?: TradeSumAggregateInputType
    _min?: TradeMinAggregateInputType
    _max?: TradeMaxAggregateInputType
  }

  export type TradeGroupByOutputType = {
    id: string
    walletAddress: string
    tokenPair: string
    type: string
    amountIn: number
    amountOut: number
    price: number
    slippage: number
    txSignature: string
    blockTime: Date | null
    status: string
    strategyId: string | null
    signalId: string | null
    createdAt: Date
    updatedAt: Date
    _count: TradeCountAggregateOutputType | null
    _avg: TradeAvgAggregateOutputType | null
    _sum: TradeSumAggregateOutputType | null
    _min: TradeMinAggregateOutputType | null
    _max: TradeMaxAggregateOutputType | null
  }

  type GetTradeGroupByPayload<T extends TradeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TradeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TradeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TradeGroupByOutputType[P]>
            : GetScalarType<T[P], TradeGroupByOutputType[P]>
        }
      >
    >


  export type TradeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    tokenPair?: boolean
    type?: boolean
    amountIn?: boolean
    amountOut?: boolean
    price?: boolean
    slippage?: boolean
    txSignature?: boolean
    blockTime?: boolean
    status?: boolean
    strategyId?: boolean
    signalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    tokenPair?: boolean
    type?: boolean
    amountIn?: boolean
    amountOut?: boolean
    price?: boolean
    slippage?: boolean
    txSignature?: boolean
    blockTime?: boolean
    status?: boolean
    strategyId?: boolean
    signalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    tokenPair?: boolean
    type?: boolean
    amountIn?: boolean
    amountOut?: boolean
    price?: boolean
    slippage?: boolean
    txSignature?: boolean
    blockTime?: boolean
    status?: boolean
    strategyId?: boolean
    signalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["trade"]>

  export type TradeSelectScalar = {
    id?: boolean
    walletAddress?: boolean
    tokenPair?: boolean
    type?: boolean
    amountIn?: boolean
    amountOut?: boolean
    price?: boolean
    slippage?: boolean
    txSignature?: boolean
    blockTime?: boolean
    status?: boolean
    strategyId?: boolean
    signalId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TradeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "walletAddress" | "tokenPair" | "type" | "amountIn" | "amountOut" | "price" | "slippage" | "txSignature" | "blockTime" | "status" | "strategyId" | "signalId" | "createdAt" | "updatedAt", ExtArgs["result"]["trade"]>

  export type $TradePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Trade"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      walletAddress: string
      tokenPair: string
      type: string
      amountIn: number
      amountOut: number
      price: number
      slippage: number
      txSignature: string
      blockTime: Date | null
      status: string
      strategyId: string | null
      signalId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["trade"]>
    composites: {}
  }

  type TradeGetPayload<S extends boolean | null | undefined | TradeDefaultArgs> = $Result.GetResult<Prisma.$TradePayload, S>

  type TradeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TradeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TradeCountAggregateInputType | true
    }

  export interface TradeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Trade'], meta: { name: 'Trade' } }
    /**
     * Find zero or one Trade that matches the filter.
     * @param {TradeFindUniqueArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TradeFindUniqueArgs>(args: SelectSubset<T, TradeFindUniqueArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Trade that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TradeFindUniqueOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TradeFindUniqueOrThrowArgs>(args: SelectSubset<T, TradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TradeFindFirstArgs>(args?: SelectSubset<T, TradeFindFirstArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Trade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindFirstOrThrowArgs} args - Arguments to find a Trade
     * @example
     * // Get one Trade
     * const trade = await prisma.trade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TradeFindFirstOrThrowArgs>(args?: SelectSubset<T, TradeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Trades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Trades
     * const trades = await prisma.trade.findMany()
     * 
     * // Get first 10 Trades
     * const trades = await prisma.trade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tradeWithIdOnly = await prisma.trade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TradeFindManyArgs>(args?: SelectSubset<T, TradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Trade.
     * @param {TradeCreateArgs} args - Arguments to create a Trade.
     * @example
     * // Create one Trade
     * const Trade = await prisma.trade.create({
     *   data: {
     *     // ... data to create a Trade
     *   }
     * })
     * 
     */
    create<T extends TradeCreateArgs>(args: SelectSubset<T, TradeCreateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Trades.
     * @param {TradeCreateManyArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TradeCreateManyArgs>(args?: SelectSubset<T, TradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Trades and returns the data saved in the database.
     * @param {TradeCreateManyAndReturnArgs} args - Arguments to create many Trades.
     * @example
     * // Create many Trades
     * const trade = await prisma.trade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Trades and only return the `id`
     * const tradeWithIdOnly = await prisma.trade.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TradeCreateManyAndReturnArgs>(args?: SelectSubset<T, TradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Trade.
     * @param {TradeDeleteArgs} args - Arguments to delete one Trade.
     * @example
     * // Delete one Trade
     * const Trade = await prisma.trade.delete({
     *   where: {
     *     // ... filter to delete one Trade
     *   }
     * })
     * 
     */
    delete<T extends TradeDeleteArgs>(args: SelectSubset<T, TradeDeleteArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Trade.
     * @param {TradeUpdateArgs} args - Arguments to update one Trade.
     * @example
     * // Update one Trade
     * const trade = await prisma.trade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TradeUpdateArgs>(args: SelectSubset<T, TradeUpdateArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Trades.
     * @param {TradeDeleteManyArgs} args - Arguments to filter Trades to delete.
     * @example
     * // Delete a few Trades
     * const { count } = await prisma.trade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TradeDeleteManyArgs>(args?: SelectSubset<T, TradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Trades
     * const trade = await prisma.trade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TradeUpdateManyArgs>(args: SelectSubset<T, TradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Trades and returns the data updated in the database.
     * @param {TradeUpdateManyAndReturnArgs} args - Arguments to update many Trades.
     * @example
     * // Update many Trades
     * const trade = await prisma.trade.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Trades and only return the `id`
     * const tradeWithIdOnly = await prisma.trade.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TradeUpdateManyAndReturnArgs>(args: SelectSubset<T, TradeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Trade.
     * @param {TradeUpsertArgs} args - Arguments to update or create a Trade.
     * @example
     * // Update or create a Trade
     * const trade = await prisma.trade.upsert({
     *   create: {
     *     // ... data to create a Trade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Trade we want to update
     *   }
     * })
     */
    upsert<T extends TradeUpsertArgs>(args: SelectSubset<T, TradeUpsertArgs<ExtArgs>>): Prisma__TradeClient<$Result.GetResult<Prisma.$TradePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Trades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeCountArgs} args - Arguments to filter Trades to count.
     * @example
     * // Count the number of Trades
     * const count = await prisma.trade.count({
     *   where: {
     *     // ... the filter for the Trades we want to count
     *   }
     * })
    **/
    count<T extends TradeCountArgs>(
      args?: Subset<T, TradeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TradeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TradeAggregateArgs>(args: Subset<T, TradeAggregateArgs>): Prisma.PrismaPromise<GetTradeAggregateType<T>>

    /**
     * Group by Trade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TradeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TradeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TradeGroupByArgs['orderBy'] }
        : { orderBy?: TradeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Trade model
   */
  readonly fields: TradeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Trade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TradeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Trade model
   */
  interface TradeFieldRefs {
    readonly id: FieldRef<"Trade", 'String'>
    readonly walletAddress: FieldRef<"Trade", 'String'>
    readonly tokenPair: FieldRef<"Trade", 'String'>
    readonly type: FieldRef<"Trade", 'String'>
    readonly amountIn: FieldRef<"Trade", 'Float'>
    readonly amountOut: FieldRef<"Trade", 'Float'>
    readonly price: FieldRef<"Trade", 'Float'>
    readonly slippage: FieldRef<"Trade", 'Float'>
    readonly txSignature: FieldRef<"Trade", 'String'>
    readonly blockTime: FieldRef<"Trade", 'DateTime'>
    readonly status: FieldRef<"Trade", 'String'>
    readonly strategyId: FieldRef<"Trade", 'String'>
    readonly signalId: FieldRef<"Trade", 'String'>
    readonly createdAt: FieldRef<"Trade", 'DateTime'>
    readonly updatedAt: FieldRef<"Trade", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Trade findUnique
   */
  export type TradeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findUniqueOrThrow
   */
  export type TradeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade findFirst
   */
  export type TradeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findFirstOrThrow
   */
  export type TradeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Filter, which Trade to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Trades.
     */
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade findMany
   */
  export type TradeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Filter, which Trades to fetch.
     */
    where?: TradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Trades to fetch.
     */
    orderBy?: TradeOrderByWithRelationInput | TradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Trades.
     */
    cursor?: TradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Trades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Trades.
     */
    skip?: number
    distinct?: TradeScalarFieldEnum | TradeScalarFieldEnum[]
  }

  /**
   * Trade create
   */
  export type TradeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data needed to create a Trade.
     */
    data: XOR<TradeCreateInput, TradeUncheckedCreateInput>
  }

  /**
   * Trade createMany
   */
  export type TradeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trade createManyAndReturn
   */
  export type TradeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data used to create many Trades.
     */
    data: TradeCreateManyInput | TradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Trade update
   */
  export type TradeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data needed to update a Trade.
     */
    data: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
    /**
     * Choose, which Trade to update.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade updateMany
   */
  export type TradeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Trades.
     */
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyInput>
    /**
     * Filter which Trades to update
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to update.
     */
    limit?: number
  }

  /**
   * Trade updateManyAndReturn
   */
  export type TradeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The data used to update Trades.
     */
    data: XOR<TradeUpdateManyMutationInput, TradeUncheckedUpdateManyInput>
    /**
     * Filter which Trades to update
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to update.
     */
    limit?: number
  }

  /**
   * Trade upsert
   */
  export type TradeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * The filter to search for the Trade to update in case it exists.
     */
    where: TradeWhereUniqueInput
    /**
     * In case the Trade found by the `where` argument doesn't exist, create a new Trade with this data.
     */
    create: XOR<TradeCreateInput, TradeUncheckedCreateInput>
    /**
     * In case the Trade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TradeUpdateInput, TradeUncheckedUpdateInput>
  }

  /**
   * Trade delete
   */
  export type TradeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
    /**
     * Filter which Trade to delete.
     */
    where: TradeWhereUniqueInput
  }

  /**
   * Trade deleteMany
   */
  export type TradeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Trades to delete
     */
    where?: TradeWhereInput
    /**
     * Limit how many Trades to delete.
     */
    limit?: number
  }

  /**
   * Trade without action
   */
  export type TradeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Trade
     */
    select?: TradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Trade
     */
    omit?: TradeOmit<ExtArgs> | null
  }


  /**
   * Model CandleData
   */

  export type AggregateCandleData = {
    _count: CandleDataCountAggregateOutputType | null
    _avg: CandleDataAvgAggregateOutputType | null
    _sum: CandleDataSumAggregateOutputType | null
    _min: CandleDataMinAggregateOutputType | null
    _max: CandleDataMaxAggregateOutputType | null
  }

  export type CandleDataAvgAggregateOutputType = {
    open: number | null
    high: number | null
    low: number | null
    close: number | null
    volume: number | null
  }

  export type CandleDataSumAggregateOutputType = {
    open: number | null
    high: number | null
    low: number | null
    close: number | null
    volume: number | null
  }

  export type CandleDataMinAggregateOutputType = {
    id: string | null
    tokenPair: string | null
    timestamp: Date | null
    open: number | null
    high: number | null
    low: number | null
    close: number | null
    volume: number | null
    timeframe: string | null
    createdAt: Date | null
  }

  export type CandleDataMaxAggregateOutputType = {
    id: string | null
    tokenPair: string | null
    timestamp: Date | null
    open: number | null
    high: number | null
    low: number | null
    close: number | null
    volume: number | null
    timeframe: string | null
    createdAt: Date | null
  }

  export type CandleDataCountAggregateOutputType = {
    id: number
    tokenPair: number
    timestamp: number
    open: number
    high: number
    low: number
    close: number
    volume: number
    timeframe: number
    createdAt: number
    _all: number
  }


  export type CandleDataAvgAggregateInputType = {
    open?: true
    high?: true
    low?: true
    close?: true
    volume?: true
  }

  export type CandleDataSumAggregateInputType = {
    open?: true
    high?: true
    low?: true
    close?: true
    volume?: true
  }

  export type CandleDataMinAggregateInputType = {
    id?: true
    tokenPair?: true
    timestamp?: true
    open?: true
    high?: true
    low?: true
    close?: true
    volume?: true
    timeframe?: true
    createdAt?: true
  }

  export type CandleDataMaxAggregateInputType = {
    id?: true
    tokenPair?: true
    timestamp?: true
    open?: true
    high?: true
    low?: true
    close?: true
    volume?: true
    timeframe?: true
    createdAt?: true
  }

  export type CandleDataCountAggregateInputType = {
    id?: true
    tokenPair?: true
    timestamp?: true
    open?: true
    high?: true
    low?: true
    close?: true
    volume?: true
    timeframe?: true
    createdAt?: true
    _all?: true
  }

  export type CandleDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CandleData to aggregate.
     */
    where?: CandleDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CandleData to fetch.
     */
    orderBy?: CandleDataOrderByWithRelationInput | CandleDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CandleDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CandleData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CandleData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CandleData
    **/
    _count?: true | CandleDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CandleDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CandleDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CandleDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CandleDataMaxAggregateInputType
  }

  export type GetCandleDataAggregateType<T extends CandleDataAggregateArgs> = {
        [P in keyof T & keyof AggregateCandleData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCandleData[P]>
      : GetScalarType<T[P], AggregateCandleData[P]>
  }




  export type CandleDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CandleDataWhereInput
    orderBy?: CandleDataOrderByWithAggregationInput | CandleDataOrderByWithAggregationInput[]
    by: CandleDataScalarFieldEnum[] | CandleDataScalarFieldEnum
    having?: CandleDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CandleDataCountAggregateInputType | true
    _avg?: CandleDataAvgAggregateInputType
    _sum?: CandleDataSumAggregateInputType
    _min?: CandleDataMinAggregateInputType
    _max?: CandleDataMaxAggregateInputType
  }

  export type CandleDataGroupByOutputType = {
    id: string
    tokenPair: string
    timestamp: Date
    open: number
    high: number
    low: number
    close: number
    volume: number
    timeframe: string
    createdAt: Date
    _count: CandleDataCountAggregateOutputType | null
    _avg: CandleDataAvgAggregateOutputType | null
    _sum: CandleDataSumAggregateOutputType | null
    _min: CandleDataMinAggregateOutputType | null
    _max: CandleDataMaxAggregateOutputType | null
  }

  type GetCandleDataGroupByPayload<T extends CandleDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CandleDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CandleDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CandleDataGroupByOutputType[P]>
            : GetScalarType<T[P], CandleDataGroupByOutputType[P]>
        }
      >
    >


  export type CandleDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenPair?: boolean
    timestamp?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    close?: boolean
    volume?: boolean
    timeframe?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["candleData"]>

  export type CandleDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenPair?: boolean
    timestamp?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    close?: boolean
    volume?: boolean
    timeframe?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["candleData"]>

  export type CandleDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tokenPair?: boolean
    timestamp?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    close?: boolean
    volume?: boolean
    timeframe?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["candleData"]>

  export type CandleDataSelectScalar = {
    id?: boolean
    tokenPair?: boolean
    timestamp?: boolean
    open?: boolean
    high?: boolean
    low?: boolean
    close?: boolean
    volume?: boolean
    timeframe?: boolean
    createdAt?: boolean
  }

  export type CandleDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tokenPair" | "timestamp" | "open" | "high" | "low" | "close" | "volume" | "timeframe" | "createdAt", ExtArgs["result"]["candleData"]>

  export type $CandleDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CandleData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tokenPair: string
      timestamp: Date
      open: number
      high: number
      low: number
      close: number
      volume: number
      timeframe: string
      createdAt: Date
    }, ExtArgs["result"]["candleData"]>
    composites: {}
  }

  type CandleDataGetPayload<S extends boolean | null | undefined | CandleDataDefaultArgs> = $Result.GetResult<Prisma.$CandleDataPayload, S>

  type CandleDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CandleDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CandleDataCountAggregateInputType | true
    }

  export interface CandleDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CandleData'], meta: { name: 'CandleData' } }
    /**
     * Find zero or one CandleData that matches the filter.
     * @param {CandleDataFindUniqueArgs} args - Arguments to find a CandleData
     * @example
     * // Get one CandleData
     * const candleData = await prisma.candleData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CandleDataFindUniqueArgs>(args: SelectSubset<T, CandleDataFindUniqueArgs<ExtArgs>>): Prisma__CandleDataClient<$Result.GetResult<Prisma.$CandleDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CandleData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CandleDataFindUniqueOrThrowArgs} args - Arguments to find a CandleData
     * @example
     * // Get one CandleData
     * const candleData = await prisma.candleData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CandleDataFindUniqueOrThrowArgs>(args: SelectSubset<T, CandleDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CandleDataClient<$Result.GetResult<Prisma.$CandleDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CandleData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandleDataFindFirstArgs} args - Arguments to find a CandleData
     * @example
     * // Get one CandleData
     * const candleData = await prisma.candleData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CandleDataFindFirstArgs>(args?: SelectSubset<T, CandleDataFindFirstArgs<ExtArgs>>): Prisma__CandleDataClient<$Result.GetResult<Prisma.$CandleDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CandleData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandleDataFindFirstOrThrowArgs} args - Arguments to find a CandleData
     * @example
     * // Get one CandleData
     * const candleData = await prisma.candleData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CandleDataFindFirstOrThrowArgs>(args?: SelectSubset<T, CandleDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__CandleDataClient<$Result.GetResult<Prisma.$CandleDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CandleData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandleDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CandleData
     * const candleData = await prisma.candleData.findMany()
     * 
     * // Get first 10 CandleData
     * const candleData = await prisma.candleData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const candleDataWithIdOnly = await prisma.candleData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CandleDataFindManyArgs>(args?: SelectSubset<T, CandleDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandleDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CandleData.
     * @param {CandleDataCreateArgs} args - Arguments to create a CandleData.
     * @example
     * // Create one CandleData
     * const CandleData = await prisma.candleData.create({
     *   data: {
     *     // ... data to create a CandleData
     *   }
     * })
     * 
     */
    create<T extends CandleDataCreateArgs>(args: SelectSubset<T, CandleDataCreateArgs<ExtArgs>>): Prisma__CandleDataClient<$Result.GetResult<Prisma.$CandleDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CandleData.
     * @param {CandleDataCreateManyArgs} args - Arguments to create many CandleData.
     * @example
     * // Create many CandleData
     * const candleData = await prisma.candleData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CandleDataCreateManyArgs>(args?: SelectSubset<T, CandleDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CandleData and returns the data saved in the database.
     * @param {CandleDataCreateManyAndReturnArgs} args - Arguments to create many CandleData.
     * @example
     * // Create many CandleData
     * const candleData = await prisma.candleData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CandleData and only return the `id`
     * const candleDataWithIdOnly = await prisma.candleData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CandleDataCreateManyAndReturnArgs>(args?: SelectSubset<T, CandleDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandleDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CandleData.
     * @param {CandleDataDeleteArgs} args - Arguments to delete one CandleData.
     * @example
     * // Delete one CandleData
     * const CandleData = await prisma.candleData.delete({
     *   where: {
     *     // ... filter to delete one CandleData
     *   }
     * })
     * 
     */
    delete<T extends CandleDataDeleteArgs>(args: SelectSubset<T, CandleDataDeleteArgs<ExtArgs>>): Prisma__CandleDataClient<$Result.GetResult<Prisma.$CandleDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CandleData.
     * @param {CandleDataUpdateArgs} args - Arguments to update one CandleData.
     * @example
     * // Update one CandleData
     * const candleData = await prisma.candleData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CandleDataUpdateArgs>(args: SelectSubset<T, CandleDataUpdateArgs<ExtArgs>>): Prisma__CandleDataClient<$Result.GetResult<Prisma.$CandleDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CandleData.
     * @param {CandleDataDeleteManyArgs} args - Arguments to filter CandleData to delete.
     * @example
     * // Delete a few CandleData
     * const { count } = await prisma.candleData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CandleDataDeleteManyArgs>(args?: SelectSubset<T, CandleDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CandleData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandleDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CandleData
     * const candleData = await prisma.candleData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CandleDataUpdateManyArgs>(args: SelectSubset<T, CandleDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CandleData and returns the data updated in the database.
     * @param {CandleDataUpdateManyAndReturnArgs} args - Arguments to update many CandleData.
     * @example
     * // Update many CandleData
     * const candleData = await prisma.candleData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CandleData and only return the `id`
     * const candleDataWithIdOnly = await prisma.candleData.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CandleDataUpdateManyAndReturnArgs>(args: SelectSubset<T, CandleDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CandleDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CandleData.
     * @param {CandleDataUpsertArgs} args - Arguments to update or create a CandleData.
     * @example
     * // Update or create a CandleData
     * const candleData = await prisma.candleData.upsert({
     *   create: {
     *     // ... data to create a CandleData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CandleData we want to update
     *   }
     * })
     */
    upsert<T extends CandleDataUpsertArgs>(args: SelectSubset<T, CandleDataUpsertArgs<ExtArgs>>): Prisma__CandleDataClient<$Result.GetResult<Prisma.$CandleDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CandleData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandleDataCountArgs} args - Arguments to filter CandleData to count.
     * @example
     * // Count the number of CandleData
     * const count = await prisma.candleData.count({
     *   where: {
     *     // ... the filter for the CandleData we want to count
     *   }
     * })
    **/
    count<T extends CandleDataCountArgs>(
      args?: Subset<T, CandleDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CandleDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CandleData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandleDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CandleDataAggregateArgs>(args: Subset<T, CandleDataAggregateArgs>): Prisma.PrismaPromise<GetCandleDataAggregateType<T>>

    /**
     * Group by CandleData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CandleDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CandleDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CandleDataGroupByArgs['orderBy'] }
        : { orderBy?: CandleDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CandleDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCandleDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CandleData model
   */
  readonly fields: CandleDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CandleData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CandleDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CandleData model
   */
  interface CandleDataFieldRefs {
    readonly id: FieldRef<"CandleData", 'String'>
    readonly tokenPair: FieldRef<"CandleData", 'String'>
    readonly timestamp: FieldRef<"CandleData", 'DateTime'>
    readonly open: FieldRef<"CandleData", 'Float'>
    readonly high: FieldRef<"CandleData", 'Float'>
    readonly low: FieldRef<"CandleData", 'Float'>
    readonly close: FieldRef<"CandleData", 'Float'>
    readonly volume: FieldRef<"CandleData", 'Float'>
    readonly timeframe: FieldRef<"CandleData", 'String'>
    readonly createdAt: FieldRef<"CandleData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CandleData findUnique
   */
  export type CandleDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandleData
     */
    select?: CandleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandleData
     */
    omit?: CandleDataOmit<ExtArgs> | null
    /**
     * Filter, which CandleData to fetch.
     */
    where: CandleDataWhereUniqueInput
  }

  /**
   * CandleData findUniqueOrThrow
   */
  export type CandleDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandleData
     */
    select?: CandleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandleData
     */
    omit?: CandleDataOmit<ExtArgs> | null
    /**
     * Filter, which CandleData to fetch.
     */
    where: CandleDataWhereUniqueInput
  }

  /**
   * CandleData findFirst
   */
  export type CandleDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandleData
     */
    select?: CandleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandleData
     */
    omit?: CandleDataOmit<ExtArgs> | null
    /**
     * Filter, which CandleData to fetch.
     */
    where?: CandleDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CandleData to fetch.
     */
    orderBy?: CandleDataOrderByWithRelationInput | CandleDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CandleData.
     */
    cursor?: CandleDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CandleData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CandleData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CandleData.
     */
    distinct?: CandleDataScalarFieldEnum | CandleDataScalarFieldEnum[]
  }

  /**
   * CandleData findFirstOrThrow
   */
  export type CandleDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandleData
     */
    select?: CandleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandleData
     */
    omit?: CandleDataOmit<ExtArgs> | null
    /**
     * Filter, which CandleData to fetch.
     */
    where?: CandleDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CandleData to fetch.
     */
    orderBy?: CandleDataOrderByWithRelationInput | CandleDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CandleData.
     */
    cursor?: CandleDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CandleData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CandleData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CandleData.
     */
    distinct?: CandleDataScalarFieldEnum | CandleDataScalarFieldEnum[]
  }

  /**
   * CandleData findMany
   */
  export type CandleDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandleData
     */
    select?: CandleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandleData
     */
    omit?: CandleDataOmit<ExtArgs> | null
    /**
     * Filter, which CandleData to fetch.
     */
    where?: CandleDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CandleData to fetch.
     */
    orderBy?: CandleDataOrderByWithRelationInput | CandleDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CandleData.
     */
    cursor?: CandleDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CandleData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CandleData.
     */
    skip?: number
    distinct?: CandleDataScalarFieldEnum | CandleDataScalarFieldEnum[]
  }

  /**
   * CandleData create
   */
  export type CandleDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandleData
     */
    select?: CandleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandleData
     */
    omit?: CandleDataOmit<ExtArgs> | null
    /**
     * The data needed to create a CandleData.
     */
    data: XOR<CandleDataCreateInput, CandleDataUncheckedCreateInput>
  }

  /**
   * CandleData createMany
   */
  export type CandleDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CandleData.
     */
    data: CandleDataCreateManyInput | CandleDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CandleData createManyAndReturn
   */
  export type CandleDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandleData
     */
    select?: CandleDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CandleData
     */
    omit?: CandleDataOmit<ExtArgs> | null
    /**
     * The data used to create many CandleData.
     */
    data: CandleDataCreateManyInput | CandleDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CandleData update
   */
  export type CandleDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandleData
     */
    select?: CandleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandleData
     */
    omit?: CandleDataOmit<ExtArgs> | null
    /**
     * The data needed to update a CandleData.
     */
    data: XOR<CandleDataUpdateInput, CandleDataUncheckedUpdateInput>
    /**
     * Choose, which CandleData to update.
     */
    where: CandleDataWhereUniqueInput
  }

  /**
   * CandleData updateMany
   */
  export type CandleDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CandleData.
     */
    data: XOR<CandleDataUpdateManyMutationInput, CandleDataUncheckedUpdateManyInput>
    /**
     * Filter which CandleData to update
     */
    where?: CandleDataWhereInput
    /**
     * Limit how many CandleData to update.
     */
    limit?: number
  }

  /**
   * CandleData updateManyAndReturn
   */
  export type CandleDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandleData
     */
    select?: CandleDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CandleData
     */
    omit?: CandleDataOmit<ExtArgs> | null
    /**
     * The data used to update CandleData.
     */
    data: XOR<CandleDataUpdateManyMutationInput, CandleDataUncheckedUpdateManyInput>
    /**
     * Filter which CandleData to update
     */
    where?: CandleDataWhereInput
    /**
     * Limit how many CandleData to update.
     */
    limit?: number
  }

  /**
   * CandleData upsert
   */
  export type CandleDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandleData
     */
    select?: CandleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandleData
     */
    omit?: CandleDataOmit<ExtArgs> | null
    /**
     * The filter to search for the CandleData to update in case it exists.
     */
    where: CandleDataWhereUniqueInput
    /**
     * In case the CandleData found by the `where` argument doesn't exist, create a new CandleData with this data.
     */
    create: XOR<CandleDataCreateInput, CandleDataUncheckedCreateInput>
    /**
     * In case the CandleData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CandleDataUpdateInput, CandleDataUncheckedUpdateInput>
  }

  /**
   * CandleData delete
   */
  export type CandleDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandleData
     */
    select?: CandleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandleData
     */
    omit?: CandleDataOmit<ExtArgs> | null
    /**
     * Filter which CandleData to delete.
     */
    where: CandleDataWhereUniqueInput
  }

  /**
   * CandleData deleteMany
   */
  export type CandleDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CandleData to delete
     */
    where?: CandleDataWhereInput
    /**
     * Limit how many CandleData to delete.
     */
    limit?: number
  }

  /**
   * CandleData without action
   */
  export type CandleDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CandleData
     */
    select?: CandleDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CandleData
     */
    omit?: CandleDataOmit<ExtArgs> | null
  }


  /**
   * Model BotConfig
   */

  export type AggregateBotConfig = {
    _count: BotConfigCountAggregateOutputType | null
    _avg: BotConfigAvgAggregateOutputType | null
    _sum: BotConfigSumAggregateOutputType | null
    _min: BotConfigMinAggregateOutputType | null
    _max: BotConfigMaxAggregateOutputType | null
  }

  export type BotConfigAvgAggregateOutputType = {
    maxTradeAmount: number | null
    defaultSlippage: number | null
    minConfidence: number | null
  }

  export type BotConfigSumAggregateOutputType = {
    maxTradeAmount: number | null
    defaultSlippage: number | null
    minConfidence: number | null
  }

  export type BotConfigMinAggregateOutputType = {
    id: string | null
    walletAddress: string | null
    isActive: boolean | null
    maxTradeAmount: number | null
    defaultSlippage: number | null
    minConfidence: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BotConfigMaxAggregateOutputType = {
    id: string | null
    walletAddress: string | null
    isActive: boolean | null
    maxTradeAmount: number | null
    defaultSlippage: number | null
    minConfidence: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BotConfigCountAggregateOutputType = {
    id: number
    walletAddress: number
    isActive: number
    maxTradeAmount: number
    defaultSlippage: number
    minConfidence: number
    allowedTokenPairs: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BotConfigAvgAggregateInputType = {
    maxTradeAmount?: true
    defaultSlippage?: true
    minConfidence?: true
  }

  export type BotConfigSumAggregateInputType = {
    maxTradeAmount?: true
    defaultSlippage?: true
    minConfidence?: true
  }

  export type BotConfigMinAggregateInputType = {
    id?: true
    walletAddress?: true
    isActive?: true
    maxTradeAmount?: true
    defaultSlippage?: true
    minConfidence?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BotConfigMaxAggregateInputType = {
    id?: true
    walletAddress?: true
    isActive?: true
    maxTradeAmount?: true
    defaultSlippage?: true
    minConfidence?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BotConfigCountAggregateInputType = {
    id?: true
    walletAddress?: true
    isActive?: true
    maxTradeAmount?: true
    defaultSlippage?: true
    minConfidence?: true
    allowedTokenPairs?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BotConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BotConfig to aggregate.
     */
    where?: BotConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BotConfigs to fetch.
     */
    orderBy?: BotConfigOrderByWithRelationInput | BotConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BotConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BotConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BotConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BotConfigs
    **/
    _count?: true | BotConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BotConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BotConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BotConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BotConfigMaxAggregateInputType
  }

  export type GetBotConfigAggregateType<T extends BotConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateBotConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBotConfig[P]>
      : GetScalarType<T[P], AggregateBotConfig[P]>
  }




  export type BotConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BotConfigWhereInput
    orderBy?: BotConfigOrderByWithAggregationInput | BotConfigOrderByWithAggregationInput[]
    by: BotConfigScalarFieldEnum[] | BotConfigScalarFieldEnum
    having?: BotConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BotConfigCountAggregateInputType | true
    _avg?: BotConfigAvgAggregateInputType
    _sum?: BotConfigSumAggregateInputType
    _min?: BotConfigMinAggregateInputType
    _max?: BotConfigMaxAggregateInputType
  }

  export type BotConfigGroupByOutputType = {
    id: string
    walletAddress: string
    isActive: boolean
    maxTradeAmount: number
    defaultSlippage: number
    minConfidence: number
    allowedTokenPairs: JsonValue
    createdAt: Date
    updatedAt: Date
    _count: BotConfigCountAggregateOutputType | null
    _avg: BotConfigAvgAggregateOutputType | null
    _sum: BotConfigSumAggregateOutputType | null
    _min: BotConfigMinAggregateOutputType | null
    _max: BotConfigMaxAggregateOutputType | null
  }

  type GetBotConfigGroupByPayload<T extends BotConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BotConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BotConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BotConfigGroupByOutputType[P]>
            : GetScalarType<T[P], BotConfigGroupByOutputType[P]>
        }
      >
    >


  export type BotConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    isActive?: boolean
    maxTradeAmount?: boolean
    defaultSlippage?: boolean
    minConfidence?: boolean
    allowedTokenPairs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["botConfig"]>

  export type BotConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    isActive?: boolean
    maxTradeAmount?: boolean
    defaultSlippage?: boolean
    minConfidence?: boolean
    allowedTokenPairs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["botConfig"]>

  export type BotConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    walletAddress?: boolean
    isActive?: boolean
    maxTradeAmount?: boolean
    defaultSlippage?: boolean
    minConfidence?: boolean
    allowedTokenPairs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["botConfig"]>

  export type BotConfigSelectScalar = {
    id?: boolean
    walletAddress?: boolean
    isActive?: boolean
    maxTradeAmount?: boolean
    defaultSlippage?: boolean
    minConfidence?: boolean
    allowedTokenPairs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BotConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "walletAddress" | "isActive" | "maxTradeAmount" | "defaultSlippage" | "minConfidence" | "allowedTokenPairs" | "createdAt" | "updatedAt", ExtArgs["result"]["botConfig"]>

  export type $BotConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BotConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      walletAddress: string
      isActive: boolean
      maxTradeAmount: number
      defaultSlippage: number
      minConfidence: number
      allowedTokenPairs: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["botConfig"]>
    composites: {}
  }

  type BotConfigGetPayload<S extends boolean | null | undefined | BotConfigDefaultArgs> = $Result.GetResult<Prisma.$BotConfigPayload, S>

  type BotConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BotConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BotConfigCountAggregateInputType | true
    }

  export interface BotConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BotConfig'], meta: { name: 'BotConfig' } }
    /**
     * Find zero or one BotConfig that matches the filter.
     * @param {BotConfigFindUniqueArgs} args - Arguments to find a BotConfig
     * @example
     * // Get one BotConfig
     * const botConfig = await prisma.botConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BotConfigFindUniqueArgs>(args: SelectSubset<T, BotConfigFindUniqueArgs<ExtArgs>>): Prisma__BotConfigClient<$Result.GetResult<Prisma.$BotConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BotConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BotConfigFindUniqueOrThrowArgs} args - Arguments to find a BotConfig
     * @example
     * // Get one BotConfig
     * const botConfig = await prisma.botConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BotConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, BotConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BotConfigClient<$Result.GetResult<Prisma.$BotConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BotConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotConfigFindFirstArgs} args - Arguments to find a BotConfig
     * @example
     * // Get one BotConfig
     * const botConfig = await prisma.botConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BotConfigFindFirstArgs>(args?: SelectSubset<T, BotConfigFindFirstArgs<ExtArgs>>): Prisma__BotConfigClient<$Result.GetResult<Prisma.$BotConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BotConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotConfigFindFirstOrThrowArgs} args - Arguments to find a BotConfig
     * @example
     * // Get one BotConfig
     * const botConfig = await prisma.botConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BotConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, BotConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__BotConfigClient<$Result.GetResult<Prisma.$BotConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BotConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BotConfigs
     * const botConfigs = await prisma.botConfig.findMany()
     * 
     * // Get first 10 BotConfigs
     * const botConfigs = await prisma.botConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const botConfigWithIdOnly = await prisma.botConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BotConfigFindManyArgs>(args?: SelectSubset<T, BotConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BotConfig.
     * @param {BotConfigCreateArgs} args - Arguments to create a BotConfig.
     * @example
     * // Create one BotConfig
     * const BotConfig = await prisma.botConfig.create({
     *   data: {
     *     // ... data to create a BotConfig
     *   }
     * })
     * 
     */
    create<T extends BotConfigCreateArgs>(args: SelectSubset<T, BotConfigCreateArgs<ExtArgs>>): Prisma__BotConfigClient<$Result.GetResult<Prisma.$BotConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BotConfigs.
     * @param {BotConfigCreateManyArgs} args - Arguments to create many BotConfigs.
     * @example
     * // Create many BotConfigs
     * const botConfig = await prisma.botConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BotConfigCreateManyArgs>(args?: SelectSubset<T, BotConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BotConfigs and returns the data saved in the database.
     * @param {BotConfigCreateManyAndReturnArgs} args - Arguments to create many BotConfigs.
     * @example
     * // Create many BotConfigs
     * const botConfig = await prisma.botConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BotConfigs and only return the `id`
     * const botConfigWithIdOnly = await prisma.botConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BotConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, BotConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BotConfig.
     * @param {BotConfigDeleteArgs} args - Arguments to delete one BotConfig.
     * @example
     * // Delete one BotConfig
     * const BotConfig = await prisma.botConfig.delete({
     *   where: {
     *     // ... filter to delete one BotConfig
     *   }
     * })
     * 
     */
    delete<T extends BotConfigDeleteArgs>(args: SelectSubset<T, BotConfigDeleteArgs<ExtArgs>>): Prisma__BotConfigClient<$Result.GetResult<Prisma.$BotConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BotConfig.
     * @param {BotConfigUpdateArgs} args - Arguments to update one BotConfig.
     * @example
     * // Update one BotConfig
     * const botConfig = await prisma.botConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BotConfigUpdateArgs>(args: SelectSubset<T, BotConfigUpdateArgs<ExtArgs>>): Prisma__BotConfigClient<$Result.GetResult<Prisma.$BotConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BotConfigs.
     * @param {BotConfigDeleteManyArgs} args - Arguments to filter BotConfigs to delete.
     * @example
     * // Delete a few BotConfigs
     * const { count } = await prisma.botConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BotConfigDeleteManyArgs>(args?: SelectSubset<T, BotConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BotConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BotConfigs
     * const botConfig = await prisma.botConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BotConfigUpdateManyArgs>(args: SelectSubset<T, BotConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BotConfigs and returns the data updated in the database.
     * @param {BotConfigUpdateManyAndReturnArgs} args - Arguments to update many BotConfigs.
     * @example
     * // Update many BotConfigs
     * const botConfig = await prisma.botConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BotConfigs and only return the `id`
     * const botConfigWithIdOnly = await prisma.botConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BotConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, BotConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BotConfig.
     * @param {BotConfigUpsertArgs} args - Arguments to update or create a BotConfig.
     * @example
     * // Update or create a BotConfig
     * const botConfig = await prisma.botConfig.upsert({
     *   create: {
     *     // ... data to create a BotConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BotConfig we want to update
     *   }
     * })
     */
    upsert<T extends BotConfigUpsertArgs>(args: SelectSubset<T, BotConfigUpsertArgs<ExtArgs>>): Prisma__BotConfigClient<$Result.GetResult<Prisma.$BotConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BotConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotConfigCountArgs} args - Arguments to filter BotConfigs to count.
     * @example
     * // Count the number of BotConfigs
     * const count = await prisma.botConfig.count({
     *   where: {
     *     // ... the filter for the BotConfigs we want to count
     *   }
     * })
    **/
    count<T extends BotConfigCountArgs>(
      args?: Subset<T, BotConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BotConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BotConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BotConfigAggregateArgs>(args: Subset<T, BotConfigAggregateArgs>): Prisma.PrismaPromise<GetBotConfigAggregateType<T>>

    /**
     * Group by BotConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BotConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BotConfigGroupByArgs['orderBy'] }
        : { orderBy?: BotConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BotConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBotConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BotConfig model
   */
  readonly fields: BotConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BotConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BotConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BotConfig model
   */
  interface BotConfigFieldRefs {
    readonly id: FieldRef<"BotConfig", 'String'>
    readonly walletAddress: FieldRef<"BotConfig", 'String'>
    readonly isActive: FieldRef<"BotConfig", 'Boolean'>
    readonly maxTradeAmount: FieldRef<"BotConfig", 'Float'>
    readonly defaultSlippage: FieldRef<"BotConfig", 'Float'>
    readonly minConfidence: FieldRef<"BotConfig", 'Float'>
    readonly allowedTokenPairs: FieldRef<"BotConfig", 'Json'>
    readonly createdAt: FieldRef<"BotConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"BotConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BotConfig findUnique
   */
  export type BotConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotConfig
     */
    select?: BotConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotConfig
     */
    omit?: BotConfigOmit<ExtArgs> | null
    /**
     * Filter, which BotConfig to fetch.
     */
    where: BotConfigWhereUniqueInput
  }

  /**
   * BotConfig findUniqueOrThrow
   */
  export type BotConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotConfig
     */
    select?: BotConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotConfig
     */
    omit?: BotConfigOmit<ExtArgs> | null
    /**
     * Filter, which BotConfig to fetch.
     */
    where: BotConfigWhereUniqueInput
  }

  /**
   * BotConfig findFirst
   */
  export type BotConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotConfig
     */
    select?: BotConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotConfig
     */
    omit?: BotConfigOmit<ExtArgs> | null
    /**
     * Filter, which BotConfig to fetch.
     */
    where?: BotConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BotConfigs to fetch.
     */
    orderBy?: BotConfigOrderByWithRelationInput | BotConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BotConfigs.
     */
    cursor?: BotConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BotConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BotConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BotConfigs.
     */
    distinct?: BotConfigScalarFieldEnum | BotConfigScalarFieldEnum[]
  }

  /**
   * BotConfig findFirstOrThrow
   */
  export type BotConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotConfig
     */
    select?: BotConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotConfig
     */
    omit?: BotConfigOmit<ExtArgs> | null
    /**
     * Filter, which BotConfig to fetch.
     */
    where?: BotConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BotConfigs to fetch.
     */
    orderBy?: BotConfigOrderByWithRelationInput | BotConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BotConfigs.
     */
    cursor?: BotConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BotConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BotConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BotConfigs.
     */
    distinct?: BotConfigScalarFieldEnum | BotConfigScalarFieldEnum[]
  }

  /**
   * BotConfig findMany
   */
  export type BotConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotConfig
     */
    select?: BotConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotConfig
     */
    omit?: BotConfigOmit<ExtArgs> | null
    /**
     * Filter, which BotConfigs to fetch.
     */
    where?: BotConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BotConfigs to fetch.
     */
    orderBy?: BotConfigOrderByWithRelationInput | BotConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BotConfigs.
     */
    cursor?: BotConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BotConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BotConfigs.
     */
    skip?: number
    distinct?: BotConfigScalarFieldEnum | BotConfigScalarFieldEnum[]
  }

  /**
   * BotConfig create
   */
  export type BotConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotConfig
     */
    select?: BotConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotConfig
     */
    omit?: BotConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a BotConfig.
     */
    data: XOR<BotConfigCreateInput, BotConfigUncheckedCreateInput>
  }

  /**
   * BotConfig createMany
   */
  export type BotConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BotConfigs.
     */
    data: BotConfigCreateManyInput | BotConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BotConfig createManyAndReturn
   */
  export type BotConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotConfig
     */
    select?: BotConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BotConfig
     */
    omit?: BotConfigOmit<ExtArgs> | null
    /**
     * The data used to create many BotConfigs.
     */
    data: BotConfigCreateManyInput | BotConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BotConfig update
   */
  export type BotConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotConfig
     */
    select?: BotConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotConfig
     */
    omit?: BotConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a BotConfig.
     */
    data: XOR<BotConfigUpdateInput, BotConfigUncheckedUpdateInput>
    /**
     * Choose, which BotConfig to update.
     */
    where: BotConfigWhereUniqueInput
  }

  /**
   * BotConfig updateMany
   */
  export type BotConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BotConfigs.
     */
    data: XOR<BotConfigUpdateManyMutationInput, BotConfigUncheckedUpdateManyInput>
    /**
     * Filter which BotConfigs to update
     */
    where?: BotConfigWhereInput
    /**
     * Limit how many BotConfigs to update.
     */
    limit?: number
  }

  /**
   * BotConfig updateManyAndReturn
   */
  export type BotConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotConfig
     */
    select?: BotConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BotConfig
     */
    omit?: BotConfigOmit<ExtArgs> | null
    /**
     * The data used to update BotConfigs.
     */
    data: XOR<BotConfigUpdateManyMutationInput, BotConfigUncheckedUpdateManyInput>
    /**
     * Filter which BotConfigs to update
     */
    where?: BotConfigWhereInput
    /**
     * Limit how many BotConfigs to update.
     */
    limit?: number
  }

  /**
   * BotConfig upsert
   */
  export type BotConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotConfig
     */
    select?: BotConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotConfig
     */
    omit?: BotConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the BotConfig to update in case it exists.
     */
    where: BotConfigWhereUniqueInput
    /**
     * In case the BotConfig found by the `where` argument doesn't exist, create a new BotConfig with this data.
     */
    create: XOR<BotConfigCreateInput, BotConfigUncheckedCreateInput>
    /**
     * In case the BotConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BotConfigUpdateInput, BotConfigUncheckedUpdateInput>
  }

  /**
   * BotConfig delete
   */
  export type BotConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotConfig
     */
    select?: BotConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotConfig
     */
    omit?: BotConfigOmit<ExtArgs> | null
    /**
     * Filter which BotConfig to delete.
     */
    where: BotConfigWhereUniqueInput
  }

  /**
   * BotConfig deleteMany
   */
  export type BotConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BotConfigs to delete
     */
    where?: BotConfigWhereInput
    /**
     * Limit how many BotConfigs to delete.
     */
    limit?: number
  }

  /**
   * BotConfig without action
   */
  export type BotConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotConfig
     */
    select?: BotConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotConfig
     */
    omit?: BotConfigOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StrategyConfigScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    walletAddress: 'walletAddress',
    tokenPair: 'tokenPair',
    strategyType: 'strategyType',
    config: 'config',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StrategyConfigScalarFieldEnum = (typeof StrategyConfigScalarFieldEnum)[keyof typeof StrategyConfigScalarFieldEnum]


  export const TradeSignalScalarFieldEnum: {
    id: 'id',
    strategyId: 'strategyId',
    signal: 'signal',
    price: 'price',
    confidence: 'confidence',
    indicators: 'indicators',
    reason: 'reason',
    executed: 'executed',
    txSignature: 'txSignature',
    executedAt: 'executedAt',
    amountIn: 'amountIn',
    amountOut: 'amountOut',
    slippage: 'slippage',
    createdAt: 'createdAt'
  };

  export type TradeSignalScalarFieldEnum = (typeof TradeSignalScalarFieldEnum)[keyof typeof TradeSignalScalarFieldEnum]


  export const TradeScalarFieldEnum: {
    id: 'id',
    walletAddress: 'walletAddress',
    tokenPair: 'tokenPair',
    type: 'type',
    amountIn: 'amountIn',
    amountOut: 'amountOut',
    price: 'price',
    slippage: 'slippage',
    txSignature: 'txSignature',
    blockTime: 'blockTime',
    status: 'status',
    strategyId: 'strategyId',
    signalId: 'signalId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TradeScalarFieldEnum = (typeof TradeScalarFieldEnum)[keyof typeof TradeScalarFieldEnum]


  export const CandleDataScalarFieldEnum: {
    id: 'id',
    tokenPair: 'tokenPair',
    timestamp: 'timestamp',
    open: 'open',
    high: 'high',
    low: 'low',
    close: 'close',
    volume: 'volume',
    timeframe: 'timeframe',
    createdAt: 'createdAt'
  };

  export type CandleDataScalarFieldEnum = (typeof CandleDataScalarFieldEnum)[keyof typeof CandleDataScalarFieldEnum]


  export const BotConfigScalarFieldEnum: {
    id: 'id',
    walletAddress: 'walletAddress',
    isActive: 'isActive',
    maxTradeAmount: 'maxTradeAmount',
    defaultSlippage: 'defaultSlippage',
    minConfidence: 'minConfidence',
    allowedTokenPairs: 'allowedTokenPairs',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BotConfigScalarFieldEnum = (typeof BotConfigScalarFieldEnum)[keyof typeof BotConfigScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type StrategyConfigWhereInput = {
    AND?: StrategyConfigWhereInput | StrategyConfigWhereInput[]
    OR?: StrategyConfigWhereInput[]
    NOT?: StrategyConfigWhereInput | StrategyConfigWhereInput[]
    id?: StringFilter<"StrategyConfig"> | string
    userId?: StringFilter<"StrategyConfig"> | string
    walletAddress?: StringFilter<"StrategyConfig"> | string
    tokenPair?: StringFilter<"StrategyConfig"> | string
    strategyType?: StringFilter<"StrategyConfig"> | string
    config?: JsonFilter<"StrategyConfig">
    status?: StringFilter<"StrategyConfig"> | string
    createdAt?: DateTimeFilter<"StrategyConfig"> | Date | string
    updatedAt?: DateTimeFilter<"StrategyConfig"> | Date | string
    signals?: TradeSignalListRelationFilter
  }

  export type StrategyConfigOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    walletAddress?: SortOrder
    tokenPair?: SortOrder
    strategyType?: SortOrder
    config?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    signals?: TradeSignalOrderByRelationAggregateInput
  }

  export type StrategyConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StrategyConfigWhereInput | StrategyConfigWhereInput[]
    OR?: StrategyConfigWhereInput[]
    NOT?: StrategyConfigWhereInput | StrategyConfigWhereInput[]
    userId?: StringFilter<"StrategyConfig"> | string
    walletAddress?: StringFilter<"StrategyConfig"> | string
    tokenPair?: StringFilter<"StrategyConfig"> | string
    strategyType?: StringFilter<"StrategyConfig"> | string
    config?: JsonFilter<"StrategyConfig">
    status?: StringFilter<"StrategyConfig"> | string
    createdAt?: DateTimeFilter<"StrategyConfig"> | Date | string
    updatedAt?: DateTimeFilter<"StrategyConfig"> | Date | string
    signals?: TradeSignalListRelationFilter
  }, "id">

  export type StrategyConfigOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    walletAddress?: SortOrder
    tokenPair?: SortOrder
    strategyType?: SortOrder
    config?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StrategyConfigCountOrderByAggregateInput
    _max?: StrategyConfigMaxOrderByAggregateInput
    _min?: StrategyConfigMinOrderByAggregateInput
  }

  export type StrategyConfigScalarWhereWithAggregatesInput = {
    AND?: StrategyConfigScalarWhereWithAggregatesInput | StrategyConfigScalarWhereWithAggregatesInput[]
    OR?: StrategyConfigScalarWhereWithAggregatesInput[]
    NOT?: StrategyConfigScalarWhereWithAggregatesInput | StrategyConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StrategyConfig"> | string
    userId?: StringWithAggregatesFilter<"StrategyConfig"> | string
    walletAddress?: StringWithAggregatesFilter<"StrategyConfig"> | string
    tokenPair?: StringWithAggregatesFilter<"StrategyConfig"> | string
    strategyType?: StringWithAggregatesFilter<"StrategyConfig"> | string
    config?: JsonWithAggregatesFilter<"StrategyConfig">
    status?: StringWithAggregatesFilter<"StrategyConfig"> | string
    createdAt?: DateTimeWithAggregatesFilter<"StrategyConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StrategyConfig"> | Date | string
  }

  export type TradeSignalWhereInput = {
    AND?: TradeSignalWhereInput | TradeSignalWhereInput[]
    OR?: TradeSignalWhereInput[]
    NOT?: TradeSignalWhereInput | TradeSignalWhereInput[]
    id?: StringFilter<"TradeSignal"> | string
    strategyId?: StringFilter<"TradeSignal"> | string
    signal?: StringFilter<"TradeSignal"> | string
    price?: FloatFilter<"TradeSignal"> | number
    confidence?: FloatFilter<"TradeSignal"> | number
    indicators?: JsonFilter<"TradeSignal">
    reason?: StringFilter<"TradeSignal"> | string
    executed?: BoolFilter<"TradeSignal"> | boolean
    txSignature?: StringNullableFilter<"TradeSignal"> | string | null
    executedAt?: DateTimeNullableFilter<"TradeSignal"> | Date | string | null
    amountIn?: FloatNullableFilter<"TradeSignal"> | number | null
    amountOut?: FloatNullableFilter<"TradeSignal"> | number | null
    slippage?: FloatNullableFilter<"TradeSignal"> | number | null
    createdAt?: DateTimeFilter<"TradeSignal"> | Date | string
    strategy?: XOR<StrategyConfigScalarRelationFilter, StrategyConfigWhereInput>
  }

  export type TradeSignalOrderByWithRelationInput = {
    id?: SortOrder
    strategyId?: SortOrder
    signal?: SortOrder
    price?: SortOrder
    confidence?: SortOrder
    indicators?: SortOrder
    reason?: SortOrder
    executed?: SortOrder
    txSignature?: SortOrderInput | SortOrder
    executedAt?: SortOrderInput | SortOrder
    amountIn?: SortOrderInput | SortOrder
    amountOut?: SortOrderInput | SortOrder
    slippage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    strategy?: StrategyConfigOrderByWithRelationInput
  }

  export type TradeSignalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TradeSignalWhereInput | TradeSignalWhereInput[]
    OR?: TradeSignalWhereInput[]
    NOT?: TradeSignalWhereInput | TradeSignalWhereInput[]
    strategyId?: StringFilter<"TradeSignal"> | string
    signal?: StringFilter<"TradeSignal"> | string
    price?: FloatFilter<"TradeSignal"> | number
    confidence?: FloatFilter<"TradeSignal"> | number
    indicators?: JsonFilter<"TradeSignal">
    reason?: StringFilter<"TradeSignal"> | string
    executed?: BoolFilter<"TradeSignal"> | boolean
    txSignature?: StringNullableFilter<"TradeSignal"> | string | null
    executedAt?: DateTimeNullableFilter<"TradeSignal"> | Date | string | null
    amountIn?: FloatNullableFilter<"TradeSignal"> | number | null
    amountOut?: FloatNullableFilter<"TradeSignal"> | number | null
    slippage?: FloatNullableFilter<"TradeSignal"> | number | null
    createdAt?: DateTimeFilter<"TradeSignal"> | Date | string
    strategy?: XOR<StrategyConfigScalarRelationFilter, StrategyConfigWhereInput>
  }, "id">

  export type TradeSignalOrderByWithAggregationInput = {
    id?: SortOrder
    strategyId?: SortOrder
    signal?: SortOrder
    price?: SortOrder
    confidence?: SortOrder
    indicators?: SortOrder
    reason?: SortOrder
    executed?: SortOrder
    txSignature?: SortOrderInput | SortOrder
    executedAt?: SortOrderInput | SortOrder
    amountIn?: SortOrderInput | SortOrder
    amountOut?: SortOrderInput | SortOrder
    slippage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: TradeSignalCountOrderByAggregateInput
    _avg?: TradeSignalAvgOrderByAggregateInput
    _max?: TradeSignalMaxOrderByAggregateInput
    _min?: TradeSignalMinOrderByAggregateInput
    _sum?: TradeSignalSumOrderByAggregateInput
  }

  export type TradeSignalScalarWhereWithAggregatesInput = {
    AND?: TradeSignalScalarWhereWithAggregatesInput | TradeSignalScalarWhereWithAggregatesInput[]
    OR?: TradeSignalScalarWhereWithAggregatesInput[]
    NOT?: TradeSignalScalarWhereWithAggregatesInput | TradeSignalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TradeSignal"> | string
    strategyId?: StringWithAggregatesFilter<"TradeSignal"> | string
    signal?: StringWithAggregatesFilter<"TradeSignal"> | string
    price?: FloatWithAggregatesFilter<"TradeSignal"> | number
    confidence?: FloatWithAggregatesFilter<"TradeSignal"> | number
    indicators?: JsonWithAggregatesFilter<"TradeSignal">
    reason?: StringWithAggregatesFilter<"TradeSignal"> | string
    executed?: BoolWithAggregatesFilter<"TradeSignal"> | boolean
    txSignature?: StringNullableWithAggregatesFilter<"TradeSignal"> | string | null
    executedAt?: DateTimeNullableWithAggregatesFilter<"TradeSignal"> | Date | string | null
    amountIn?: FloatNullableWithAggregatesFilter<"TradeSignal"> | number | null
    amountOut?: FloatNullableWithAggregatesFilter<"TradeSignal"> | number | null
    slippage?: FloatNullableWithAggregatesFilter<"TradeSignal"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"TradeSignal"> | Date | string
  }

  export type TradeWhereInput = {
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    id?: StringFilter<"Trade"> | string
    walletAddress?: StringFilter<"Trade"> | string
    tokenPair?: StringFilter<"Trade"> | string
    type?: StringFilter<"Trade"> | string
    amountIn?: FloatFilter<"Trade"> | number
    amountOut?: FloatFilter<"Trade"> | number
    price?: FloatFilter<"Trade"> | number
    slippage?: FloatFilter<"Trade"> | number
    txSignature?: StringFilter<"Trade"> | string
    blockTime?: DateTimeNullableFilter<"Trade"> | Date | string | null
    status?: StringFilter<"Trade"> | string
    strategyId?: StringNullableFilter<"Trade"> | string | null
    signalId?: StringNullableFilter<"Trade"> | string | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
    updatedAt?: DateTimeFilter<"Trade"> | Date | string
  }

  export type TradeOrderByWithRelationInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    tokenPair?: SortOrder
    type?: SortOrder
    amountIn?: SortOrder
    amountOut?: SortOrder
    price?: SortOrder
    slippage?: SortOrder
    txSignature?: SortOrder
    blockTime?: SortOrderInput | SortOrder
    status?: SortOrder
    strategyId?: SortOrderInput | SortOrder
    signalId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    txSignature?: string
    AND?: TradeWhereInput | TradeWhereInput[]
    OR?: TradeWhereInput[]
    NOT?: TradeWhereInput | TradeWhereInput[]
    walletAddress?: StringFilter<"Trade"> | string
    tokenPair?: StringFilter<"Trade"> | string
    type?: StringFilter<"Trade"> | string
    amountIn?: FloatFilter<"Trade"> | number
    amountOut?: FloatFilter<"Trade"> | number
    price?: FloatFilter<"Trade"> | number
    slippage?: FloatFilter<"Trade"> | number
    blockTime?: DateTimeNullableFilter<"Trade"> | Date | string | null
    status?: StringFilter<"Trade"> | string
    strategyId?: StringNullableFilter<"Trade"> | string | null
    signalId?: StringNullableFilter<"Trade"> | string | null
    createdAt?: DateTimeFilter<"Trade"> | Date | string
    updatedAt?: DateTimeFilter<"Trade"> | Date | string
  }, "id" | "txSignature">

  export type TradeOrderByWithAggregationInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    tokenPair?: SortOrder
    type?: SortOrder
    amountIn?: SortOrder
    amountOut?: SortOrder
    price?: SortOrder
    slippage?: SortOrder
    txSignature?: SortOrder
    blockTime?: SortOrderInput | SortOrder
    status?: SortOrder
    strategyId?: SortOrderInput | SortOrder
    signalId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TradeCountOrderByAggregateInput
    _avg?: TradeAvgOrderByAggregateInput
    _max?: TradeMaxOrderByAggregateInput
    _min?: TradeMinOrderByAggregateInput
    _sum?: TradeSumOrderByAggregateInput
  }

  export type TradeScalarWhereWithAggregatesInput = {
    AND?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    OR?: TradeScalarWhereWithAggregatesInput[]
    NOT?: TradeScalarWhereWithAggregatesInput | TradeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Trade"> | string
    walletAddress?: StringWithAggregatesFilter<"Trade"> | string
    tokenPair?: StringWithAggregatesFilter<"Trade"> | string
    type?: StringWithAggregatesFilter<"Trade"> | string
    amountIn?: FloatWithAggregatesFilter<"Trade"> | number
    amountOut?: FloatWithAggregatesFilter<"Trade"> | number
    price?: FloatWithAggregatesFilter<"Trade"> | number
    slippage?: FloatWithAggregatesFilter<"Trade"> | number
    txSignature?: StringWithAggregatesFilter<"Trade"> | string
    blockTime?: DateTimeNullableWithAggregatesFilter<"Trade"> | Date | string | null
    status?: StringWithAggregatesFilter<"Trade"> | string
    strategyId?: StringNullableWithAggregatesFilter<"Trade"> | string | null
    signalId?: StringNullableWithAggregatesFilter<"Trade"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Trade"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Trade"> | Date | string
  }

  export type CandleDataWhereInput = {
    AND?: CandleDataWhereInput | CandleDataWhereInput[]
    OR?: CandleDataWhereInput[]
    NOT?: CandleDataWhereInput | CandleDataWhereInput[]
    id?: StringFilter<"CandleData"> | string
    tokenPair?: StringFilter<"CandleData"> | string
    timestamp?: DateTimeFilter<"CandleData"> | Date | string
    open?: FloatFilter<"CandleData"> | number
    high?: FloatFilter<"CandleData"> | number
    low?: FloatFilter<"CandleData"> | number
    close?: FloatFilter<"CandleData"> | number
    volume?: FloatFilter<"CandleData"> | number
    timeframe?: StringFilter<"CandleData"> | string
    createdAt?: DateTimeFilter<"CandleData"> | Date | string
  }

  export type CandleDataOrderByWithRelationInput = {
    id?: SortOrder
    tokenPair?: SortOrder
    timestamp?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
    timeframe?: SortOrder
    createdAt?: SortOrder
  }

  export type CandleDataWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tokenPair_timestamp_timeframe?: CandleDataTokenPairTimestampTimeframeCompoundUniqueInput
    AND?: CandleDataWhereInput | CandleDataWhereInput[]
    OR?: CandleDataWhereInput[]
    NOT?: CandleDataWhereInput | CandleDataWhereInput[]
    tokenPair?: StringFilter<"CandleData"> | string
    timestamp?: DateTimeFilter<"CandleData"> | Date | string
    open?: FloatFilter<"CandleData"> | number
    high?: FloatFilter<"CandleData"> | number
    low?: FloatFilter<"CandleData"> | number
    close?: FloatFilter<"CandleData"> | number
    volume?: FloatFilter<"CandleData"> | number
    timeframe?: StringFilter<"CandleData"> | string
    createdAt?: DateTimeFilter<"CandleData"> | Date | string
  }, "id" | "tokenPair_timestamp_timeframe">

  export type CandleDataOrderByWithAggregationInput = {
    id?: SortOrder
    tokenPair?: SortOrder
    timestamp?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
    timeframe?: SortOrder
    createdAt?: SortOrder
    _count?: CandleDataCountOrderByAggregateInput
    _avg?: CandleDataAvgOrderByAggregateInput
    _max?: CandleDataMaxOrderByAggregateInput
    _min?: CandleDataMinOrderByAggregateInput
    _sum?: CandleDataSumOrderByAggregateInput
  }

  export type CandleDataScalarWhereWithAggregatesInput = {
    AND?: CandleDataScalarWhereWithAggregatesInput | CandleDataScalarWhereWithAggregatesInput[]
    OR?: CandleDataScalarWhereWithAggregatesInput[]
    NOT?: CandleDataScalarWhereWithAggregatesInput | CandleDataScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CandleData"> | string
    tokenPair?: StringWithAggregatesFilter<"CandleData"> | string
    timestamp?: DateTimeWithAggregatesFilter<"CandleData"> | Date | string
    open?: FloatWithAggregatesFilter<"CandleData"> | number
    high?: FloatWithAggregatesFilter<"CandleData"> | number
    low?: FloatWithAggregatesFilter<"CandleData"> | number
    close?: FloatWithAggregatesFilter<"CandleData"> | number
    volume?: FloatWithAggregatesFilter<"CandleData"> | number
    timeframe?: StringWithAggregatesFilter<"CandleData"> | string
    createdAt?: DateTimeWithAggregatesFilter<"CandleData"> | Date | string
  }

  export type BotConfigWhereInput = {
    AND?: BotConfigWhereInput | BotConfigWhereInput[]
    OR?: BotConfigWhereInput[]
    NOT?: BotConfigWhereInput | BotConfigWhereInput[]
    id?: StringFilter<"BotConfig"> | string
    walletAddress?: StringFilter<"BotConfig"> | string
    isActive?: BoolFilter<"BotConfig"> | boolean
    maxTradeAmount?: FloatFilter<"BotConfig"> | number
    defaultSlippage?: FloatFilter<"BotConfig"> | number
    minConfidence?: FloatFilter<"BotConfig"> | number
    allowedTokenPairs?: JsonFilter<"BotConfig">
    createdAt?: DateTimeFilter<"BotConfig"> | Date | string
    updatedAt?: DateTimeFilter<"BotConfig"> | Date | string
  }

  export type BotConfigOrderByWithRelationInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    isActive?: SortOrder
    maxTradeAmount?: SortOrder
    defaultSlippage?: SortOrder
    minConfidence?: SortOrder
    allowedTokenPairs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BotConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    walletAddress?: string
    AND?: BotConfigWhereInput | BotConfigWhereInput[]
    OR?: BotConfigWhereInput[]
    NOT?: BotConfigWhereInput | BotConfigWhereInput[]
    isActive?: BoolFilter<"BotConfig"> | boolean
    maxTradeAmount?: FloatFilter<"BotConfig"> | number
    defaultSlippage?: FloatFilter<"BotConfig"> | number
    minConfidence?: FloatFilter<"BotConfig"> | number
    allowedTokenPairs?: JsonFilter<"BotConfig">
    createdAt?: DateTimeFilter<"BotConfig"> | Date | string
    updatedAt?: DateTimeFilter<"BotConfig"> | Date | string
  }, "id" | "walletAddress">

  export type BotConfigOrderByWithAggregationInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    isActive?: SortOrder
    maxTradeAmount?: SortOrder
    defaultSlippage?: SortOrder
    minConfidence?: SortOrder
    allowedTokenPairs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BotConfigCountOrderByAggregateInput
    _avg?: BotConfigAvgOrderByAggregateInput
    _max?: BotConfigMaxOrderByAggregateInput
    _min?: BotConfigMinOrderByAggregateInput
    _sum?: BotConfigSumOrderByAggregateInput
  }

  export type BotConfigScalarWhereWithAggregatesInput = {
    AND?: BotConfigScalarWhereWithAggregatesInput | BotConfigScalarWhereWithAggregatesInput[]
    OR?: BotConfigScalarWhereWithAggregatesInput[]
    NOT?: BotConfigScalarWhereWithAggregatesInput | BotConfigScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BotConfig"> | string
    walletAddress?: StringWithAggregatesFilter<"BotConfig"> | string
    isActive?: BoolWithAggregatesFilter<"BotConfig"> | boolean
    maxTradeAmount?: FloatWithAggregatesFilter<"BotConfig"> | number
    defaultSlippage?: FloatWithAggregatesFilter<"BotConfig"> | number
    minConfidence?: FloatWithAggregatesFilter<"BotConfig"> | number
    allowedTokenPairs?: JsonWithAggregatesFilter<"BotConfig">
    createdAt?: DateTimeWithAggregatesFilter<"BotConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BotConfig"> | Date | string
  }

  export type StrategyConfigCreateInput = {
    id?: string
    userId: string
    walletAddress: string
    tokenPair: string
    strategyType: string
    config: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    signals?: TradeSignalCreateNestedManyWithoutStrategyInput
  }

  export type StrategyConfigUncheckedCreateInput = {
    id?: string
    userId: string
    walletAddress: string
    tokenPair: string
    strategyType: string
    config: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    signals?: TradeSignalUncheckedCreateNestedManyWithoutStrategyInput
  }

  export type StrategyConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    tokenPair?: StringFieldUpdateOperationsInput | string
    strategyType?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signals?: TradeSignalUpdateManyWithoutStrategyNestedInput
  }

  export type StrategyConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    tokenPair?: StringFieldUpdateOperationsInput | string
    strategyType?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    signals?: TradeSignalUncheckedUpdateManyWithoutStrategyNestedInput
  }

  export type StrategyConfigCreateManyInput = {
    id?: string
    userId: string
    walletAddress: string
    tokenPair: string
    strategyType: string
    config: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StrategyConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    tokenPair?: StringFieldUpdateOperationsInput | string
    strategyType?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StrategyConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    tokenPair?: StringFieldUpdateOperationsInput | string
    strategyType?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeSignalCreateInput = {
    id?: string
    signal: string
    price: number
    confidence: number
    indicators: JsonNullValueInput | InputJsonValue
    reason: string
    executed?: boolean
    txSignature?: string | null
    executedAt?: Date | string | null
    amountIn?: number | null
    amountOut?: number | null
    slippage?: number | null
    createdAt?: Date | string
    strategy: StrategyConfigCreateNestedOneWithoutSignalsInput
  }

  export type TradeSignalUncheckedCreateInput = {
    id?: string
    strategyId: string
    signal: string
    price: number
    confidence: number
    indicators: JsonNullValueInput | InputJsonValue
    reason: string
    executed?: boolean
    txSignature?: string | null
    executedAt?: Date | string | null
    amountIn?: number | null
    amountOut?: number | null
    slippage?: number | null
    createdAt?: Date | string
  }

  export type TradeSignalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    signal?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    confidence?: FloatFieldUpdateOperationsInput | number
    indicators?: JsonNullValueInput | InputJsonValue
    reason?: StringFieldUpdateOperationsInput | string
    executed?: BoolFieldUpdateOperationsInput | boolean
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountIn?: NullableFloatFieldUpdateOperationsInput | number | null
    amountOut?: NullableFloatFieldUpdateOperationsInput | number | null
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    strategy?: StrategyConfigUpdateOneRequiredWithoutSignalsNestedInput
  }

  export type TradeSignalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    strategyId?: StringFieldUpdateOperationsInput | string
    signal?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    confidence?: FloatFieldUpdateOperationsInput | number
    indicators?: JsonNullValueInput | InputJsonValue
    reason?: StringFieldUpdateOperationsInput | string
    executed?: BoolFieldUpdateOperationsInput | boolean
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountIn?: NullableFloatFieldUpdateOperationsInput | number | null
    amountOut?: NullableFloatFieldUpdateOperationsInput | number | null
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeSignalCreateManyInput = {
    id?: string
    strategyId: string
    signal: string
    price: number
    confidence: number
    indicators: JsonNullValueInput | InputJsonValue
    reason: string
    executed?: boolean
    txSignature?: string | null
    executedAt?: Date | string | null
    amountIn?: number | null
    amountOut?: number | null
    slippage?: number | null
    createdAt?: Date | string
  }

  export type TradeSignalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    signal?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    confidence?: FloatFieldUpdateOperationsInput | number
    indicators?: JsonNullValueInput | InputJsonValue
    reason?: StringFieldUpdateOperationsInput | string
    executed?: BoolFieldUpdateOperationsInput | boolean
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountIn?: NullableFloatFieldUpdateOperationsInput | number | null
    amountOut?: NullableFloatFieldUpdateOperationsInput | number | null
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeSignalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    strategyId?: StringFieldUpdateOperationsInput | string
    signal?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    confidence?: FloatFieldUpdateOperationsInput | number
    indicators?: JsonNullValueInput | InputJsonValue
    reason?: StringFieldUpdateOperationsInput | string
    executed?: BoolFieldUpdateOperationsInput | boolean
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountIn?: NullableFloatFieldUpdateOperationsInput | number | null
    amountOut?: NullableFloatFieldUpdateOperationsInput | number | null
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateInput = {
    id?: string
    walletAddress: string
    tokenPair: string
    type: string
    amountIn: number
    amountOut: number
    price: number
    slippage: number
    txSignature: string
    blockTime?: Date | string | null
    status: string
    strategyId?: string | null
    signalId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeUncheckedCreateInput = {
    id?: string
    walletAddress: string
    tokenPair: string
    type: string
    amountIn: number
    amountOut: number
    price: number
    slippage: number
    txSignature: string
    blockTime?: Date | string | null
    status: string
    strategyId?: string | null
    signalId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    tokenPair?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amountIn?: FloatFieldUpdateOperationsInput | number
    amountOut?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    slippage?: FloatFieldUpdateOperationsInput | number
    txSignature?: StringFieldUpdateOperationsInput | string
    blockTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    strategyId?: NullableStringFieldUpdateOperationsInput | string | null
    signalId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    tokenPair?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amountIn?: FloatFieldUpdateOperationsInput | number
    amountOut?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    slippage?: FloatFieldUpdateOperationsInput | number
    txSignature?: StringFieldUpdateOperationsInput | string
    blockTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    strategyId?: NullableStringFieldUpdateOperationsInput | string | null
    signalId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeCreateManyInput = {
    id?: string
    walletAddress: string
    tokenPair: string
    type: string
    amountIn: number
    amountOut: number
    price: number
    slippage: number
    txSignature: string
    blockTime?: Date | string | null
    status: string
    strategyId?: string | null
    signalId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TradeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    tokenPair?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amountIn?: FloatFieldUpdateOperationsInput | number
    amountOut?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    slippage?: FloatFieldUpdateOperationsInput | number
    txSignature?: StringFieldUpdateOperationsInput | string
    blockTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    strategyId?: NullableStringFieldUpdateOperationsInput | string | null
    signalId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    tokenPair?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    amountIn?: FloatFieldUpdateOperationsInput | number
    amountOut?: FloatFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    slippage?: FloatFieldUpdateOperationsInput | number
    txSignature?: StringFieldUpdateOperationsInput | string
    blockTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    strategyId?: NullableStringFieldUpdateOperationsInput | string | null
    signalId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandleDataCreateInput = {
    id?: string
    tokenPair: string
    timestamp: Date | string
    open: number
    high: number
    low: number
    close: number
    volume: number
    timeframe: string
    createdAt?: Date | string
  }

  export type CandleDataUncheckedCreateInput = {
    id?: string
    tokenPair: string
    timestamp: Date | string
    open: number
    high: number
    low: number
    close: number
    volume: number
    timeframe: string
    createdAt?: Date | string
  }

  export type CandleDataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenPair?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    open?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
    close?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    timeframe?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandleDataUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenPair?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    open?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
    close?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    timeframe?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandleDataCreateManyInput = {
    id?: string
    tokenPair: string
    timestamp: Date | string
    open: number
    high: number
    low: number
    close: number
    volume: number
    timeframe: string
    createdAt?: Date | string
  }

  export type CandleDataUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenPair?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    open?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
    close?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    timeframe?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CandleDataUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tokenPair?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    open?: FloatFieldUpdateOperationsInput | number
    high?: FloatFieldUpdateOperationsInput | number
    low?: FloatFieldUpdateOperationsInput | number
    close?: FloatFieldUpdateOperationsInput | number
    volume?: FloatFieldUpdateOperationsInput | number
    timeframe?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotConfigCreateInput = {
    id?: string
    walletAddress: string
    isActive?: boolean
    maxTradeAmount?: number
    defaultSlippage?: number
    minConfidence?: number
    allowedTokenPairs: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BotConfigUncheckedCreateInput = {
    id?: string
    walletAddress: string
    isActive?: boolean
    maxTradeAmount?: number
    defaultSlippage?: number
    minConfidence?: number
    allowedTokenPairs: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BotConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    maxTradeAmount?: FloatFieldUpdateOperationsInput | number
    defaultSlippage?: FloatFieldUpdateOperationsInput | number
    minConfidence?: FloatFieldUpdateOperationsInput | number
    allowedTokenPairs?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    maxTradeAmount?: FloatFieldUpdateOperationsInput | number
    defaultSlippage?: FloatFieldUpdateOperationsInput | number
    minConfidence?: FloatFieldUpdateOperationsInput | number
    allowedTokenPairs?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotConfigCreateManyInput = {
    id?: string
    walletAddress: string
    isActive?: boolean
    maxTradeAmount?: number
    defaultSlippage?: number
    minConfidence?: number
    allowedTokenPairs: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BotConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    maxTradeAmount?: FloatFieldUpdateOperationsInput | number
    defaultSlippage?: FloatFieldUpdateOperationsInput | number
    minConfidence?: FloatFieldUpdateOperationsInput | number
    allowedTokenPairs?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    maxTradeAmount?: FloatFieldUpdateOperationsInput | number
    defaultSlippage?: FloatFieldUpdateOperationsInput | number
    minConfidence?: FloatFieldUpdateOperationsInput | number
    allowedTokenPairs?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TradeSignalListRelationFilter = {
    every?: TradeSignalWhereInput
    some?: TradeSignalWhereInput
    none?: TradeSignalWhereInput
  }

  export type TradeSignalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StrategyConfigCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    walletAddress?: SortOrder
    tokenPair?: SortOrder
    strategyType?: SortOrder
    config?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StrategyConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    walletAddress?: SortOrder
    tokenPair?: SortOrder
    strategyType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StrategyConfigMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    walletAddress?: SortOrder
    tokenPair?: SortOrder
    strategyType?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StrategyConfigScalarRelationFilter = {
    is?: StrategyConfigWhereInput
    isNot?: StrategyConfigWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TradeSignalCountOrderByAggregateInput = {
    id?: SortOrder
    strategyId?: SortOrder
    signal?: SortOrder
    price?: SortOrder
    confidence?: SortOrder
    indicators?: SortOrder
    reason?: SortOrder
    executed?: SortOrder
    txSignature?: SortOrder
    executedAt?: SortOrder
    amountIn?: SortOrder
    amountOut?: SortOrder
    slippage?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeSignalAvgOrderByAggregateInput = {
    price?: SortOrder
    confidence?: SortOrder
    amountIn?: SortOrder
    amountOut?: SortOrder
    slippage?: SortOrder
  }

  export type TradeSignalMaxOrderByAggregateInput = {
    id?: SortOrder
    strategyId?: SortOrder
    signal?: SortOrder
    price?: SortOrder
    confidence?: SortOrder
    reason?: SortOrder
    executed?: SortOrder
    txSignature?: SortOrder
    executedAt?: SortOrder
    amountIn?: SortOrder
    amountOut?: SortOrder
    slippage?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeSignalMinOrderByAggregateInput = {
    id?: SortOrder
    strategyId?: SortOrder
    signal?: SortOrder
    price?: SortOrder
    confidence?: SortOrder
    reason?: SortOrder
    executed?: SortOrder
    txSignature?: SortOrder
    executedAt?: SortOrder
    amountIn?: SortOrder
    amountOut?: SortOrder
    slippage?: SortOrder
    createdAt?: SortOrder
  }

  export type TradeSignalSumOrderByAggregateInput = {
    price?: SortOrder
    confidence?: SortOrder
    amountIn?: SortOrder
    amountOut?: SortOrder
    slippage?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type TradeCountOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    tokenPair?: SortOrder
    type?: SortOrder
    amountIn?: SortOrder
    amountOut?: SortOrder
    price?: SortOrder
    slippage?: SortOrder
    txSignature?: SortOrder
    blockTime?: SortOrder
    status?: SortOrder
    strategyId?: SortOrder
    signalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeAvgOrderByAggregateInput = {
    amountIn?: SortOrder
    amountOut?: SortOrder
    price?: SortOrder
    slippage?: SortOrder
  }

  export type TradeMaxOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    tokenPair?: SortOrder
    type?: SortOrder
    amountIn?: SortOrder
    amountOut?: SortOrder
    price?: SortOrder
    slippage?: SortOrder
    txSignature?: SortOrder
    blockTime?: SortOrder
    status?: SortOrder
    strategyId?: SortOrder
    signalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeMinOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    tokenPair?: SortOrder
    type?: SortOrder
    amountIn?: SortOrder
    amountOut?: SortOrder
    price?: SortOrder
    slippage?: SortOrder
    txSignature?: SortOrder
    blockTime?: SortOrder
    status?: SortOrder
    strategyId?: SortOrder
    signalId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TradeSumOrderByAggregateInput = {
    amountIn?: SortOrder
    amountOut?: SortOrder
    price?: SortOrder
    slippage?: SortOrder
  }

  export type CandleDataTokenPairTimestampTimeframeCompoundUniqueInput = {
    tokenPair: string
    timestamp: Date | string
    timeframe: string
  }

  export type CandleDataCountOrderByAggregateInput = {
    id?: SortOrder
    tokenPair?: SortOrder
    timestamp?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
    timeframe?: SortOrder
    createdAt?: SortOrder
  }

  export type CandleDataAvgOrderByAggregateInput = {
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
  }

  export type CandleDataMaxOrderByAggregateInput = {
    id?: SortOrder
    tokenPair?: SortOrder
    timestamp?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
    timeframe?: SortOrder
    createdAt?: SortOrder
  }

  export type CandleDataMinOrderByAggregateInput = {
    id?: SortOrder
    tokenPair?: SortOrder
    timestamp?: SortOrder
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
    timeframe?: SortOrder
    createdAt?: SortOrder
  }

  export type CandleDataSumOrderByAggregateInput = {
    open?: SortOrder
    high?: SortOrder
    low?: SortOrder
    close?: SortOrder
    volume?: SortOrder
  }

  export type BotConfigCountOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    isActive?: SortOrder
    maxTradeAmount?: SortOrder
    defaultSlippage?: SortOrder
    minConfidence?: SortOrder
    allowedTokenPairs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BotConfigAvgOrderByAggregateInput = {
    maxTradeAmount?: SortOrder
    defaultSlippage?: SortOrder
    minConfidence?: SortOrder
  }

  export type BotConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    isActive?: SortOrder
    maxTradeAmount?: SortOrder
    defaultSlippage?: SortOrder
    minConfidence?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BotConfigMinOrderByAggregateInput = {
    id?: SortOrder
    walletAddress?: SortOrder
    isActive?: SortOrder
    maxTradeAmount?: SortOrder
    defaultSlippage?: SortOrder
    minConfidence?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BotConfigSumOrderByAggregateInput = {
    maxTradeAmount?: SortOrder
    defaultSlippage?: SortOrder
    minConfidence?: SortOrder
  }

  export type TradeSignalCreateNestedManyWithoutStrategyInput = {
    create?: XOR<TradeSignalCreateWithoutStrategyInput, TradeSignalUncheckedCreateWithoutStrategyInput> | TradeSignalCreateWithoutStrategyInput[] | TradeSignalUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: TradeSignalCreateOrConnectWithoutStrategyInput | TradeSignalCreateOrConnectWithoutStrategyInput[]
    createMany?: TradeSignalCreateManyStrategyInputEnvelope
    connect?: TradeSignalWhereUniqueInput | TradeSignalWhereUniqueInput[]
  }

  export type TradeSignalUncheckedCreateNestedManyWithoutStrategyInput = {
    create?: XOR<TradeSignalCreateWithoutStrategyInput, TradeSignalUncheckedCreateWithoutStrategyInput> | TradeSignalCreateWithoutStrategyInput[] | TradeSignalUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: TradeSignalCreateOrConnectWithoutStrategyInput | TradeSignalCreateOrConnectWithoutStrategyInput[]
    createMany?: TradeSignalCreateManyStrategyInputEnvelope
    connect?: TradeSignalWhereUniqueInput | TradeSignalWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TradeSignalUpdateManyWithoutStrategyNestedInput = {
    create?: XOR<TradeSignalCreateWithoutStrategyInput, TradeSignalUncheckedCreateWithoutStrategyInput> | TradeSignalCreateWithoutStrategyInput[] | TradeSignalUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: TradeSignalCreateOrConnectWithoutStrategyInput | TradeSignalCreateOrConnectWithoutStrategyInput[]
    upsert?: TradeSignalUpsertWithWhereUniqueWithoutStrategyInput | TradeSignalUpsertWithWhereUniqueWithoutStrategyInput[]
    createMany?: TradeSignalCreateManyStrategyInputEnvelope
    set?: TradeSignalWhereUniqueInput | TradeSignalWhereUniqueInput[]
    disconnect?: TradeSignalWhereUniqueInput | TradeSignalWhereUniqueInput[]
    delete?: TradeSignalWhereUniqueInput | TradeSignalWhereUniqueInput[]
    connect?: TradeSignalWhereUniqueInput | TradeSignalWhereUniqueInput[]
    update?: TradeSignalUpdateWithWhereUniqueWithoutStrategyInput | TradeSignalUpdateWithWhereUniqueWithoutStrategyInput[]
    updateMany?: TradeSignalUpdateManyWithWhereWithoutStrategyInput | TradeSignalUpdateManyWithWhereWithoutStrategyInput[]
    deleteMany?: TradeSignalScalarWhereInput | TradeSignalScalarWhereInput[]
  }

  export type TradeSignalUncheckedUpdateManyWithoutStrategyNestedInput = {
    create?: XOR<TradeSignalCreateWithoutStrategyInput, TradeSignalUncheckedCreateWithoutStrategyInput> | TradeSignalCreateWithoutStrategyInput[] | TradeSignalUncheckedCreateWithoutStrategyInput[]
    connectOrCreate?: TradeSignalCreateOrConnectWithoutStrategyInput | TradeSignalCreateOrConnectWithoutStrategyInput[]
    upsert?: TradeSignalUpsertWithWhereUniqueWithoutStrategyInput | TradeSignalUpsertWithWhereUniqueWithoutStrategyInput[]
    createMany?: TradeSignalCreateManyStrategyInputEnvelope
    set?: TradeSignalWhereUniqueInput | TradeSignalWhereUniqueInput[]
    disconnect?: TradeSignalWhereUniqueInput | TradeSignalWhereUniqueInput[]
    delete?: TradeSignalWhereUniqueInput | TradeSignalWhereUniqueInput[]
    connect?: TradeSignalWhereUniqueInput | TradeSignalWhereUniqueInput[]
    update?: TradeSignalUpdateWithWhereUniqueWithoutStrategyInput | TradeSignalUpdateWithWhereUniqueWithoutStrategyInput[]
    updateMany?: TradeSignalUpdateManyWithWhereWithoutStrategyInput | TradeSignalUpdateManyWithWhereWithoutStrategyInput[]
    deleteMany?: TradeSignalScalarWhereInput | TradeSignalScalarWhereInput[]
  }

  export type StrategyConfigCreateNestedOneWithoutSignalsInput = {
    create?: XOR<StrategyConfigCreateWithoutSignalsInput, StrategyConfigUncheckedCreateWithoutSignalsInput>
    connectOrCreate?: StrategyConfigCreateOrConnectWithoutSignalsInput
    connect?: StrategyConfigWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StrategyConfigUpdateOneRequiredWithoutSignalsNestedInput = {
    create?: XOR<StrategyConfigCreateWithoutSignalsInput, StrategyConfigUncheckedCreateWithoutSignalsInput>
    connectOrCreate?: StrategyConfigCreateOrConnectWithoutSignalsInput
    upsert?: StrategyConfigUpsertWithoutSignalsInput
    connect?: StrategyConfigWhereUniqueInput
    update?: XOR<XOR<StrategyConfigUpdateToOneWithWhereWithoutSignalsInput, StrategyConfigUpdateWithoutSignalsInput>, StrategyConfigUncheckedUpdateWithoutSignalsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type TradeSignalCreateWithoutStrategyInput = {
    id?: string
    signal: string
    price: number
    confidence: number
    indicators: JsonNullValueInput | InputJsonValue
    reason: string
    executed?: boolean
    txSignature?: string | null
    executedAt?: Date | string | null
    amountIn?: number | null
    amountOut?: number | null
    slippage?: number | null
    createdAt?: Date | string
  }

  export type TradeSignalUncheckedCreateWithoutStrategyInput = {
    id?: string
    signal: string
    price: number
    confidence: number
    indicators: JsonNullValueInput | InputJsonValue
    reason: string
    executed?: boolean
    txSignature?: string | null
    executedAt?: Date | string | null
    amountIn?: number | null
    amountOut?: number | null
    slippage?: number | null
    createdAt?: Date | string
  }

  export type TradeSignalCreateOrConnectWithoutStrategyInput = {
    where: TradeSignalWhereUniqueInput
    create: XOR<TradeSignalCreateWithoutStrategyInput, TradeSignalUncheckedCreateWithoutStrategyInput>
  }

  export type TradeSignalCreateManyStrategyInputEnvelope = {
    data: TradeSignalCreateManyStrategyInput | TradeSignalCreateManyStrategyInput[]
    skipDuplicates?: boolean
  }

  export type TradeSignalUpsertWithWhereUniqueWithoutStrategyInput = {
    where: TradeSignalWhereUniqueInput
    update: XOR<TradeSignalUpdateWithoutStrategyInput, TradeSignalUncheckedUpdateWithoutStrategyInput>
    create: XOR<TradeSignalCreateWithoutStrategyInput, TradeSignalUncheckedCreateWithoutStrategyInput>
  }

  export type TradeSignalUpdateWithWhereUniqueWithoutStrategyInput = {
    where: TradeSignalWhereUniqueInput
    data: XOR<TradeSignalUpdateWithoutStrategyInput, TradeSignalUncheckedUpdateWithoutStrategyInput>
  }

  export type TradeSignalUpdateManyWithWhereWithoutStrategyInput = {
    where: TradeSignalScalarWhereInput
    data: XOR<TradeSignalUpdateManyMutationInput, TradeSignalUncheckedUpdateManyWithoutStrategyInput>
  }

  export type TradeSignalScalarWhereInput = {
    AND?: TradeSignalScalarWhereInput | TradeSignalScalarWhereInput[]
    OR?: TradeSignalScalarWhereInput[]
    NOT?: TradeSignalScalarWhereInput | TradeSignalScalarWhereInput[]
    id?: StringFilter<"TradeSignal"> | string
    strategyId?: StringFilter<"TradeSignal"> | string
    signal?: StringFilter<"TradeSignal"> | string
    price?: FloatFilter<"TradeSignal"> | number
    confidence?: FloatFilter<"TradeSignal"> | number
    indicators?: JsonFilter<"TradeSignal">
    reason?: StringFilter<"TradeSignal"> | string
    executed?: BoolFilter<"TradeSignal"> | boolean
    txSignature?: StringNullableFilter<"TradeSignal"> | string | null
    executedAt?: DateTimeNullableFilter<"TradeSignal"> | Date | string | null
    amountIn?: FloatNullableFilter<"TradeSignal"> | number | null
    amountOut?: FloatNullableFilter<"TradeSignal"> | number | null
    slippage?: FloatNullableFilter<"TradeSignal"> | number | null
    createdAt?: DateTimeFilter<"TradeSignal"> | Date | string
  }

  export type StrategyConfigCreateWithoutSignalsInput = {
    id?: string
    userId: string
    walletAddress: string
    tokenPair: string
    strategyType: string
    config: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StrategyConfigUncheckedCreateWithoutSignalsInput = {
    id?: string
    userId: string
    walletAddress: string
    tokenPair: string
    strategyType: string
    config: JsonNullValueInput | InputJsonValue
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StrategyConfigCreateOrConnectWithoutSignalsInput = {
    where: StrategyConfigWhereUniqueInput
    create: XOR<StrategyConfigCreateWithoutSignalsInput, StrategyConfigUncheckedCreateWithoutSignalsInput>
  }

  export type StrategyConfigUpsertWithoutSignalsInput = {
    update: XOR<StrategyConfigUpdateWithoutSignalsInput, StrategyConfigUncheckedUpdateWithoutSignalsInput>
    create: XOR<StrategyConfigCreateWithoutSignalsInput, StrategyConfigUncheckedCreateWithoutSignalsInput>
    where?: StrategyConfigWhereInput
  }

  export type StrategyConfigUpdateToOneWithWhereWithoutSignalsInput = {
    where?: StrategyConfigWhereInput
    data: XOR<StrategyConfigUpdateWithoutSignalsInput, StrategyConfigUncheckedUpdateWithoutSignalsInput>
  }

  export type StrategyConfigUpdateWithoutSignalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    tokenPair?: StringFieldUpdateOperationsInput | string
    strategyType?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StrategyConfigUncheckedUpdateWithoutSignalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    walletAddress?: StringFieldUpdateOperationsInput | string
    tokenPair?: StringFieldUpdateOperationsInput | string
    strategyType?: StringFieldUpdateOperationsInput | string
    config?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeSignalCreateManyStrategyInput = {
    id?: string
    signal: string
    price: number
    confidence: number
    indicators: JsonNullValueInput | InputJsonValue
    reason: string
    executed?: boolean
    txSignature?: string | null
    executedAt?: Date | string | null
    amountIn?: number | null
    amountOut?: number | null
    slippage?: number | null
    createdAt?: Date | string
  }

  export type TradeSignalUpdateWithoutStrategyInput = {
    id?: StringFieldUpdateOperationsInput | string
    signal?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    confidence?: FloatFieldUpdateOperationsInput | number
    indicators?: JsonNullValueInput | InputJsonValue
    reason?: StringFieldUpdateOperationsInput | string
    executed?: BoolFieldUpdateOperationsInput | boolean
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountIn?: NullableFloatFieldUpdateOperationsInput | number | null
    amountOut?: NullableFloatFieldUpdateOperationsInput | number | null
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeSignalUncheckedUpdateWithoutStrategyInput = {
    id?: StringFieldUpdateOperationsInput | string
    signal?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    confidence?: FloatFieldUpdateOperationsInput | number
    indicators?: JsonNullValueInput | InputJsonValue
    reason?: StringFieldUpdateOperationsInput | string
    executed?: BoolFieldUpdateOperationsInput | boolean
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountIn?: NullableFloatFieldUpdateOperationsInput | number | null
    amountOut?: NullableFloatFieldUpdateOperationsInput | number | null
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TradeSignalUncheckedUpdateManyWithoutStrategyInput = {
    id?: StringFieldUpdateOperationsInput | string
    signal?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    confidence?: FloatFieldUpdateOperationsInput | number
    indicators?: JsonNullValueInput | InputJsonValue
    reason?: StringFieldUpdateOperationsInput | string
    executed?: BoolFieldUpdateOperationsInput | boolean
    txSignature?: NullableStringFieldUpdateOperationsInput | string | null
    executedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    amountIn?: NullableFloatFieldUpdateOperationsInput | number | null
    amountOut?: NullableFloatFieldUpdateOperationsInput | number | null
    slippage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}