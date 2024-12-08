/**
 * Solution for Advent of Code Day 2: Red-Nosed Reports
 * Analyzes reactor safety reports to identify safe level sequences.
 */

import { countIf } from "../utils/count-if.ts";

type LevelSequence = number[];

/**
 * Checks if adjacent numbers in a sequence have valid differences (1-3).
 */
function hasValidDifferences(
  sequence: LevelSequence,
  checkFn: (diff: number) => boolean
): boolean {
  return sequence.every((num, index) => {
    if (index === 0) return true;
    const diff = num - sequence[index - 1];
    return checkFn(diff);
  });
}

/**
 * Determines if a sequence of levels is strictly increasing with valid steps.
 */
function isStrictlyIncreasing(sequence: LevelSequence): boolean {
  return hasValidDifferences(sequence, (diff) => diff > 0 && diff <= 3);
}

/**
 * Determines if a sequence of levels is strictly decreasing with valid steps.
 */
function isStrictlyDecreasing(sequence: LevelSequence): boolean {
  return hasValidDifferences(sequence, (diff) => diff < 0 && diff >= -3);
}

/**
 * Checks if a sequence of levels is safe according to reactor criteria.
 */
function isSequenceSafe(sequence: LevelSequence): boolean {
  return isStrictlyIncreasing(sequence) || isStrictlyDecreasing(sequence);
}

/**
 * Checks if an unsafe sequence can be made safe by removing one number.
 */
function canBeMadeSafe(sequence: LevelSequence): boolean {
  return sequence.some((_, index) => {
    const modifiedSequence = sequence.filter((_, i) => i !== index);
    return isSequenceSafe(modifiedSequence);
  });
}

/**
 * Part 1: Count sequences that are naturally safe.
 */
function countSafeSequences(sequences: LevelSequence[]): number {
  return countIf(sequences, isSequenceSafe);
}

/**
 * Part 2: Count sequences that are either naturally safe or can be made safe.
 */
function countSafeSequencesWithDampener(sequences: LevelSequence[]): number {
  const unsafeSequences = sequences.filter((seq) => !isSequenceSafe(seq));
  return (
    countSafeSequences(sequences) + countIf(unsafeSequences, canBeMadeSafe)
  );
}

/**
 * Parses the input string into arrays of numbers.
 */
function parseInput(input: string): LevelSequence[] {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map(Number));
}

async function main() {
  const input = await Deno.readTextFile("inputs/day02.txt");
  const sequences = parseInput(input);

  console.log("Part 1 - Safe Sequences:", countSafeSequences(sequences));
  console.log(
    "Part 2 - Safe Sequences with Dampener:",
    countSafeSequencesWithDampener(sequences)
  );
}

await main();
