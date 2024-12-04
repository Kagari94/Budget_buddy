import React, { useContext, useEffect, useState } from 'react';
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
import { useTheme } from 'react-native-paper'; // Import useTheme


const ExpensesList = () => {
  const { colors } = useTheme(); // Access theme colors


  const [selectedCategory] = useContext(SelectedID);

  const [selectedId, setSelectedId] = useState();
  const [tempList, setTempList] = useState();

  useEffect(() => {
    const fetchData = async () => {
      //console.log("Did fire")
      const sortedList = await SortByCategory(selectedCategory);
      setTempList(sortedList);
      console.log('This is the read list: ',sortedList[0])
    }
    fetchData();
  },[selectedCategory])

  const renderItem = ({ item }) => {
    const isSelected = item.id === selectedId;
    const backgroundColor = isSelected ? colors.primary : colors.surface;
    const textColor = isSelected ? colors.onPrimary : colors.onSurface;
    const iconColor = isSelected ? colors.onPrimary : colors.onSurface;
    const icon = buttons.find(button => button.id === item.category)?.icon || 'progress-question';

    return (
      <Item
        item={item}
        icon={icon}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={textColor}
        iconColor={iconColor}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
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



const Item = ({ item, onPress, backgroundColor, textColor, icon, iconColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
    <View style={styles.titleview}>
      <MaterialCommunityIcons name={icon} size={20} color={iconColor} />
    </View>
    <View style={styles.titleview}>
      <Text style={[styles.title, { color: textColor }]}>{item.date}</Text>
    </View>
    <View style={styles.titleview}>
      <Text style={[styles.title, { color: textColor }]}>{item.description}</Text>
    </View>
    <View style={styles.expenseview}>
      <Text style={[styles.title, { color: textColor }]}>{item.expense}</Text>
    </View>
  </TouchableOpacity>
);

export default ExpensesList;