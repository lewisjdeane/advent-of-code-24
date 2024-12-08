/**
 * Solution for Advent of Code Day 3: Mull It Over
 * Processes corrupted memory containing multiplication instructions.
 */

/**
 * Extracts and processes valid multiplication instructions from a string.
 */
function processMultiplicationInstructions(input: string): number {
  const MULTIPLICATION_PATTERN = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/g;
  const matches = input.matchAll(MULTIPLICATION_PATTERN);

  return Array.from(matches).reduce((sum, match) => {
    const [, num1Str, num2Str] = match;
    return sum + Number(num1Str) * Number(num2Str);
  }, 0);
}

/**
 * Processes instructions while respecting do() and don't() control statements.
 */
function processControlledInstructions(input: string): number {
  const CONTROL_PATTERN = /(do\(\)|don't\(\))/;
  const sections = input.split(CONTROL_PATTERN);

  let isEnabled = true;
  const enabledSections = sections.reduce((acc: string[], section) => {
    switch (section) {
      case "do()":
        isEnabled = true;
        break;
      case "don't()":
        isEnabled = false;
        break;
      default:
        if (isEnabled && section) {
          acc.push(section);
        }
    }
    return acc;
  }, []);

  return enabledSections.reduce(
    (sum, section) => sum + processMultiplicationInstructions(section),
    0
  );
}

/**
 * Solves part 1: Process all multiplication instructions.
 */
function solvePart1(input: string): number {
  return processMultiplicationInstructions(input);
}

/**
 * Solves part 2: Process multiplication instructions with control statements.
 */
function solvePart2(input: string): number {
  return processControlledInstructions(input);
}

async function main() {
  try {
    const input = await Deno.readTextFile("inputs/day03.txt");

    console.log("Part 1 - Total of all multiplications:", solvePart1(input));
    console.log(
      "Part 2 - Total of enabled multiplications:",
      solvePart2(input)
    );
  } catch (error) {
    console.error("Error reading input file:", error);
  }
}

await main();
