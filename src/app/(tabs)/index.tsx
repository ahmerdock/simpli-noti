import { Pressable, Text, View } from "react-native";
import {
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from "react-native-unistyles";

const Home = () => {
  const { rt } = useUnistyles();

  const toggleTheme = () => {
    UnistylesRuntime.setTheme(rt.themeName === "light" ? "dark" : "light");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Edit src/app/index.tsx to edit this screen.
      </Text>

      <Pressable style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>
          Switch to {rt.themeName === "light" ? "dark" : "light"}
        </Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.text,
    marginBottom: theme.gap(2),
  },
  button: {
    paddingHorizontal: theme.gap(2),
    paddingVertical: theme.gap(1),
    borderRadius: 8,
    backgroundColor: theme.colors.background,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
}));
