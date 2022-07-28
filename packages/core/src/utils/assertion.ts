export const __DEV__ = process.env.NODE_ENV !== "production";

export function isNumber(value: any): value is number {
  return typeof value === "number";
}

export function isString(value: any): value is string {
  return Object.prototype.toString.call(value) === "[object String]";
}
