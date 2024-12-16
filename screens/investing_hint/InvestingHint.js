import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput, Alert, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme } from 'react-native-paper'; // Import useTheme
import { styles } from './style';
import * as Speech from 'expo-speech';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function InvestingHint() {
  const { colors } = useTheme(); // Access current theme colors
  const [isSpeaking, setIsSpeaking] = useState(false);
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
  Investing is one of the best ways to grow your wealth over time.`;

  const toggleSpeech = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      Speech.speak(text, {
        onDone: () => setIsSpeaking(false),
      });
      setIsSpeaking(true);
    }
  };

  const validateInput = (text, setter) => {
    const normalizedText = text.replace(',', '.');
    if (/^\d*\.?\d*$/.test(normalizedText)) {
      setter(normalizedText);
      setError('');
    } else {
      setError('Please enter a valid numeric value.');
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
        Investing is one of the best ways to grow your wealth over time.
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
          <Text style={[styles.title, { color: colors.onBackground }]}>Interest Calculator</Text>

          <View style={styles.inputGroup}>
            <Text style={{ color: colors.onBackground }}>Start Capital (€):</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.primary, backgroundColor: colors.surface, color: colors.onBackground },
              ]}
              placeholderTextColor={colors.onBackground}
              keyboardType="decimal-pad"
              value={initialAmount}
              onChangeText={(text) => validateInput(text, setInitialAmount)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={{ color: colors.onBackground }}>Monthly Investment (€):</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.primary, backgroundColor: colors.surface, color: colors.onBackground },
              ]}
              placeholderTextColor={colors.onBackground}
              keyboardType="decimal-pad"
              value={monthlyInvestment}
              onChangeText={(text) => validateInput(text, setMonthlyInvestment)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={{ color: colors.onBackground }}>Rate of Return (%):</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: colors.primary, backgroundColor: colors.surface, color: colors.onBackground },
              ]}
              placeholderTextColor={colors.onBackground}
              keyboardType="decimal-pad"
              value={interestRate}
              onChangeText={(text) => validateInput(text, setInterestRate)}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={calculateCompoundInterest}
          >
            <Text style={[styles.buttonText, { color: colors.onPrimary }]}>Calculate</Text>
          </TouchableOpacity>

          <View style={[styles.resultGroup, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
            <Text style={{ color: colors.onBackground }}>Final Amount: {result.finalAmount}€</Text>
            <Text style={{ color: colors.onBackground }}>Total Invested: {result.totalInvested}€</Text>
            <Text style={{ color: colors.onBackground }}>Interest Earned: {result.interestEarned}€</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
