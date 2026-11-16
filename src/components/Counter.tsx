
import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../styles/home.styles';

type CounterProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export const Counter = ({
  value,
  onChange,
  min = 1,
  max = 45,
}: CounterProps) => {

  const handleChange = (amount: number) => {
    const newValue = Math.max(min, Math.min(max, value + amount));
    onChange(newValue);
  };

  return (
    <View style={styles.counter}>
      <Pressable
        style={styles.counterButton}
        onPress={() => handleChange(-1)}
      >
        <Text style={styles.counterSymbol}>−</Text>
      </Pressable>

      <TextInput
        style={styles.counterInput}
        value={String(value)}
        onChangeText={(text) => {
          if (text === '') return;

          const number = Number(text);

          if (
            Number.isInteger(number)
          ) {
            onChange(number);
          }
        }}
        keyboardType="number-pad"
        selectTextOnFocus
        maxLength={2}
      />

      <Pressable
        style={styles.counterButton}
        onPress={() => handleChange(1)}
      >
        <Text style={styles.counterSymbol}>+</Text>
      </Pressable>
    </View>
  );
}
