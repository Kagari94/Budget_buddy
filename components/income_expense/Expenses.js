import React,{useEffect, useState} from "react";
import { View, Text, Alert} from "react-native";
import { Calendar } from "react-native-calendars";
import { TextInput, Button } from "react-native-paper";
import SelectCategory from "./SelectCategory";
import CurrencyPicker from '../settings/CurrencyPicker'
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCurrency } from "../../context/currencyContext";
import axios from "axios";



const Expenses = ({setComponent}) => {

    const [date, setDate] = useState(null);  //Päivämäärä
    const[expense,setExpense] = useState();    //Tulot
    const[description, setDescription] = useState();  //Palkka, lahja, pullonpalautus?
    const[selectedCategory, setSelectedCategory] = useState(); // kategoria
    const[expenseCurrency, setExpenseCurrency] = useState(null); // valuutta, jolla kulut halutaan merkata
    const { currency: settingsCurrency } = useCurrency(); // asetuksissa valittu valuutta
    const [convertedAmount, setConvertedAmount] = useState(null); 
    const [conversionDone, setConversionDone] = useState(false);

    useEffect(() => {
        if (expenseCurrency && settingsCurrency && expenseCurrency !== settingsCurrency) {
            convertCurrency();
        }else{
            setConversionDone(false);

        }
    }, [expenseCurrency, settingsCurrency]);

    const convertCurrency = async () => {
        const endpoint = `currencies/${expenseCurrency.toLowerCase()}.json`;
        const apiVersion = "v1";
        const primaryURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/${apiVersion}/${endpoint}`;
       

        try {
            const response = await axios.get(primaryURL);


            if (response.data && response.data[expenseCurrency.toLowerCase()]) {
                const rate = response.data[expenseCurrency.toLowerCase()][settingsCurrency.toLowerCase()];
                if (rate) {
                    const newConvertedAmount = (parseFloat(expense) * rate).toFixed(2);
                    setConvertedAmount(newConvertedAmount);
                    setConversionDone(true);
                } else {
                    throw new Error("Target currency rate not found");
                }
            } else {
                throw new Error("Invalid data format from primary conversion API");
            }
        } catch (error) {
            console.error("Conversion Error: ", error);
            Alert.alert("Requested currency not found");
        }


    };



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

        if (!date) {
            Alert.alert(' You need select a date ')
            return;
        }

        if (!expense) {
            Alert.alert(' you need to set expense')
            return;
        }

        if (!selectedCategory) {
            Alert.alert(' you need to select category ')
            return;
        }

        if (!settingsCurrency) {
            Alert.alert(' You need to select currency from settings ')
            return;
        }


        const finalExpense = conversionDone ? convertedAmount : expense;

        const newExpense = {
            date: date.dateString,
            expense: finalExpense,
            description,
            category: selectedCategory,
            currency: settingsCurrency
        };
        saveExpense(newExpense);
            


    }

    const handleCurrencySelect = (currency) => {
        
        setExpenseCurrency(currency);
      };






    function dateSelected(day) {
        setDate(day);
    }

    return(
        <View style={styles.container}>
            <View style={styles.calendar}>
                <Calendar  onDayPress={dateSelected} />
            </View>
            <Text style={{color:'black'}}>Selected Date: {date ? date.dateString : "No date selected"}</Text>
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
                keyboardType="numeric"
                onChangeText={expense => setExpense(expense)}
            />
            <TextInput
                style={styles.textInput}
                mode="outlined"
                label={'Description'} // voi merkata rahojen tulonlähteen esim. palkka, lahja, tms.
                onChangeText={description => setDescription(description)}

            />
            <Text style={{ color: 'black'}}>Settings Currency: {settingsCurrency || "No currency selected"}</Text>
            <Text style={{ color: 'black', marginTop: 10 }}>Converted Amount: {convertedAmount ? `${convertedAmount} ${settingsCurrency}` : "No conversion needed"}</Text>

            <CurrencyPicker onCurrencySelect={handleCurrencySelect}/>
            <Button 
                style={styles.addButton}
                icon="plus"
                mode="outlined"
                onPress={addExpense}>
                Add
            </Button>
            <Button icon="arrow-left-top" title="Back" onPress={() => setComponent(null)} />
        </View>
    )
}
            
        

export default Expenses;