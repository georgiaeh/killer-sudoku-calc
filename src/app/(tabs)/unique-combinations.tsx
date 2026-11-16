import { FlatList, Text, View } from "react-native";
import combinationsData from "../../app/consts/unique-combinations.json";
import { styles } from "../../styles/unique-combinations.styles";

const combinations = combinationsData.uniqueCombinations;

export default function UniqueCombinationsScreen() {
  const combinations = combinationsData.uniqueCombinations;

 const groupedCombinations = combinations.reduce((groups, item) => {
  const key = item.cageSize;

  if (!groups[key]) {
    groups[key] = [];
  }

  groups[key].push(item);

  return groups;
}, {} as Record<number, typeof combinations>);

  const groups = Object.entries(groupedCombinations).sort(
    ([a], [b]) => Number(a) - Number(b)
  );

 return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      data={groups}
      keyExtractor={([size]) => size}
      renderItem={({ item: [size, items] }) => (
        <View style={styles.group}>
          <Text style={styles.heading}>
            {size} Digit Combinations
          </Text>

          {items?.map((item) => (
            <View key={item.sum} style={styles.card}>
              <Text style={styles.sum}>Sum: {item.sum}</Text>
              <Text style={styles.digits}>
                {item.digits.join(" ")}
              </Text>
            </View>
          ))}
        </View>
      )}
    />
  );
}




