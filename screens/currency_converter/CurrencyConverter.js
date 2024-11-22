
import React, { useState, useEffect } from "react";
import {
  View,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  ScrollView,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  Card,
  IconButton,
  useTheme,
} from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import styles from "./styles.js";
import pickerSelectStyles from "./pickerStyles.js";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ConverterScreen = () => {
  const { colors } = useTheme();

  const [amount, setAmount] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [currencies, setCurrencies] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [historicalRates, setHistoricalRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedPeriod, setSelectedPeriod] = useState(null);

  const periods = [
    { label: "1W", value: "1W" },
    { label: "1M", value: "1M" },
    { label: "6M", value: "6M" },
    { label: "1Y", value: "1Y" },
  ];

  const primaryAPI =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";
  const fallbackAPI =
    "https://latest.currency-api.pages.dev/v1/currencies.json";

  const apiVersion = "v1";

  useEffect(() => {
    fetchCurrencies(primaryAPI, fallbackAPI);
  }, []);

  const fetchCurrencies = async (primaryURL, fallbackURL) => {
    try {
      const response = await axios.get(primaryURL);
      if (response.data && typeof response.data === "object") {
        const currencyKeys = Object.keys(response.data).map((key) => ({
          label: `${key.toUpperCase()} - ${response.data[key]}`,
          value: key.toUpperCase(),
        }));
        setCurrencies(currencyKeys);
      } else {
        throw new Error("Invalid data format from primary API");
      }
    } catch (error) {
      try {
        const fallbackResponse = await axios.get(fallbackURL);
        if (
          fallbackResponse.data &&
          typeof fallbackResponse.data === "object"
        ) {
          const currencyKeys = Object.keys(fallbackResponse.data).map(
            (key) => ({
              label: `${key.toUpperCase()} - ${fallbackResponse.data[key]}`,
              value: key.toUpperCase(),
            })
          );
          setCurrencies(currencyKeys);
        } else {
          throw new Error("Invalid data format from fallback API");
        }
      } catch (fallbackError) {
        Alert.alert(
          "Error",
          "Unable to fetch currency data. Please try again later."
        );
        setError("Unable to fetch currency data. Please try again later.");
      }
    }
  };

  const generateDates = (period) => {
    const dates = [];
    const today = new Date();

    switch (period) {
      case "1W":
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(today.getDate() - i);
          dates.push(d.toISOString().split("T")[0]);
        }
        break;
      case "1M":
        for (let i = 29; i >= 0; i--) {
          const d = new Date();
          d.setDate(today.getDate() - i);
          dates.push(d.toISOString().split("T")[0]);
        }
        break;
      case "6M":
        for (let i = 25; i >= 0; i--) {
          const d = new Date();
          d.setDate(today.getDate() - i * 7);
          dates.push(d.toISOString().split("T")[0]);
        }
        break;
      case "1Y":
        for (let i = 11; i >= 0; i--) {
          const d = new Date();
          d.setMonth(today.getMonth() - i);
          dates.push(d.toISOString().split("T")[0]);
        }
        break;
      default:
        dates.push(today.toISOString().split("T")[0]);
    }

    return dates;
  };

  // Fetch historical rates based on selected period
  const fetchHistoricalRates = async () => {
    if (!baseCurrency || !targetCurrency) return;

    // Use a default period if none is selected
    const period = selectedPeriod || "1M";
    const dates = generateDates(period);
    const rates = [];

    setLoading(true);
    setError("");

    // Caching key
    const cacheKey = `historicalRates_${baseCurrency}_${targetCurrency}_${period}`;
    const cachedData = await AsyncStorage.getItem(cacheKey);

    if (cachedData) {
      setHistoricalRates(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    try {
      const chunkSize = 10;
      for (let i = 0; i < dates.length; i += chunkSize) {
        const chunk = dates.slice(i, i + chunkSize);
        const promises = chunk.map(async (date) => {
          const endpoint = `currencies/${baseCurrency.toLowerCase()}.json`;
          const primaryURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/${apiVersion}/${endpoint}`;
          const fallbackURL = `https://${date}.currency-api.pages.dev/${apiVersion}/${endpoint}`;

          try {
            const response = await axios.get(primaryURL);
            if (response.data && response.data[baseCurrency.toLowerCase()]) {
              const rate =
                response.data[baseCurrency.toLowerCase()][
                  targetCurrency.toLowerCase()
                ];
              return { date, rate };
            }
            return { date, rate: null };
          } catch (error) {
            try {
              const fallbackResponse = await axios.get(fallbackURL);
              if (
                fallbackResponse.data &&
                fallbackResponse.data[baseCurrency.toLowerCase()]
              ) {
                const rate =
                  fallbackResponse.data[baseCurrency.toLowerCase()][
                    targetCurrency.toLowerCase()
                  ];
                return { date, rate };
              }
              return { date, rate: null };
            } catch (fallbackError) {
              return { date, rate: null };
            }
          }
        });

        const results = await Promise.all(promises);
        results.forEach((result) => {
          if (result.rate !== null) {
            rates.push(result);
          }
        });
      }

      rates.sort((a, b) => new Date(a.date) - new Date(b.date));

      setHistoricalRates(rates);
      // Cache the data
      await AsyncStorage.setItem(cacheKey, JSON.stringify(rates));
    } catch (err) {
      Alert.alert(
        "Error",
        "Unable to fetch historical data. Please try again later."
      );
      setError("Unable to fetch historical data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (baseCurrency && targetCurrency) {
      fetchHistoricalRates();
    }
  }, [selectedPeriod, baseCurrency, targetCurrency]);

  // Handle currency conversion
  const handleConvert = async () => {
    if (!amount || isNaN(amount)) {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid number for the amount."
      );
      return;
    }

    if (baseCurrency === targetCurrency) {
      Alert.alert(
        "Invalid Selection",
        "Base and target currencies cannot be the same."
      );
      return;
    }

    setLoading(true);
    setError("");
    setConvertedAmount(null);

    const date = "latest";
    const endpoint = `currencies/${baseCurrency.toLowerCase()}.json`;

    const primaryURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/${apiVersion}/${endpoint}`;
    const fallbackURL = `https://${date}.currency-api.pages.dev/${apiVersion}/${endpoint}`;

    try {
      const response = await axios.get(primaryURL);
      if (response.data && response.data[baseCurrency.toLowerCase()]) {
        const rate =
          response.data[baseCurrency.toLowerCase()][
            targetCurrency.toLowerCase()
          ];
        if (rate) {
          setConvertedAmount((parseFloat(amount) * rate).toFixed(4));
        } else {
          throw new Error("Target currency rate not found");
        }
      } else {
        throw new Error("Invalid data format from primary conversion API");
      }
    } catch (error) {
      try {
        const fallbackResponse = await axios.get(fallbackURL);
        if (
          fallbackResponse.data &&
          fallbackResponse.data[baseCurrency.toLowerCase()]
        ) {
          const rate =
            fallbackResponse.data[baseCurrency.toLowerCase()][
              targetCurrency.toLowerCase()
            ];
          if (rate) {
            setConvertedAmount((parseFloat(amount) * rate).toFixed(4));
          } else {
            throw new Error("Target currency rate not found");
          }
        } else {
          throw new Error("Invalid data format from fallback conversion API");
        }
      } catch (fallbackError) {
        Alert.alert(
          "Error",
          "Unable to fetch conversion rates. Please try again later."
        );
        setError("Unable to fetch conversion rates. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setBaseCurrency(targetCurrency);
    setTargetCurrency(baseCurrency);
  };

  // picker styles use theme colors
  const customizedPickerStyles = {
    ...pickerSelectStyles,
    iconContainer: {
      top: 15,
      right: 10,
    },
    inputIOS: {
      ...pickerSelectStyles.inputIOS,
      color: colors.onBackground,
      backgroundColor: colors.surface,
      borderColor: colors.placeholder || "#888888",
      paddingLeft: 60,
    },
    inputAndroid: {
      ...pickerSelectStyles.inputAndroid,
      color: colors.onBackground,
      backgroundColor: colors.surface,
      borderColor: colors.placeholder || "#888888",
      paddingLeft: 60,
    },
  };

  // Prepare chart data
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

  // Function to format large numbers so they fit into the screen
  const formatLargeNumber = (num) => {
    if (Math.abs(num) >= 1.0e9) {
      return (num / 1.0e9).toFixed(2) + "B";
    } else if (Math.abs(num) >= 1.0e6) {
      return (num / 1.0e6).toFixed(2) + "M";
    } else if (Math.abs(num) >= 1.0e3) {
      return (num / 1.0e3).toFixed(2) + "K";
    } else {
      return num.toFixed(2);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
      >
        <Text style={[styles.title, { color: colors.onBackground }]}>
          Currency Converter
        </Text>

        <TextInput
          label="Enter Amount"
          mode="outlined"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
          left={<TextInput.Icon name="currency-usd" color={colors.onBackground} />}
          theme={{ colors: { text: colors.onBackground, placeholder: colors.placeholder } }}
        />

        <View style={styles.periodContainer}>
          {periods.map((period) => (
            <Button
              key={period.value}
              mode={selectedPeriod === period.value ? "contained" : "outlined"}
              onPress={() => setSelectedPeriod(period.value)}
              style={[
                styles.periodButton,
                selectedPeriod === period.value && {
                  backgroundColor: colors.primary,
                },
              ]}
              labelStyle={{
                fontSize: 14,
                textAlign: "center",
                color:
                  selectedPeriod === period.value
                    ? colors.onPrimary
                    : colors.primary,
              }}
            >
              {period.label}
            </Button>
          ))}
        </View>

        <RNPickerSelect
          onValueChange={(value) => setBaseCurrency(value)}
          items={currencies}
          value={baseCurrency}
          style={customizedPickerStyles}
          placeholder={{ label: "Select Base Currency", value: null }}
          Icon={() => (
            <IconButton icon="chevron-down" size={24} color={colors.onBackground} />
          )}
        />

        <RNPickerSelect
          onValueChange={(value) => setTargetCurrency(value)}
          items={currencies}
          value={targetCurrency}
          style={customizedPickerStyles}
          placeholder={{ label: "Select Target Currency", value: null }}
          Icon={() => (
            <IconButton icon="chevron-down" size={24} color={colors.onBackground} />
          )}
        />

        <Button
          mode="contained"
          onPress={swapCurrencies}
          icon="swap-horizontal"
          style={styles.swapButton}
          contentStyle={{ flexDirection: "row-reverse" }}
        >
          Swap
        </Button>

        <Button
          mode="contained"
          onPress={handleConvert}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Convert
        </Button>

        {loading && <ActivityIndicator size="large" color={colors.primary} />}

        {convertedAmount && (
          <Card style={[styles.resultCard, { backgroundColor: colors.surface }]}>
            <Card.Content>
              <Text style={[styles.result, { color: colors.primary }]}>
                {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
              </Text>
            </Card.Content>
          </Card>
        )}

        {historicalRates && historicalRates.length > 0 && (
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
        )}

        {error ? (
          <Text style={[styles.errorText, { color: colors.error }]}>
            {error}
          </Text>
        ) : null}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ConverterScreen;
