import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { addRecipe } from "./recipeListSlice"
import Recipe from "./RecipeCard/RecipeCard"
import './RecipeList.scss'

const Recepies = () => {
    const recipes = useSelector((state) => state.recipeList.recipes);
    const dispatch = useDispatch();



    return (
        <div className="recipes-container">
            {recipes.map((rec) => (
                <Recipe name={rec.name} desc={rec.desc} rating={rec.getAverageRating()} img={rec.img} ingredients={rec.ingredients} instructions={rec.instructions} totalTime={rec.getTotalTime()}/>
            ))}        
        </div>
    )
}

export default Recepies
