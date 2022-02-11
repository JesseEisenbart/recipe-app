import { useSelector, useDispatch } from 'react-redux'
import Recipe from "./RecipeCard/RecipeCard"
import './RecipeList.scss'

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { useState, useEffect } from 'react';

import { auth, db, logout, getUserRecipes } from "../../config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import { formatTime, getTotalTime, getAverageRating} from '../../scripts/recipe/recipe'
import { selectAllRecipes } from './recipeListSlice'

const Recepies = () => {
    const [recipes, setRecipes] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    // Fetch user name from db
    const fetchUserRecipes = async () => {
        try {
            const recipeList = await getUserRecipes(user.uid);
            setRecipes(recipeList);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

      useEffect(() => {
        
        if (loading) return;
        if (!user) return navigate("/"); fetchUserRecipes();
      }, [user, loading]);


    return (
        <div className="recipes-container">
            {recipes.map((recipe, i) => (
                <Recipe key={i} id={recipe.uid} name={recipe.name} desc={recipe.desc} rating={getAverageRating(recipe.ratings)} img={recipe.img} ingredients={recipe.ingredients} instructions={recipe.instructions} totalTime={getTotalTime(recipe.cookTime, recipe.prepTime)}/>
            ))}        
        </div>
    )
}

export default Recepies
