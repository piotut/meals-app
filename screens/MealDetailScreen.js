import React, { useEffect, useCallback } from 'react';
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from "../components/HeaderButton";
import { toggleFavorite } from "../store/actions/meals";


const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <Text>{props.children}</Text>
        </View>
    )
};


const MealDetailScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    const isFavoriteMeal = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));

    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);


    useEffect(() => {
        props.navigation.setParams({toggleFav: toggleFavoriteHandler})
    }, [toggleFavoriteHandler]);

    useEffect(() => {
        props.navigation.setParams({isFav: isFavoriteMeal})
    }, [isFavoriteMeal]);

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
            <View style={styles.details}>
                <Text>{selectedMeal.duration}m</Text>
                <Text>{selectedMeal.complexity.toUpperCase()}</Text>
                <Text>{selectedMeal.affordability.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(i => <ListItem key={i}>{i}</ListItem>)}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(s => <ListItem key={s}>{s}</ListItem>)}
        </ScrollView>
    );
};

MealDetailScreen.navigationOptions = (navigationData) => {
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFav = navigationData.navigation.getParam('toggleFav');
    const isFav = navigationData.navigation.getParam('isFav');
    return {
        headerTitle: mealTitle,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Favorite"
                    iconName={isFav ? 'ios-star' : 'ios-star-outline'}
                    onPress={toggleFav}
                />
            </HeaderButtons>
        )
    }
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200,
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center',
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
    },
});

export default MealDetailScreen;