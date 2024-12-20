import { useCallback, useState } from "react";
import { View, Text } from "react-native";
import { getExpense, getIncome } from "../get_data/GetData";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import React from "react";
import { useCurrency } from "../../context/currencyContext";
import { styles } from './style'

export default function AddBudget() {

    const { currency: settingsCurrency } = useCurrency();

    const [countedData, setCountedData] = useState();
    const [text, setText] = useState('Budget left');
    const [textColor, setTextColor] = useState();
    const {colors} = useTheme();

    useFocusEffect(
        useCallback(() => {
        const CountData = async () => {
            const income = await getIncome();
            const expense = await getExpense();
            let addedIncome = 0;
            let addedExpense = 0;

            for (i = 0; i < income.length; i++) {
                addedIncome += Number(income[i].income)
                //console.log(addedIncome)
            }
            for (i = 0; i < expense.length; i++) {
                addedExpense += Number(expense[i].expense)
                //console.log(addedExpense)
            }

            setCountedData(addedIncome - addedExpense);  

            if(countedData > 0){
                setText('Budget left')
                setTextColor(false)
            }else if(countedData === 0){
                setText('Add an income to be used as the budget')
                setTextColor(false)
            }else{
                setText('Went over budget, currently by')
                setTextColor(true)
            }
            
        }
        CountData()

    }, [countedData])
    )
    return (
        <View style={[styles.budgetview, {backgroundColor: colors.surface}]}>
            <Text style={[styles.text, {color: textColor ? 'red' : colors.onPrimary,}]}>
                {text}: {Math.abs(countedData).toFixed(2)} {settingsCurrency}
            </Text>
        </View>
    )
}