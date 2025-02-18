export function isDataObject<T extends object>(data: unknown): data is T {
  return typeof data === "object" && data !== null;
}
