import { configureStore } from '@reduxjs/toolkit'
import recipeListReducer from './components/RecipeList/recipeListSlice'

export default configureStore({
  reducer: {
    recipeList: recipeListReducer,
  },
})