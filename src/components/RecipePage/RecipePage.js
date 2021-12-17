import './RecipePage.scss'
import { useSelector, useDispatch } from 'react-redux'
import { removeRecipe } from '../RecipeList/recipeListSlice';
import { useParams, useNavigate, Link } from "react-router-dom";
import { getRecipeByID } from "../../scripts/recipe/recipe"

function RecipePage() {
    const params = useParams();
    const id = params.recipeId;
    const recipes = useSelector((state) => state.recipeList.recipes);
    const recipe = getRecipeByID(id, recipes);
    const ingredients = recipe.ingredients;
    const half = Math.ceil(ingredients.length / 2);    
    const leftIngredients = ingredients.slice(0, half);
    const rightIngredients = ingredients.slice(half);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleDelete() {
        dispatch(removeRecipe(recipe));
        navigate("/");
    }

    return (
        <div className="recipe-page">
            <div className="banner" style={{backgroundImage : `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${recipe.img})`} }>
                <div>
                    <h1 className="banner-text">{recipe.name}</h1>
                    <div className="banner-rating">{recipe.getAverageRating()}</div>
                </div>
                <button type="button" className="btn red delete-button" onClick={handleDelete}>DELETE</button>
                <Link to={`/edit/${id}`}><button type="button" className="btn blue delete-button">EDIT</button></Link>
            </div>
            <div className="recipe-container">
                <div className="recipe-info"> 
                    <div>
                        <span>SERVES: {recipe.servings}</span><span className="pipe">|</span><span>PREP TIME: {recipe.prepTime} MINUTES</span><span className="pipe">|</span><span>COOK TIME: {recipe.cookTime} MINUTES</span>
                    </div>
                </div>  
                <div className="divider-line"></div> 
                <div className="recipe-ingredients">
                    <h2 className="section-title">INGREDIENTS</h2>
                    <div className="recipe-list">
                        <div className="ingredient-column">
                            {leftIngredients.map(function(ingredient, id) {
                                return (<li key={id} className="recipe-item">{ingredient}</li>)
                            })}
                        </div>
                        <div className="ingredient-column">
                            {rightIngredients.map(function(ingredient, id) {
                                return (<li key={id} className="recipe-item">{ingredient}</li>)
                            })}
                        </div>
                    </div>
                </div>
                <div className="divider-line"></div> 
                <div className="recipe-instructions">
                    <h2 className="section-title">INSTRUCTIONS</h2>
                    <div className="recipe-list">
                        {recipe.instructions.map(function(instruction, id) {
                            return (<li key={id} className="recipe-item">{id+1}. {instruction}</li>)
                        })}
                    </div>
                </div>
                <div className="divider-line"></div> 
                <div className="recipe-notes">
                    <h2 className="section-title">NOTES</h2>
                    <div className="recipe-list">
                        {recipe.notes.map(function(note, id) {
                            return (<li key={id} className="recipe-item">{note}</li>)
                        })}
                    </div>
                </div>
            </div>    
        </div>

    )
}

export default RecipePage

