import { useSelector, useDispatch } from 'react-redux'
import Recipe from "./RecipeCard/RecipeCard"
import './RecipeList.scss'

const Recepies = () => {
    const recipes = useSelector((state) => state.recipeList.recipes);
    return (
        <div className="recipes-container">
            {recipes.map((rec, i) => (
                <Recipe key={i} id={rec.id} name={rec.name} desc={rec.desc} rating={rec.getAverageRating()} img={rec.img} ingredients={rec.ingredients} instructions={rec.instructions} totalTime={rec.getTotalTime()}/>
            ))}        
        </div>
    )
}

export default Recepies
