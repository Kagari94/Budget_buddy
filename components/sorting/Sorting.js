import { Data } from '../../assets/DATA/Data';//For testing before asyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";



//console.log("DATA loaded:", DATA)

export async function SortByCategory(selectedCategory) {

    //console.log(selectedCategory)
    const getExpense = async () => {
        try {
            const rawData = await AsyncStorage.getItem('expenses');
            //console.log('Expense read - ' + rawData);
            return rawData ? JSON.parse(rawData) : []; // Parse and return data, or empty array if null
        } catch (error) {
            console.log('Failed', error);
            return []; // Return an empty array on error so app wont crash
        }
    };

    const DATA = await getExpense();

    const tempList = [];

    //console.log('Selected category - '+selectedCategory)

    if (selectedCategory === 'All') {
        for (i = 0; i < DATA.length; i++) {
            tempList.push(DATA[i])
        }
    } else {
        for (let i = 0; i < DATA.length; i++) {

            //console.log("Check data:", DATA[i]); // Check items
            //console.log('Category: ', DATA[i].category);

            if (DATA[i].category === selectedCategory) {
                tempList.push(DATA[i]);
                console.log('Pushed the item - ', DATA[i])
            } else {
                console.log("No Matching things for:", DATA[i].title);
            }
        }

    }
    return tempList;
}