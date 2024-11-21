import React,{useState} from "react";
import { View, Text} from "react-native";
import { Calendar } from "react-native-calendars";
import { TextInput, Button } from "react-native-paper";
import styles from "./style";



const Income = ({setComponent}) => {

    const [date, setDate] = useState(null);  //Päivämäärä
    const[income,setIncome] = useState();    //Tulot
    const[description, setDescription] = useState();  //Palkka, lahja, pullonpalautus?

    function dateSelected(day) {
        setDate(day);
    }

    return(
        <View style={styles.container}>

            <View style={styles.calendar}>
                <Calendar  onDayPress={dateSelected} />
            </View>
            <Text style={{color:'white'}}>Selected Date: {date ? date.dateString : "No date selected"}</Text>
            <TextInput 
                style={styles.textInput}
                mode="outlined"
                label={'Income'}
                keyboardType="Numeric"
                onChangeText={income => setIncome(income)}
            />
            <TextInput
                style={styles.textInput}
                mode="outlined"
                label={'Description'} // voi merkata rahojen tulonlähteen esim. palkka, lahja, tms.
                onChangeText={description => setDescription(description)}

            />
            <Button 
                style={styles.addButton}
                icon="plus"
                mode="outlined"
                onPress={() => console.log(' Income: ' + income + ' Description: ' + description)}>
                Add
            </Button>

            <Text style={{color:'white'}}>Date:{date ? date.dateString : "-"} Income: {income} Description: {description}</Text>
            <Button icon="arrow-left-top" title="Back" onPress={() => setComponent(null)} />
        </View>
    )
}
            
        

export default Income;