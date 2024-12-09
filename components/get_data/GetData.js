import AsyncStorage from "@react-native-async-storage/async-storage";

export const getIncome = async () => {//Get the incomes from async
    try {
        const rawData = await AsyncStorage.getItem('Income');
        //console.log('Income read - ' + rawData);
        return rawData ? JSON.parse(rawData) : []; // Parse and return data, or empty array if null
    } catch (error) {
        console.log('Income fetch failed: ', error);
        return []; // Return an empty array on error so app wont crash
    }
};

export const getExpense = async () => {//Get the expenses from async
    try {
        const rawData = await AsyncStorage.getItem('expenses');
        //console.log('Expense read - ' + rawData);
        return rawData ? JSON.parse(rawData) : []; // Parse and return data, or empty array if null
    } catch (error) {
        console.log('Expense fetch failed: ', error);
        return []; // Return an empty array on error so app wont crash
    }
};