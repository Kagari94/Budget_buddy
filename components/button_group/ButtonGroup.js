import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
import { FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from "./style";

const buttons = [//Icon list for now
    { id: 'food', icon: 'food', color: 'black', size: 20 },
    { id: 'living', icon: 'currency-eur', color: 'black', size: 20 },
    { id: 'transport', icon: 'bus', color: 'black', size: 20 },
    { id: 'hobbies', icon: 'teddy-bear', color: 'black', size: 20 },
    { id: 'travel', icon: 'bag-suitcase-outline', color: 'black', size: 20 },
    { id: 'savings', icon: 'teddy-bear', color: 'black', size: 20 },
    { id: 'others', icon: 'asterisk', color: 'black', size: 20 },
]

const Item = ({ item, onPress, backgroundColor, color }) => {
    return (
        <IconButton
            icon={item.icon}
            onPress={onPress}
            backgroundColor={backgroundColor}
            textColor={color}
        />
    );
};


export default function ButtonGroup() {
    const [selectedId, setSelectedId] = useState('food');

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';//Change the colors when theme has been picked
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
                    data={buttons}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={selectedId}
                    horizontal
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}