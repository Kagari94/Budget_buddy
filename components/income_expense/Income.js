import React,{useState} from "react";
import { View, Text, Alert} from "react-native";
import { Calendar } from "react-native-calendars";
import { TextInput, Button } from "react-native-paper";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from 'react-native-paper';




const Income = ({setComponent}) => {

    const [date, setDate] = useState(null);  //Päivämäärä
    const[income,setIncome] = useState();    //Tulot
    const[description, setDescription] = useState();  //Palkka, lahja, pullonpalautus?

    const { colors } = useTheme();


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
        
        try{
            saveIncome(newIncome);
            Alert.alert('Income added successfully');
            setComponent(null);
        }catch (error){
            console.log('Failed to save income: ', error);
            Alert.alert('Failed to add income. please try again ')
            
        }
        
    };


    function dateSelected(day) {
        setDate(day);
        }

    return(
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            <View style={styles.calendar}>
                <Calendar  onDayPress={dateSelected} />
            </View>
            <Text style={[styles.label, { color: colors.onBackground }]}>Selected Date: {date ? date.dateString : "No date selected"}</Text>
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

            <Button icon="arrow-left-top" title="Back" onPress={() => setComponent(null)} />
        </View>
    )
}
            
        

export default Income;