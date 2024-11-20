import React, { useState } from 'react';
import { expense as DATA } from '../../assets/DATA/Data'
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { styles } from "./style";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';



const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <View style={styles.titleview}>
      <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
    </View>
    <View style={styles.expenseview}>
      <Text style={[styles.title, { color: textColor }]}>{item.expense}</Text>
    </View>
  </TouchableOpacity>
);

const ExpensesList = () => {
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? 'lime' : 'green';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ExpensesList;