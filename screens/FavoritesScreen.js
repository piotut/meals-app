import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MealList from "../components/MealList";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from 'react-redux';

import HeaderButton from '../components/HeaderButton';

const FavoritesScreen = props => {
    const favMeals = useSelector(state => state.meals.favoriteMeals);

    if (favMeals.length === 0 || !favMeals) {
        return (
            <View style={styles.content}>
                <Text>
                    No favorite meals found. Start adding some!
                </Text>
            </View>
        )
    }

    return <MealList listData={favMeals} navigation={props.navigation} />
};

FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Menu" iconName='ios-menu' onPress={() => {
                    navData.navigation.toggleDrawer()
                }}></Item>
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default FavoritesScreen;