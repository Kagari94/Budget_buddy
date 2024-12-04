import AsyncStorage from "@react-native-async-storage/async-storage";

export const getExpense = async () => {
    try {
        const rawData = await AsyncStorage.getItem('expenses');
        //console.log('Expense read - ' + rawData);
        return rawData ? JSON.parse(rawData) : []; // Parse and return data, or empty array if null
    } catch (error) {
        console.log('Failed', error);
        return []; // Return an empty array on error so app wont crash
    }
};

export const getIncome = async () => {
    try {
        const rawData = await AsyncStorage.getItem('Income');
        //console.log('Expense read - ' + rawData);
        return rawData ? JSON.parse(rawData) : []; // Parse and return data, or empty array if null
    } catch (error) {
        console.log('Failed', error);
        return []; // Return an empty array on error so app wont crash
    }
};