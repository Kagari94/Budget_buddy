import { useState, useEffect } from 'react-native';
import { Data } from '../../assets/DATA/Data';


const DATA = Data;
//console.log("DATA loaded:", DATA)

export function SortByCategory(selectedCategory) {
    //console.log(selectedCategory)

    const tempList = [];
    if (selectedCategory === 'All') {
        for (i = 0; i < DATA.length; i++) {
            tempList.push(DATA[i])
        }
    } else {
        for (let i = 0; i < DATA.length; i++) {
            //console.log("Inspecting:", DATA[i]); // Log each item
            if (DATA[i].title === selectedCategory) {
                tempList.push(DATA[i]);
            } else {
                //console.log("No Matching things for:", DATA[i].title);
            }
        }

    }
    return tempList;
}