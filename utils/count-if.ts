export function countIf<T>(arr: T[], predicate: (item: T) => boolean) {
  return arr.reduce((acc, item) => {
    if (predicate(item)) {
      return acc + 1;
    }
    return acc;
  }, 0);
}
