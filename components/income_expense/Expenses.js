import React,{useState} from "react";
import { View, Text} from "react-native";
import { Calendar } from "react-native-calendars";
import { TextInput, Button } from "react-native-paper";
import SelectCategory from "./SelectCategory";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Expenses = ({setComponent}) => {

    const [date, setDate] = useState(null);  //Päivämäärä
    const[expense,setExpense] = useState();    //Tulot
    const[description, setDescription] = useState();  //Palkka, lahja, pullonpalautus?
    const[selectedCategory, setSelectedCategory] = useState(); // kategoria


    // haetaan jo tallennetut menot ja lisätään uudet menot
    const saveExpense = async (newExpense) => {
        try{
            const prevExpenses = await AsyncStorage.getItem('expenses');
            const expenses = prevExpenses ? JSON.parse(prevExpenses) : [];
            expenses.push(newExpense);
            await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
            console.log('Expense saved...');

        }catch (error) {
            console.log('Failed', error);
            
        }
    }

    const addExpense = () => {
        const newExpense = { 
            date: date.dateString,
            expense,
            description,
            category: selectedCategory 
        };
        saveExpense(newExpense);
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
            <View>
                <SelectCategory
                    selectedCategory={selectedCategory}
                    onSelectCategory={(category) => setSelectedCategory(category)}
                />
            </View>
            <TextInput 
                style={styles.textInput}
                mode="outlined"
                label={'Expense'}
                keyboardType="Numeric"
                onChangeText={expense => setExpense(expense)}
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
                onPress={addExpense}>
                Add
            </Button>

            <Text style={{color:'white'}}>Date:{date ? date.dateString : "-"} Expense: {expense} Description: {description} Category: {selectedCategory}</Text>
            <Button icon="arrow-left-top" title="Back" onPress={() => setComponent(null)} />
        </View>
    )
}
            
        

export default Expenses;