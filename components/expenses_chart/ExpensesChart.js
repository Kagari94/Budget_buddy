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

const data = [
    {
      name: DATA[1].title,
      expense: DATA[1].expense,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: DATA[2].title,
      expense: DATA[2].expense,
      color: "pink",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: DATA[3].title,
      expense: DATA[3].expense,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: DATA[4].title,
      expense: DATA[4].expense,
      color: "rgb(0, 255, 136)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: DATA[5].title,
      expense: DATA[5].expense,
      color: "rgb(217, 255, 0)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: DATA[6].title,
      expense: DATA[6].expense,
      color: "rgb(255, 102, 0)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: DATA[7].title,
      expense: DATA[7].expense,
      color: "rgb(255, 0, 221)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: DATA[8].title,
      expense: DATA[8].expense,
      color: "rgb(0, 255, 221)",
      legendFontColor: "#7F7F7F",
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

  