import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { SelectedID } from '../../context/sortingContext';
import { expense as DATA } from '../../assets/DATA/Data'
import { SortByCategory } from '../sorting/Sorting';
import { styles } from "./style";


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

  const [selectedCategory] = useContext(SelectedID);

  const [selectedId, setSelectedId] = useState();
  const [tempList, setTempList] = useState(DATA);

  useEffect(() => {
    //console.log("Did fire")
    const sortedList = SortByCategory(selectedCategory);
    setTempList(sortedList);
  },[selectedCategory])

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#663399' : '#665a6f';
    const color = item.id === selectedId ? 'white' : 'white';// Change this when you have dark and light theme!

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
          data={tempList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ExpensesList;