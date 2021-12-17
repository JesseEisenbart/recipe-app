
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRecipeByID } from "../../scripts/recipe/recipe";
import RecipeForm from "../RecipeForm";

function EditRecipe() {
    const params = useParams();
    const id = params.recipeId;
    const recipes = useSelector((state) => state.recipeList.recipes);
    const recipe = getRecipeByID(id, recipes);

    return (
        <div>
            <RecipeForm editing={true} recTitle={recipe.name} recDesc={recipe.desc} recImg={recipe.img} recRating={recipe.getAverageRating()} recPrep={recipe.prepTime} recCook={recipe.cookTime} recServings={recipe.servings} recIngredients={recipe.ingredients} recInstructions={recipe.instructions} recId={recipe.id}/>
        </div>
    )
}

export default EditRecipe; 