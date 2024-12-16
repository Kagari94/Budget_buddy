// ButtonGroup.js

import React, { useContext } from 'react';
import { IconButton, useTheme } from 'react-native-paper';
import { FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from "./style";
import { SelectedID } from '../../context/sortingContext';
import { buttons } from '../category_icons/CategoryIcons';
// Item Component
const Item = ({ item, onPress, backgroundColor, iconColor }) => {
    return (
        <IconButton
            icon={item.icon}
            onPress={onPress}
            style={[styles.iconButton, { backgroundColor }]} 
            color={iconColor} // Set icon color
            size={24} // Optional: Adjust size as needed
        />
    );
};

export default function ButtonGroup() {
    const [selectedId, setSelectedId] = useContext(SelectedID);
    const theme = useTheme();
    const { colors, dark } = theme; //

    const renderItem = ({ item }) => {
        const isSelected = item.id === selectedId;

        const backgroundColor = isSelected ? colors.primary : colors.surface;

        const iconColor = isSelected
            ? dark // If dark mode
                ? colors.onPrimary // Use theme's onPrimary (white)
                : '#ffffff' // If light mode, override to white for better contrast
            : colors.primary;

        // Exclude the 'Income' category from rendering
        if (item.id !== 'Income') {
            return (
                <Item
                    item={item}
                    onPress={() => setSelectedId(item.id)}
                    backgroundColor={backgroundColor}
                    iconColor={iconColor}
                />
            );
        } else {
            return null; 
        }
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={buttons}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={selectedId}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
