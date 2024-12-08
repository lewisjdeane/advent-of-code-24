/**
 * Solution for Advent of Code Day 1: Historian Hysteria
 * Handles comparing two lists of location IDs and calculating their differences and similarities.
 */

import { createCounter } from "../utils/counter.ts";

interface LocationLists {
  list1: number[];
  list2: number[];
}

/**
 * Calculates the total distance between paired numbers from both lists.
 * Numbers are paired by their position after sorting both lists.
 */
function calculateTotalDistance(list1: number[], list2: number[]): number {
  const sorted1 = [...list1].sort((a, b) => a - b);
  const sorted2 = [...list2].sort((a, b) => a - b);

  return sorted1.reduce((total, curr, index) => {
    return total + Math.abs(curr - sorted2[index]);
  }, 0);
}

/**
 * Calculates the similarity score between two lists.
 * Score is calculated by multiplying each number in list1 by its frequency in list2.
 */
function calculateSimilarityScore(list1: number[], list2: number[]): number {
  const frequencies1 = createCounter(list1);
  const frequencies2 = createCounter(list2);

  return Array.from(frequencies1.entries()).reduce((total, [num, count1]) => {
    const count2 = frequencies2.get(num) || 0;
    return total + num * count1 * count2;
  }, 0);
}

/**
 * Parses the input string into two separate number lists.
 */
function parseInput(input: string): LocationLists {
  const lines = input.trim().split("\n");
  const [list1, list2] = lines.reduce(
    (acc, line) => {
      const [num1, num2] = line.split(/\s+/).map(Number);
      acc[0].push(num1);
      acc[1].push(num2);
      return acc;
    },
    [[], []] as [number[], number[]]
  );

  return { list1, list2 };
}

async function main() {
  const input = await Deno.readTextFile("inputs/day01.txt");
  const { list1, list2 } = parseInput(input);

  // Part 1: Calculate total distance
  const totalDistance = calculateTotalDistance(list1, list2);
  console.log("Part 1 - Total Distance:", totalDistance);

  // Part 2: Calculate similarity score
  const similarityScore = calculateSimilarityScore(list1, list2);
  console.log("Part 2 - Similarity Score:", similarityScore);
}

await main();
