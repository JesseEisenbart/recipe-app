import { createSlice } from '@reduxjs/toolkit'
import { createRecipe } from "../../scripts/recipe/recipe";
import generateID from '../../scripts/id/generateID';

const initialRecipes = [
    createRecipe(generateID(), "Pizza", "Yummy", "https://images.pexels.com/photos/2741457/pexels-photo-2741457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", [5, 4, 3, 4, 5], 4, 30, 40, ["Tomato Sauce", "Olive Oil", "Basil", "Pepperoni", "Cheese"], ["Preheat oven", "Mix sauce", "Make dough"], ["Cook for 5 minutes longer"]),
]

export const recipeListSlice = createSlice({
    name: 'recipeList',
    initialState: {
        recipes: initialRecipes,
    },
    reducers: {
        addRecipe: (state, action) => {
            state.recipes.push(action.payload);
        },
        removeRecipe: (state, action) => {
            var index = state.recipes.indexOf(action.payload);
            if (index > -1) {
                state.recipes.splice(index, 1);
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { addRecipe } = recipeListSlice.actions
export const { removeRecipe } = recipeListSlice.actions

export default recipeListSlice.reducer