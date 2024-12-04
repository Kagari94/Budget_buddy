import { PieChart } from "react-native-chart-kit";
import {useWindowDimensions} from 'react-native';
import {Data as DATA} from '../../assets/DATA/Data'
import { View } from "react-native";
import { styles } from "./style";

/*
Food
Living
Loans
Rent
Transport
Hobbies
Savings
Bills
Others
*/

const data = [//Maybe make it so we can call items from function
    {
      name: DATA[1].title,
      expense: DATA[1].expense,
      color: "rgb(71, 12, 122)",
      legendFontColor: "#ffffff",
      legendFontSize: 15
    },
    {
      name: DATA[2].title,
      expense: DATA[2].expense,
      color: "rgb(151, 97, 206)",
      legendFontColor: "#ffffff",
      legendFontSize: 15
    },
    {
      name: DATA[3].title,
      expense: DATA[3].expense,
      color: "rgb(154, 147, 250)",
      legendFontColor: "#ffffff",
      legendFontSize: 15
    },
    {
      name: DATA[4].title,
      expense: DATA[4].expense,
      color: "rgb(238, 179, 228)",
      legendFontColor: "#ffffff",
      legendFontSize: 15
    },
    {
      name: DATA[5].title,
      expense: DATA[5].expense,
      color: "rgb(220, 184, 255)",
      legendFontColor: "#ffffff",
      legendFontSize: 15
    },
    {
      name: DATA[6].title,
      expense: DATA[6].expense,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#ffffff",
      legendFontSize: 15
    },
    {
      name: DATA[7].title,
      expense: DATA[7].expense,
      color: "rgb(169, 236, 227)",
      legendFontColor: "#ffffff",
      legendFontSize: 15
    },
    {
      name: DATA[8].title,
      expense: DATA[8].expense,
      color: "rgb(203, 238, 171)",
      legendFontColor: "#ffffff",
      legendFontSize: 15
    }
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

export default function ExpensesChart() {
    
    const {height, width} = useWindowDimensions();
    
    return (
      <View style={styles.container}>
        <PieChart
                data={data}
                width={width - 20}
                height={220}
                chartConfig={chartConfig}
                accessor={"expense"}//Property in the data object from which the number values are taken
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 0]}
                avoidFalseZero={true}
            />
      </View>
    );
  }

  