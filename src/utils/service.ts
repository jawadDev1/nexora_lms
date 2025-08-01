export function validateNoNulls<T>(obj: T, excludeKeys: string[] = []): void {
  for (const key in obj) {
    if (excludeKeys.includes(key)) continue;

    const value = obj[key];
    if (value === null || value === undefined) {
      throw new Error(`Field '${key}' cannot be null or undefined.`);
    }
  }
}
