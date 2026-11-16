export function generateCombinations(
  cellCount: number,
  targetSum: number,
  mustContain: number[],
  cantContain: number[],
): number[][] {
  const results: number[][] = [];

  function generate(start: number, current: number[], sum: number) {
    if (current.length === cellCount) {
      if (sum === targetSum && mustContain.every((n) => current.includes(n))) {
        results.push([...current]);
      }

      return;
    }

    for (let i = start; i <= 9; i++) {
      if (cantContain.includes(i)) continue;

      const nextSum = sum + i;

      if (nextSum > targetSum) break;

      current.push(i);
      generate(i + 1, current, nextSum);
      current.pop();
    }
  }

  generate(1, [], 0);

  return results;
}
