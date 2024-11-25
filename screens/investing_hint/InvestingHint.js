import React, { useState } from 'react';
import { Text, TextInput, View, Button, Image, ScrollView, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { styles } from './style';

export default function InvestingHint() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [initialAmount, setInitialAmount] = useState('1000'); // Use string initially
  const [monthlyInvestment, setMonthlyInvestment] = useState('100'); // Use string initially
  const [interestRate, setInterestRate] = useState('8'); // Use string initially
  const [investmentYears, setInvestmentYears] = useState(10);
  const [error, setError] = useState(''); // State for errors
  const [result, setResult] = useState({
    finalAmount: 0,
    totalInvested: 0,
    interestEarned: 0,
  });

  const validateInput = (text, setter) => {
    // Allow numbers, dots, and commas
    const normalizedText = text.replace(',', '.');
    if (/^\d*\.?\d*$/.test(normalizedText)) {
      setter(normalizedText); // Allow input with valid numbers and decimals
      setError(''); // Clear any error
    } else {
      setError('Please enter a valid numeric value (e.g., 123 or 2.5).');
    }
  };

  const calculateCompoundInterest = () => {
    if (error) {
      Alert.alert('Invalid Input', 'Please fix the errors before calculating.');
      return;
    }

    const months = investmentYears * 12;
    const monthlyRate = parseFloat(interestRate) / 100 / 12;

    let total = parseFloat(initialAmount);
    for (let i = 0; i < months; i++) {
      total = total * (1 + monthlyRate) + parseFloat(monthlyInvestment);
    }

    const totalInvested = parseFloat(initialAmount) + parseFloat(monthlyInvestment) * months;
    const interestEarned = total - totalInvested;

    setResult({
      finalAmount: total.toFixed(2),
      totalInvested: totalInvested.toFixed(2),
      interestEarned: interestEarned.toFixed(2),
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Welcome to Investing Tips</Text>
      <Text style={styles.description}>
        Investing is one of the best ways to grow your wealth over time. Here, you'll find some tips and a handy calculator to help you understand how compound interest can work for you.
      </Text>
      <Image
        source={{ uri: 'https://example.com/investing-image.jpg' }} // Replace with your image URL
        style={styles.image}
      />
      <Text style={styles.description}>
        Did you know? Even small monthly investments can grow into significant wealth over time thanks to compound interest.
      </Text>

      <Button
        title={showCalculator ? 'Hide Calculator' : 'Show Calculator'}
        onPress={() => setShowCalculator(!showCalculator)}
      />

      {showCalculator && (
        <View style={styles.calculator}>
          <Text style={styles.title}>Interest for Interest Calculator</Text>

          <View style={styles.inputGroup}>
            <Text>Start Capital (€):</Text>
            <TextInput
              style={styles.input}
              keyboardType="default" // Use default to allow all characters
              value={initialAmount}
              onChangeText={(text) => validateInput(text, setInitialAmount)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Monthly Investment (€):</Text>
            <TextInput
              style={styles.input}
              keyboardType="default" // Use default to allow all characters
              value={monthlyInvestment}
              onChangeText={(text) => validateInput(text, setMonthlyInvestment)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Expected Rate of Return (%):</Text>
            <TextInput
              style={styles.input}
              keyboardType="default" // Use default to allow all characters
              value={interestRate}
              onChangeText={(text) => validateInput(text, setInterestRate)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Investment Time (Years):</Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={1}
              maximumValue={50}
              step={1}
              value={investmentYears}
              onValueChange={(value) => setInvestmentYears(value)}
            />
            <Text>{investmentYears} Years</Text>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button title="Calculate" onPress={calculateCompoundInterest} />

          <View style={styles.resultGroup}>
            <Text>Capital at the end of the period: {result.finalAmount}€</Text>
            <Text>Amount of money invested: {result.totalInvested}€</Text>
            <Text>Amount of interest income: {result.interestEarned}€</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
