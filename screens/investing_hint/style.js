import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    description: {
      fontSize: 16,
      marginBottom: 20,
      lineHeight: 22,
    },
    image: {
      width: '100%',
      height: 200,
      marginBottom: 20,
      borderRadius: 10,
    },
    calculator: {
      marginTop: 30,
      padding: 20,
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    inputGroup: {
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      marginTop: 5,
    },
    resultGroup: {
      marginTop: 30,
      padding: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      backgroundColor: '#e6f7ff',
    },
    error: {
        color: 'red',
        marginTop: 5,
        fontSize: 14,
      },
  });