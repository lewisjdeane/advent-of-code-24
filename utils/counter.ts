export function createCounter<T>(list: T[]) {
  const countMap = new Map<T, number>();
  for (const element of list) {
    countMap.set(element, (countMap.get(element) || 0) + 1);
  }
  return countMap;
}
