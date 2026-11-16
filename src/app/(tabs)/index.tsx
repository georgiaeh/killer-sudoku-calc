import { Counter } from "@/components/Counter";
import { DigitSelector } from "@/components/DigitSelector";
import { generateCombinations } from "@/utils/generate-combinations";
import { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { styles } from "../../styles/home.styles";

export default function HomeScreen() {
  const [targetSum, setTargetSum] = useState(15);
  const [cellCount, setCellCount] = useState(3);
  const [mustContain, setMustContain] = useState<number[]>([]);
  const [cantContain, setCantContain] = useState<number[]>([]);

  const minSum = (cellCount * (cellCount + 1)) / 2;
  const maxSum = (cellCount * (19 - cellCount)) / 2;

  const combinations = useMemo(() => {
    return generateCombinations(cellCount, targetSum, mustContain, cantContain);
  }, [cellCount, targetSum, mustContain, cantContain]);

  function toggleDigit(digit: number, type: "must" | "cant") {
    if (type === "must") {
      setMustContain((prev) =>
        prev.includes(digit)
          ? prev.filter((n) => n !== digit)
          : [...prev, digit],
      );
      setCantContain((prev) => prev.filter((n) => n !== digit));
    } else {
      setCantContain((prev) =>
        prev.includes(digit)
          ? prev.filter((n) => n !== digit)
          : [...prev, digit],
      );
      setMustContain((prev) => prev.filter((n) => n !== digit));
    }
  }

  function changeCells(amount: number) {
    const next = Math.max(1, Math.min(9, cellCount + amount));
    setCellCount(next);

    const nextMin = (next * (next + 1)) / 2;
    const nextMax = (next * (19 - next)) / 2;

    setTargetSum((prev) => Math.max(nextMin, Math.min(nextMax, prev)));
    setMustContain([]);
    setCantContain([]);
  }

  function changeSum(amount: number) {
    setTargetSum((prev) => Math.max(minSum, Math.min(maxSum, prev + amount)));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Target Sum and Number of Cells */}
        <View style={styles.card}>
          <View style={styles.counterRow}>
            <View style={styles.counterSection}>
              <Text style={styles.sectionHeading}>TARGET SUM</Text>
              <Counter
                value={targetSum}
                onChange={setTargetSum}
                min={minSum}
                max={maxSum}
              />
            </View>

            <View style={styles.counterSection}>
              <Text style={styles.sectionHeading}>NUMBER OF CELLS</Text>
              <Counter
                value={cellCount}
                onChange={setCellCount}
                min={1}
                max={9}
              />
            </View>
          </View>

          <Text style={styles.helperText}>
            A {cellCount}-cell cage can total {minSum} to {maxSum}.
          </Text>
        </View>

        {/* Digit Refinement */}
        <View style={styles.card}>
          <Text style={styles.refineHeading}>🔎 REFINE BY KNOWN DIGITS</Text>

          <Text style={styles.mustHeading}>✓ MUST CONTAIN</Text>

          <DigitSelector
            type="must"
            selected={mustContain}
            toggleDigit={toggleDigit}
          />

          <Text style={styles.cantHeading}>× CAN'T CONTAIN</Text>

          <DigitSelector
            type="cant"
            selected={cantContain}
            toggleDigit={toggleDigit}
          />
        </View>

        {/* Possible Combinations */}
        <View style={styles.card}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>POSSIBLE COMBINATIONS</Text>

            <View style={styles.countBadge}>
              <Text style={styles.countText}>{combinations.length} Found</Text>
            </View>
          </View>

          <View style={styles.dashedLine} />

          {combinations.length > 0 ? (
            <View style={styles.combinationsContainer}>
              {combinations.map((combination, index) => (
                <View key={index} style={styles.combinationPill}>
                  <Text style={styles.combinationText}>
                    {combination.join(" , ")}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No combinations found.</Text>
              <Text style={styles.emptySubtext}>
                Try changing your sum or digit selections.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
