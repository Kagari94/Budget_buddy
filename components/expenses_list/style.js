import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const styles = StyleSheet.create({//Style to its own file

    container: {
        flex: 1,
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        width: width - 35,
        marginVertical: 5,
        borderRadius: 5
    },
    title: {
        fontSize: 14,
    },
    titleview: {
        flex: 1,
        alignItems: 'flex-end'
    },
    expenseview: {
        flex: 0.6,
        alignItems: 'flex-end'
    },
    dateview: {
        flex: 0.6,
        alignItems: 'flex-start',
    },
    iconview: {
        flex: 0.25,
        alignItems: 'flex-start'
    }
});