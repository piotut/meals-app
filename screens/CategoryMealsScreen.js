import React from 'react';
import { useSelector } from 'react-redux';

import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";

const CategoryMealsScreen = props => {

    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const categoryId = props.navigation.getParam('categoryId');

    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.indexOf(categoryId) >= 0);

    return <MealList listData={displayedMeals} navigation={props.navigation}/>
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const categoryId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);

    return {
        headerTitle: selectedCategory.title,
    };
};

export default CategoryMealsScreen;