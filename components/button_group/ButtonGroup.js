import React, { useContext } from 'react';
import { IconButton } from 'react-native-paper';
import { FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { styles } from "./style";
import { SelectedID } from '../../context/sortingContext';
import { buttons } from '../category_icons/CategoryIcons'//Use buttons from different file, icons are there too

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
        if(item.id != 'Income'){// Jotta income ei tule palkkiin
        return (
            <Item
                item={item}
                onPress={() => setSelectedId(item.id)}
                backgroundColor={backgroundColor}
                textColor={color}
            />
        );
    }else{
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
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}