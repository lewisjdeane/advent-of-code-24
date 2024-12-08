export function createCounter<T>(list: T[]) {
  const countMap = new Map<T, number>();
  for (const num of list) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }
  return countMap;
}
