import { Pressable, Text, View } from "react-native";
import { styles } from "../styles/home.styles";

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const DigitSelector = ({
  type,
  selected,
  toggleDigit,
}: {
  type: "must" | "cant";
  selected: number[];
  toggleDigit: (x: number, type: "must" | "cant") => void;
}) => {
  return (
    <View style={styles.digitGrid}>
      {DIGITS.map((digit) => {
        const active = selected.includes(digit);

        return (
          <Pressable
            key={digit}
            onPress={() => toggleDigit(digit, type)}
            style={[
              styles.digitButton,
              active &&
                (type === "must" ? styles.mustActive : styles.cantActive),
            ]}
          >
            <Text style={[styles.digitText, active && styles.activeDigitText]}>
              {digit}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};
