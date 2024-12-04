import React, { useContext } from 'react';
import { IconButton } from 'react-native-paper';
import { FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from "./style";
import { SelectedID } from '../../context/sortingContext';

const buttons = [//Icon list for now
    {id: 'All', icon: 'all-inclusive', color: 'black', size: 20},
    { id: 'Food', icon: 'food', color: 'black', size: 20 },
    { id: 'Living', icon: 'currency-eur', color: 'black', size: 20 },
    { id: 'Transport', icon: 'bus', color: 'black', size: 20 },
    { id: 'Hobbies', icon: 'teddy-bear', color: 'black', size: 20 },
    { id: 'Travel', icon: 'bag-suitcase-outline', color: 'black', size: 20 },
    { id: 'Savings', icon: 'teddy-bear', color: 'black', size: 20 },
    { id: 'Others', icon: 'asterisk', color: 'black', size: 20 },
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
    const [selectedId, setSelectedId] = useContext(SelectedID);//Bring this to conext

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selectedId ? '#663399' : '#665a6f';//Change the colors when theme has been picked
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