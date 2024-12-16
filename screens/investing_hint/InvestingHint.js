// InvestingHint.js

import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from 'react-native-paper'; // Import useTheme from react-native-paper
import { styles } from './style';
import investingImage from '../../assets/interest.png';
import * as Speech from 'expo-speech';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function InvestingHint() {
  const { colors, dark } = useTheme(); // Access the current theme colors and mode
  const [isSpeaking, setIsSpeaking] = useState(false); // Track if speech is active
  const [showCalculator, setShowCalculator] = useState(false);
  const [initialAmount, setInitialAmount] = useState('1000');
  const [monthlyInvestment, setMonthlyInvestment] = useState('100');
  const [interestRate, setInterestRate] = useState('8');
  const [investmentYears, setInvestmentYears] = useState(10);
  const [error, setError] = useState('');
  const [result, setResult] = useState({
    finalAmount: 0,
    totalInvested: 0,
    interestEarned: 0,
  });

  const text = `Welcome to Investing Tips. Here you will find useful tips to grow your wealth.
  Investing is one of the best ways to grow your wealth over time. Here, you'll find some tips and a handy calculator to help you understand how compound interest can work for you. 
  Index funds offer a straightforward, cost-effective way to invest in the financial markets, making them a popular choice for both novice and experienced investors. Their low costs, diversification, and consistent performance make them an attractive option for long-term growth.
  In this picture you can clearly see, the earlier you begin, the more time compound interest has to work its magic. By starting with smaller contributions earlier in life, you can achieve similar or even greater returns than if you start saving larger amounts later on. 
  This demonstrates how consistent, early investments, especially in low-cost, diversified index funds, can lead to substantial wealth accumulation over time.
  You can get started with as little as ten dollars or ten euros/month, but with a larger savings amount, you will accumulate your wealth even faster. If you have the opportunity to save and want a return on your money, start Monthly Savings into a fund. You can use the calculator below to try out how the interest-for-interest phenomenon works.`;

  const toggleSpeech = () => {
    if (isSpeaking) {
      Speech.stop(); // Stop speech
      setIsSpeaking(false);
    } else {
      Speech.speak(text, {
        onDone: () => setIsSpeaking(false), // Reset state when speech is done
        onStopped: () => setIsSpeaking(false), // Handle if speech is stopped manually
      });
      setIsSpeaking(true);
    }
  };

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

    const compoundedInitial = initial * Math.pow(1 + monthlyRate, months);
    const compoundedMonthly = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const total = compoundedInitial + compoundedMonthly;
    const totalInvested = initial + monthly * months;
    const interestEarned = total - totalInvested;

    setResult({
      finalAmount: total.toFixed(2),
      totalInvested: totalInvested.toFixed(2),
      interestEarned: interestEarned.toFixed(2),
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View>
        <Text style={[styles.header, { color: colors.onBackground }]}>Welcome to Investing Tips</Text>

        {/* Row with Play Button and Text */}
        <View style={styles.row}>
          <TouchableOpacity onPress={toggleSpeech}>
            <Icon
              name={isSpeaking ? 'pause-circle' : 'play-circle'}
              size={60}
              color={colors.primary}
            />
          </TouchableOpacity>
          <Text style={[styles.playText, { color: colors.onBackground }]}>
            {isSpeaking ? 'Listening...' : 'Listen to the text'}
          </Text>
        </View>
      </View>

      <Text style={[styles.description, { color: colors.onBackground }]}>
        Investing is one of the best ways to grow your wealth over time. Here, you'll find some tips and a handy calculator to help you understand how compound interest can work for you.
        Index funds offer a straightforward, cost-effective way to invest in the financial markets, making them a popular choice for both novice and experienced investors. Their low costs, diversification, and consistent performance make them an attractive option for long-term growth. In this picture you can clearly see, the earlier you begin, the more time compound interest has to work its magic. By starting with smaller contributions earlier in life, you can achieve similar or even greater returns than if you start saving larger amounts later on. This demonstrates how consistent, early investments, especially in low-cost, diversified index funds, can lead to substantial wealth accumulation over time.
      </Text>
      <Image
        source={investingImage}
        style={styles.image}
      />

      <Text style={[styles.description, { color: colors.onBackground }]}>
        You can get started with as little as €10/month, but with a larger savings amount, you will accumulate your wealth even faster. If you have the opportunity to save and want a return on your money, start Monthly Savings into a fund.
        You can use the calculator below to try out how the interest-for-interest phenomenon works
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => setShowCalculator(!showCalculator)}
      >
        <Text style={[styles.buttonText, { color: colors.onPrimary }]}>
          {showCalculator ? 'Hide Calculator' : 'Show Calculator'}
        </Text>
      </TouchableOpacity>

      {showCalculator && (
        <View style={[styles.calculator, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
          <Text style={[styles.title, { color: colors.onBackground }]}>Interest for Interest Calculator</Text>

          {/* Start Capital Input */}
          <View style={styles.inputGroup}>
            <Text style={{ color: colors.onBackground }}>Start Capital (€):</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.primary, color: dark ? '#ffffff' : '#000000' } // Manually set text color based on theme
              ]}
              keyboardType="decimal-pad"
              value={initialAmount}
              onChangeText={(text) => validateInput(text, setInitialAmount)}
              placeholder="e.g., 1000"
              placeholderTextColor={dark ? '#cccccc' : '#666666'} // Adjust placeholder color based on theme
            />
          </View>

          {/* Monthly Investment Input */}
          <View style={styles.inputGroup}>
            <Text style={{ color: colors.onBackground }}>Monthly Investment (€):</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.primary, color: dark ? '#ffffff' : '#000000' } // Manually set text color based on theme
              ]}
              keyboardType="decimal-pad"
              value={monthlyInvestment}
              onChangeText={(text) => validateInput(text, setMonthlyInvestment)}
              placeholder="e.g., 100"
              placeholderTextColor={dark ? '#cccccc' : '#666666'} // Adjust placeholder color based on theme
            />
          </View>

          {/* Expected Rate of Return Input */}
          <View style={styles.inputGroup}>
            <Text style={{ color: colors.onBackground }}>Expected Rate of Return (%):</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.primary, color: dark ? '#ffffff' : '#000000' } // Manually set text color based on theme
              ]}
              keyboardType="decimal-pad"
              value={interestRate}
              onChangeText={(text) => validateInput(text, setInterestRate)}
              placeholder="e.g., 8"
              placeholderTextColor={dark ? '#cccccc' : '#666666'} // Adjust placeholder color based on theme
            />
          </View>

          {/* Investment Time Slider */}
          <View style={styles.inputGroup}>
            <Text style={{ color: colors.onBackground }}>Investment Time (Years):</Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={1}
              maximumValue={50}
              step={1}
              value={investmentYears}
              onValueChange={(value) => setInvestmentYears(value)}
              minimumTrackTintColor={colors.primary}
              thumbTintColor={colors.primary}
            />
            <Text style={{ color: colors.onBackground }}>{investmentYears} Years</Text>
          </View>

          {/* Error Message */}
          {error ? <Text style={[styles.error, { color: colors.error }]}>{error}</Text> : null}

          {/* Calculate Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={calculateCompoundInterest}
          >
            <Text style={[styles.buttonText, { color: colors.onPrimary }]}>CALCULATE</Text>
          </TouchableOpacity>

          {/* Result Display */}
          <View style={[styles.resultGroup, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
            <Text style={{ color: colors.onBackground }}>Capital at the end of the period: {result.finalAmount}€</Text>
            <Text style={{ color: colors.onBackground }}>Amount of money invested: {result.totalInvested}€</Text>
            <Text style={{ color: colors.onBackground }}>Amount of interest income: {result.interestEarned}€</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
