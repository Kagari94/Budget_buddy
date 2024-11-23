import React from 'react';
import { View, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { useTheme } from 'react-native-paper';
import styles from '../../screens/currency_converter/styles.js';

const HistoricalChart = ({ historicalRates, selectedPeriod, formatLargeNumber, baseCurrency, targetCurrency }) => {
  const { colors } = useTheme();

  const chartData = {
    labels: historicalRates.map((item, index) => {
      const date = new Date(item.date);
      let label = "";
      const period = selectedPeriod || "1M";
      switch (period) {
        case "1W":
        case "1M":
          label = `${date.getMonth() + 1}/${date.getDate()}`;
          break;
        case "6M":
        case "1Y":
          label = `${date.getMonth() + 1}/${date.getFullYear()}`;
          break;
        default:
          label = item.date;
      }
      // Show only every nth label to avoid clutter
      const totalLabels = historicalRates.length;
      const maxLabels = 5; 
      if (index % Math.ceil(totalLabels / maxLabels) === 0) {
        return label;
      } else {
        return "";
      }
    }),
    datasets: [
      {
        data: historicalRates.map((item) => item.rate),
        color: (opacity = 1) => colors.primary, // Use theme primary color
        strokeWidth: 2,
      },
    ],
  };

  const screenWidth = Dimensions.get("window").width - 40; 

  const chartConfig = {
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.background,
    color: (opacity = 1) => colors.primary, // Use theme primary color
    labelColor: (opacity = 1) => colors.onBackground, // Use theme text color
    decimalPlaces: 4,
    propsForDots: {
      r: "2",
      strokeWidth: "1",
      stroke: colors.primary,
    },
    propsForBackgroundLines: {
      stroke: "#444",
    },
  };

  return (
    <View style={styles.chartContainer}>
      <Text style={[styles.chartTitle, { color: colors.onBackground }]}>
        {baseCurrency} to {targetCurrency} Rate
      </Text>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chartStyle}
        fromZero={false}
        formatYLabel={(yValue) => formatLargeNumber(parseFloat(yValue))}
      />
    </View>
  );
};

export default HistoricalChart;
