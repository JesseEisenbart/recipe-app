import { createSlice } from '@reduxjs/toolkit'
import { createRecipe } from "../../scripts/recipe/recipe";
import generateID from '../../scripts/id/generateID';


// function getInitialRecipes() {
//     const q = query(collection(db, 'recipes'));
//     console.log("test");
//     onSnapshot(q, (querySnapshot) => {
        
//         return(querySnapshot.docs.map(doc => (
//             {
//             id: doc.id,
//             data: doc.data()
//         }
//         )))
//     })
// }

//createRecipe(generateID(), "Pizza", "Yummy", "https://images.pexels.com/photos/2741457/pexels-photo-2741457.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260", [5, 4, 3, 4, 5], 4, 30, 40, ["Tomato Sauce", "Olive Oil", "Basil", "Pepperoni", "Cheese"], ["Preheat oven", "Mix sauce", "Make dough"], ["Cook for 5 minutes longer"]),

export const recipeListSlice = createSlice({
    name: 'recipeList',
    initialState: {
        recipes: [],
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
        setRecipes: (state, action) => {
            state.recipes = action.payload;
        }
    },
})

export const { addRecipe, removeRecipe, updateRecipe, setRecipes } = recipeListSlice.actions

export default recipeListSlice.reducer

//export const selectAllRecipes = state => state.recipes

export const selectPostById = (state, recipeId) => state.posts.find(recipe => recipe.id === recipeId)