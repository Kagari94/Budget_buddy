import React,{useState} from "react";
import { View, Text, Alert} from "react-native";
import { Calendar } from "react-native-calendars";
import { TextInput, Button } from "react-native-paper";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Income = ({setComponent}) => {

    const [date, setDate] = useState(null);  //Päivämäärä
    const[income,setIncome] = useState();    //Tulot
    const[description, setDescription] = useState();  //Palkka, lahja, pullonpalautus?

    const saveIncome = async (newIncome) => {
        try{
            const prevIncome = await AsyncStorage.getItem('Income');
            const income = prevIncome ? JSON.parse(prevIncome) : [];
            income.push(newIncome);
            await AsyncStorage.setItem('Income', JSON.stringify(income));
            console.log('Income saved...');

        }catch (error) {
            console.log('Failed', error);
            
        }
    }

    const addIncome = () => {

        if(!date){
            Alert.alert(' You need select a date ')
            return;
        }

        if(!income){
            Alert.alert(' you need to set income')
            return;
        }

        const newIncome = { 
            date: date.dateString,
            income,
            description,
            category: 'Income'
            };
        saveIncome(newIncome);
        console.log('Income added');
        
    }


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
                keyboardType="numeric"
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
                onPress={addIncome}>
                Add
            </Button>

            <Text style={{color:'white'}}>Date:{date ? date.dateString : "-"} Income: {income} Description: {description}</Text>
            <Button icon="arrow-left-top" title="Back" onPress={() => setComponent(null)} />
        </View>
    )
}
            
        

export default Income;