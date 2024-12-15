import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { Button, TextInput } from "react-native-paper";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 16,
        backgroundColor: "#f7f9fc",
       },
    calendar: {
        marginBottom: 24,
        borderRadius: 10,
        overflow: "hidden", 
       },
    textInput:{
        marginBottom: 16,
        backgroundColor: "transparent",
        fontSize: 16, 
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5,
      },
    addButton:{
        marginTop:30,
        borderRadius:10,
        marginBottom:20   
    }






  });

  export default styles;
  