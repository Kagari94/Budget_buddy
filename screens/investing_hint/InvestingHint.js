import React, { useState } from 'react';
import { Text, TextInput, View, Button, Image, ScrollView, Alert } from 'react-native';
import Slider from '@react-native-community/slider';
import { styles } from './style';
import { TouchableOpacity } from 'react-native';
import investingImage from '../../assets/interest.png';



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
  
    const annualRate = parseFloat(interestRate) / 100;
    const monthlyRate = annualRate / 12;
    const months = investmentYears * 12;
  
    const initial = parseFloat(initialAmount);
    const monthly = parseFloat(monthlyInvestment);
  
    // Compound interest formula
    const compoundedInitial = initial * Math.pow(1 + monthlyRate, months);
    const compoundedMonthly = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  
    const total = compoundedInitial + compoundedMonthly;
    const totalInvested = initial + (monthly * months);
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
        Index funds offer a straightforward, cost-effective way to invest in the financial markets, making them a popular choice for both novice and experienced investors. Their low costs, diversification, and consistent performance make them an attractive option for long-term growth. In this picture you can clearly see, the earlier you begin, the more time compound interest has to work its magic. By starting with smaller contributions earlier in life, you can achieve similar or even greater returns than if you start saving larger amounts later on. This demonstrates how consistent, early investments, especially in low-cost, diversified index funds, can lead to substantial wealth accumulation over time.
      </Text>
      <Image
        source={require('../../assets/interest.png')}
        style={styles.image}
      />

      <Text style={styles.description}>
        You can get started with as little as €10/month, but with a larger savings amount, you will accumulate your wealth even faster. If you have the opportunity to save and want a return on your money, start Monthly Savings into a fund.
        You can use the calculator below to try out how the interest-for-interest phenomenon works
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowCalculator(!showCalculator)}
      >
        <Text style={styles.buttonText}>
          {showCalculator ? 'Hide Calculator' : 'Show Calculator'}
        </Text>
      </TouchableOpacity>

      {showCalculator && (
        <View style={styles.calculator}>
          <Text style={styles.title}>Interest for Interest Calculator</Text>

          <View style={styles.inputGroup}>
            <Text>Start Capital (€):</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad" 
              value={initialAmount}
              onChangeText={(text) => validateInput(text, setInitialAmount)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Monthly Investment (€):</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad" 
              value={monthlyInvestment}
              onChangeText={(text) => validateInput(text, setMonthlyInvestment)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text>Expected Rate of Return (%):</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad" 
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
              onValueChange={(value) => setInvestmentYears(value)}
            />
            <Text>{investmentYears} Years</Text>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={calculateCompoundInterest}>
            <Text style={styles.buttonText}>CALCULATE</Text>
          </TouchableOpacity>

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
