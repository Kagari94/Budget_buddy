import { PieChart } from "react-native-chart-kit";
import { useWindowDimensions } from 'react-native';
import { View } from "react-native";
import { styles } from "./style";
import { getExpense } from "../get_data/GetData";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};


export default function ExpensesChart() {

  const { colors } = useTheme()
  const { height, width } = useWindowDimensions();
  const [dataList, setDataList] = useState([]);


  const data = [//find is so that the listing go where they are supposed to go.
    {
      name: 'Food',
      expense: dataList.find(item => item.name === 'Food')?.totalExpense || 0,
      color: "rgb(71, 12, 122)",
      legendFontColor: colors.onPrimary,
      legendFontSize: 15
    },
    {
      name: 'Living',
      expense: dataList.find(item => item.name === 'Living')?.totalExpense || 0,
      color: "rgb(151, 97, 206)",
      legendFontColor: colors.onPrimary,
      legendFontSize: 15
    },
    {
      name: 'Rent',
      expense: dataList.find(item => item.name === 'Rent')?.totalExpense || 0,
      color: "rgb(238, 179, 228)",
      legendFontColor: colors.onPrimary,
      legendFontSize: 15
    },
    {
      name: 'Transport',
      expense: dataList.find(item => item.name === 'Transport')?.totalExpense || 0,
      color: "rgb(220, 184, 255)",
      legendFontColor: colors.onPrimary,
      legendFontSize: 15
    },
    {
      name: 'Hobbies',
      expense: dataList.find(item => item.name === 'Hobbies')?.totalExpense || 0,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: colors.onPrimary,
      legendFontSize: 15
    },
    {
      name: 'Savings',
      expense: dataList.find(item => item.name === 'Savings')?.totalExpense || 0,
      color: "rgb(169, 236, 227)",
      legendFontColor: colors.onPrimary,
      legendFontSize: 15
    },
    {
      name: 'Others',
      expense: dataList.find(item => item.name === 'Others')?.totalExpense || 0,
      color: "rgb(203, 238, 171)",
      legendFontColor: colors.onPrimary,
      legendFontSize: 15
    }
  ];


  useFocusEffect(//Get items from storage, and add them together by category.
    useCallback(() => {
      const CountData = async () => {
        const expenses = await getExpense();
        let tempList = {}

        for (let i = 0; i < expenses.length; i++) {
          const category = expenses[i].category;
          const amount = expenses[i].expense;

          if (!tempList[category]) {
            tempList[category] = { totalExpense: 0, name: category };
          }

          tempList[category].totalExpense += Number(amount);// convert the amount to Number before adding, else things go south.
        }
        setDataList(Object.values(tempList));
      }
      //console.log('Data added: ', dataList)

      CountData();

    }, []))


  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        width={width - 20}
        height={250}
        chartConfig={chartConfig}
        accessor={"expense"}//Property in the data object from which the number values are taken
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 0]}
      //avoidFalseZero={true}
      />
    </View>

  );
}

