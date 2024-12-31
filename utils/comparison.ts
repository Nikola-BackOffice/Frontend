export function areValuesEqual<T extends Record<string, any>>(a: Partial<T>, b: Partial<T>): boolean {
  const isEqual = (a: any, b: any): boolean => {
    if (a === b) return true;

    // Handle Date objects
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() === b.getTime();
    }

    // Handle objects recursively
    if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);

      if (keysA.length !== keysB.length) return false;

      return keysA.every((key) => isEqual(a[key], b[key]));
    }

    return false;
  };

  return isEqual(a, b);
}
