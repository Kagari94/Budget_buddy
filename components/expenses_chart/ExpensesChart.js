// ExpensesChart.js
import React from 'react';
import { PieChart } from "react-native-chart-kit";
import { useWindowDimensions, View } from 'react-native';
import { Data as DATA } from '../../assets/DATA/Data';
import { styles } from "./style";
import { useTheme } from 'react-native-paper';

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

export default function ExpensesChart() {
  const { colors } = useTheme(); // Access theme colors
  const { height, width } = useWindowDimensions();

  // Generate data dynamically using theme colors
  const chartData = DATA.slice(1).map((item, index) => ({
    name: item.title,
    expense: item.expense,
    color: colors.chartColors
      ? colors.chartColors[index % colors.chartColors.length]
      : colors.primary,
    legendFontColor: colors.text,
    legendFontSize: 15,
  }));

  const chartConfig = {
    backgroundGradientFrom: colors.background,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: colors.background,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => colors.primary,
    strokeWidth: 3,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  return (
    <View style={styles.container}>
      <PieChart
        data={chartData}
        width={width - 20}
        height={220}
        chartConfig={chartConfig}
        accessor="expense"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[10, 0]}
        avoidFalseZero
      />
    </View>
  );
}
