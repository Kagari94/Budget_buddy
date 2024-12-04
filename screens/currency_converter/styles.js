
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    // color is set in the component using colors.onBackground
  },
  input: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
    // color and backgroundColor are set in the component
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
  periodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    marginHorizontal: 2,
    paddingVertical: 5,
    minWidth: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  chartContainer: {
    marginTop: 20,
  },
  chartTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  chartStyle: {
    borderRadius: 16,
  },
});

export default styles;
