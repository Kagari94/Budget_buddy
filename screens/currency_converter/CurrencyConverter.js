
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  Text,
  TextInput,
  Button,
  Card,
  IconButton,
} from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import styles from "./styles.js"; 
import pickerSelectStyles from "./pickerStyles.js"; 
import { useTheme } from "react-native-paper";

const ConverterScreen = () => {
  const { colors } = useTheme(); // Access theme colors
  const [amount, setAmount] = useState("");
  const [baseCurrency, setBaseCurrency] = useState("EUR");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [currencies, setCurrencies] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const primaryAPI =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"; // Primary endpoint
  const fallbackAPI =
    "https://latest.currency-api.pages.dev/v1/currencies.json"; // Backup API

  // Fetch currencies on component mount
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
    const apiVersion = "v1";
    const endpoint = `currencies/${baseCurrency.toLowerCase()}.json`;

    const primaryURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/${apiVersion}/${endpoint}`;
    const fallbackURL = `https://${date}.currency-api.pages.dev/${apiVersion}/${endpoint}`;

    try {
      const response = await axios.get(primaryURL);
      if (
        response.data &&
        response.data[baseCurrency.toLowerCase()]
      ) {
        const rates = response.data[baseCurrency.toLowerCase()];
        const rate = rates[targetCurrency.toLowerCase()];
        if (rate) {
          setConvertedAmount((parseFloat(amount) * rate).toFixed(2));
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
          const rates = fallbackResponse.data[baseCurrency.toLowerCase()];
          const rate = rates[targetCurrency.toLowerCase()];
          if (rate) {
            setConvertedAmount((parseFloat(amount) * rate).toFixed(2));
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

  const customizedPickerStyles = {
    ...pickerSelectStyles,
    iconContainer: {
      top: 15,
      right: 10,
    },
    inputIOS: {
      ...pickerSelectStyles.inputIOS,
      color: "white",
      backgroundColor: colors.background,
      borderColor: colors.placeholder || "#888",
      paddingLeft: 60, 
    },
    inputAndroid: {
      ...pickerSelectStyles.inputAndroid,
      color: "white", 
      backgroundColor: colors.background,
      borderColor: colors.placeholder || "#888",
      paddingLeft: 60, 
    },
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.primary }]}>
          Currency Converter
        </Text>

        <TextInput
          label="Enter Amount"
          mode="outlined"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
          left={<TextInput.Icon name="currency-eur" color="white" />}
        />

        <RNPickerSelect
          onValueChange={(value) => setBaseCurrency(value)}
          items={currencies}
          value={baseCurrency}
          style={customizedPickerStyles}
          placeholder={{ label: "Select Base Currency", value: null }}
          Icon={() => (
            <IconButton icon="chevron-down" size={24} color="white" />
          )}
        />

        <RNPickerSelect
          onValueChange={(value) => setTargetCurrency(value)}
          items={currencies}
          value={targetCurrency}
          style={customizedPickerStyles}
          placeholder={{ label: "Select Target Currency", value: null }}
          Icon={() => (
            <IconButton icon="chevron-down" size={24} color="white" />
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

        {loading && (
          <ActivityIndicator size="large" color={colors.primary} />
        )}

        {convertedAmount && (
          <Card style={styles.resultCard}>
            <Card.Content>
              <Text style={[styles.result, { color: "#FFD700" }]}>
                {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
              </Text>
            </Card.Content>
          </Card>
        )}

        {error ? (
          <Text style={[styles.errorText, { color: colors.error }]}>
            {error}
          </Text>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ConverterScreen;
