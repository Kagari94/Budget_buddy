
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,

  },
  button: {
    marginBottom: 20,
  },
  swapButton: {
    marginBottom: 20,
  },
  resultCard: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "rgba(255, 215, 0, 0.1)", 
  },
  result: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
    marginTop: 10,
  },
});

export default styles;
