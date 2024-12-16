import react from "react";
import { FlatList } from "react-native";
import { IconButton } from "react-native-paper";

const SelectCategory = ({onSelectCategory, selectedCategory}) => {
    const categories = [
        { id: 'Food', icon: 'food', color: '#cfbbfe', size: 20 },
        { id: 'Living', icon: 'home-heart', color: '#cfbbfe', size: 20 },
        { id: 'Transport', icon: 'bus', color: '#cfbbfe', size: 20 },
        { id: 'Hobbies', icon: 'tennis', color: '#cfbbfe', size: 20 },
        { id: 'Travel', icon: 'bag-suitcase-outline', color: '#cfbbfe', size: 20 },
        { id: 'Savings', icon: 'piggy-bank', color: '#cfbbfe', size: 20 },
        { id: 'Others', icon: 'dots-horizontal', color: '#cfbbfe', size: 20 },
    ];

    const renderCategory = ({item}) => (
        <IconButton 
            icon={item.icon}
            size={30}

            iconColor={selectedCategory === item.id ? "#634b97" : item.color}
            onPress={() => onSelectCategory(item.id)}
        />
    )

    return(
        <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id}
            horizontal
        
        
        />
    )
}

export default SelectCategory;