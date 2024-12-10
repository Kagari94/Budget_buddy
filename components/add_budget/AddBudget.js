import { useCallback, useState } from "react";
import { View, Text } from "react-native";
import { getExpense, getIncome } from "../get_data/GetData";
import { useFocusEffect } from "@react-navigation/native";

export default function AddBudget() {
    const [countedData, setCountedData] = useState();

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
        }
        CountData()

    }, [])
    )

    return (
        <View>
            <Text style={{ color: 'black', fontSize: 20, alignSelf: 'center' }}>Budget left: {countedData}</Text>
        </View>
    )
}