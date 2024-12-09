import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { SelectedID } from '../../context/sortingContext';
import { buttons } from '../category_icons/CategoryIcons'
import { SortByCategory } from '../sorting/Sorting';
import { styles } from "./style";
import { useFocusEffect } from '@react-navigation/native';


const Item = ({ item, onPress, backgroundColor, textColor, icon }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <View style={styles.titleview}>
      <MaterialCommunityIcons name={icon} size={20} color={"white"}/>
    </View>
    <View style={styles.titleview}>
    <Text style={[styles.title, { color: textColor }]}>{item.date}</Text>
    </View>
    <View style={styles.titleview}>
      <Text style={[styles.title, { color: textColor }]}>{item.description}</Text>
    </View>
    <View style={styles.expenseview}>
      <Text style={[styles.title, { color: textColor }]}>{item.expense ? item.expense : item.income}</Text>
    </View>
  </TouchableOpacity>
);

const ExpensesList = () => {

  const [selectedCategory] = useContext(SelectedID);

  const [selectedId, setSelectedId] = useState();
  const [tempList, setTempList] = useState();

  useFocusEffect(
    useCallback(() => {
    const fetchData = async () => {
      //console.log("Did fire")
      const sortedList = await SortByCategory(selectedCategory);
      setTempList(sortedList);
      console.log('This is the read list: ',sortedList[0])
      //console.log(sortedList)
    }
    fetchData();
  },[selectedCategory]))

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#663399' : '#665a6f';
    const color = item.id === selectedId ? 'white' : 'white';// Change this when you have dark and light theme!
    const icon = buttons.find(button => button.id === item.category)?.icon || 'progress-question'; // get the icon from buttons
    return (
      <Item
        item={item}
        icon={icon}
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