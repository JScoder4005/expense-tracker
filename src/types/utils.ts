/**
 * Utility types for the Expense Tracker application
 */

/**
 * Makes specific properties of a type optional
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Makes specific properties of a type required
 */
export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Type guard for checking if a value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Extracts the promise type from a Promise
 */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

/**
 * Makes all properties of a type nullable
 */
export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

/**
 * Deep partial type
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Enum-like object type
 */
export type EnumLike = Record<string, string | number>;

/**
 * Extract enum values
 */
export type ValueOf<T> = T[keyof T];
