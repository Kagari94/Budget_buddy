import { Data } from '../../assets/DATA/Data';//For testing before asyncStorage
import { getIncome, getExpense } from '../get_data/GetData';



//console.log("DATA loaded:", DATA)

export async function SortByCategory(selectedCategory) {

    const expenseData = await getExpense();
    const incomeData = await getIncome();

    let tempList = [];

    //console.log('Selected category - '+selectedCategory)

    if (selectedCategory === 'All') {
        for (i = 0; i < expenseData.length; i++) {
            tempList.push(expenseData[i])
        } for (i = 0; i < incomeData.length; i++) {
            tempList.push(incomeData[i])
        }

    } else {
        for (let i = 0; i < expenseData.length; i++) {

            //console.log("Check data:", DATA[i]); // Check items
            //console.log('Category: ', DATA[i].category);

            if (expenseData[i].category === selectedCategory) {
                tempList.push(expenseData[i]);
                console.log('Pushed the item - ', expenseData[i])
            } else {
                console.log("No Matching things for:", expenseData[i].title);
            }
        }

    }

    tempList.sort((a, b) => b.date.localeCompare(a.date));//Sort items by date before returning.

    return tempList;
}