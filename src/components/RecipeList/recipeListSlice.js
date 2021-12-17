import { createSlice } from '@reduxjs/toolkit'
import { createRecipe } from "../../scripts/recipe/recipe";
import generateID from '../../scripts/id/generateID';

function getInitialRecipes() {
    const saved = localStorage.getItem("recipes");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
}

//createRecipe(generateID(), "Pizza", "Yummy", "https://images.pexels.com/photos/2741457/pexels-photo-2741457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", [5, 4, 3, 4, 5], 4, 30, 40, ["Tomato Sauce", "Olive Oil", "Basil", "Pepperoni", "Cheese"], ["Preheat oven", "Mix sauce", "Make dough"], ["Cook for 5 minutes longer"]),

export const recipeListSlice = createSlice({
    name: 'recipeList',
    initialState: {
        recipes: getInitialRecipes(),
    },
    reducers: {
        updateRecipe: (state, action) => {
            let tempArr = [...state.recipes];
            for (var i=0; i < tempArr.length; i++) {
                if (tempArr[i].id === action.payload.id) {
                    tempArr[i] = action.payload;
                }
            }
            state.recipes = tempArr;
        },
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

export const { addRecipe } = recipeListSlice.actions
export const { removeRecipe } = recipeListSlice.actions
export const { updateRecipe } = recipeListSlice.actions

export default recipeListSlice.reducer