import { createSlice } from '@reduxjs/toolkit'
import { createRecipe } from "../../scripts/recipe/recipe";

const initialRecipes = [
    createRecipe(0, "Pizza", "Yummy", "https://images.pexels.com/photos/2741457/pexels-photo-2741457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", [5, 4, 3, 4, 5], "1-4", 30, 40, [], [], []),
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
    },
})

// Action creators are generated for each case reducer function
export const { addRecipe } = recipeListSlice.actions

export default recipeListSlice.reducer