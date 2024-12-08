import { countIf } from "../utils/count-if.ts";
import { createCounter } from "../utils/counter.ts";

// Constants for the search patterns
const XMAS_PATTERN = ["X", "M", "A", "S"];
const MAS_PATTERN = ["M", "A", "S"];

interface Point {
  letter: string;
  x: number;
  y: number;
}

class WordMatch {
  readonly points: Point[];

  constructor(points: Point[]) {
    this.points = points;
  }

  get centerPoint(): Point {
    return this.points.find((point) => point.letter === "A")!;
  }

  get isDiagonal(): boolean {
    const [first, second] = this.points;
    return first.x !== second.x && first.y !== second.y;
  }
}

class Grid {
  private readonly grid: string[][];

  constructor(input: string) {
    this.grid = input.split("\n").map((line) => line.split(""));
  }

  private isInBounds(x: number, y: number): boolean {
    return x >= 0 && y >= 0 && x < this.grid[0].length && y < this.grid.length;
  }

  private letterAt(x: number, y: number): string {
    return this.grid[y][x];
  }

  findAllMatches(pattern: string[]): WordMatch[] {
    const matches: WordMatch[] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        matches.push(...this.findMatchesAtPosition(x, y, pattern));
      }
    }
    return matches;
  }

  private findMatchesAtPosition(
    x: number,
    y: number,
    pattern: string[]
  ): WordMatch[] {
    const matches: WordMatch[] = [];
    // Reverse, zero, forward. X and Y can be any of these independently.
    const directions = [-1, 0, 1];

    for (const stepX of directions) {
      for (const stepY of directions) {
        // Skip the zero step, doesn't make sense
        if (stepX === 0 && stepY === 0) continue;

        const match = this.findMatchAtPositionWithDirection(
          x,
          y,
          stepX,
          stepY,
          pattern
        );
        if (match) {
          matches.push(match);
        }
      }
    }

    return matches;
  }

  private findMatchAtPositionWithDirection(
    startX: number,
    startY: number,
    stepX: number,
    stepY: number,
    pattern: string[]
  ): WordMatch | undefined {
    let x = startX;
    let y = startY;
    const matchPoints: Point[] = [];

    for (const expectedLetter of pattern) {
      if (!this.isInBounds(x, y) || this.letterAt(x, y) !== expectedLetter) {
        return undefined;
      }

      matchPoints.push({ letter: expectedLetter, x, y });
      x += stepX;
      y += stepY;
    }

    return new WordMatch(matchPoints);
  }

  get height(): number {
    return this.grid.length;
  }

  get width(): number {
    return this.grid[0].length;
  }
}

function countXShapedPatterns(matches: WordMatch[]): number {
  const diagonalMatches = matches.filter((match) => match.isDiagonal);
  const centerPoints = diagonalMatches.map(
    (match) => `${match.centerPoint.x},${match.centerPoint.y}`
  );
  const pointFrequencies = createCounter(centerPoints);

  return countIf(Array.from(pointFrequencies.values()), (count) => count > 1);
}

async function main() {
  try {
    const input = await Deno.readTextFile("inputs/day04.txt");
    const grid = new Grid(input);

    // Part 1: Find all XMAS patterns
    const xmasMatches = grid.findAllMatches(XMAS_PATTERN);
    console.log("Part 1:", xmasMatches.length);

    // Part 2: Find X-shaped MAS patterns
    const masMatches = grid.findAllMatches(MAS_PATTERN);
    console.log("Part 2:", countXShapedPatterns(masMatches));
  } catch (error) {
    console.error("Error reading input file:", error);
  }
}

await main();
