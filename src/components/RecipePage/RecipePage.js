import { useParams, useNavigate, Link } from "react-router-dom";
import { getRecipeByID } from "../../scripts/recipe/recipe";
import { getAverageRating, formatTime } from '../../scripts/recipe/recipe';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getUserRecipe, auth } from "../../config/firebase";
import { useEffect, useState } from "react";
import './RecipePage.scss';

function RecipePage() {
    const params = useParams();
    const recipeId = params.id;

    const [user, loading, error] = useAuthState(auth);
    const [userId, setUserId] = useState("");
    const [recipe, setRecipe] = useState({});
    const [ingredients, setIngredients] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [notes, setNotes] = useState([]);
    const [img, setImg] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [ratings, setRatings] = useState("");
    const [servings, setServings] = useState("");
    const [prepTime, setPrepTime] = useState(0);
    const [cookTime, setCookTime] = useState(0);

    const splitIngredients = (ingredients, side="left") => {
        const half = Math.ceil(ingredients.length / 2);
        if (side === "left") return ingredients.slice(0, half);
        if (side === "right") return ingredients.slice(half);   
    }

    const navigate = useNavigate();

        // Fetch user recipe from db
        const fetchUserRecipe = async () => {
            try {
                const recipe = await getUserRecipe(user.uid, recipeId);
                setRecipe(recipe);
                setIngredients(recipe.ingredients);
                setInstructions(recipe.instructions);
                setNotes(recipe.notes);
                setImg(recipe.img);
                setName(recipe.name);
                setDesc(recipe.desc);
                setRatings(recipe.ratings);
                setServings(recipe.servings);
                setPrepTime(recipe.prepTime);
                setCookTime(recipe.cookTime);
            } catch (err) {
                console.error(err);
                alert("An error occured while fetching user data");
            }
        };

    useEffect(() => {
        if (loading) return;
        if (user) {
            setUserId(user.uid);      
        }
        fetchUserRecipe();
    }, [user, loading]);

    function handleDelete() {
        navigate("/");
    }

    return (
        <div className="recipe-page">
            <div className="banner" style={{backgroundImage : `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url(${img})`} }>
                <div>
                    <h1 className="banner-text">{name}</h1>
                    <div className="banner-rating">{ratings}</div>
                </div>
                <button type="button" className="btn red delete-button" onClick={handleDelete}>DELETE</button>
                <Link to={`/edit/${recipeId}`}><button type="button" className="btn blue delete-button">EDIT</button></Link>
            </div>
            <div className="recipe-container">
                <div className="recipe-info"> 
                    <div>
                        <span>SERVES: {servings}</span><span className="pipe">|</span><span>PREP TIME: {formatTime(prepTime)} MINUTES</span><span className="pipe">|</span><span>COOK TIME: {formatTime(cookTime)} MINUTES</span>
                    </div>
                </div>  
                <div className="divider-line"></div> 
                <div className="recipe-ingredients">
                    <h2 className="section-title">INGREDIENTS</h2>
                    <div className="recipe-list">
                        <div className="ingredient-column">
                            {splitIngredients(ingredients, "left").map(function(ingredient, id) {
                                return (<li key={id} className="recipe-item">{ingredient}</li>)
                            })}
                        </div>
                        <div className="ingredient-column">
                            {splitIngredients(ingredients, "right").map(function(ingredient, id) {
                                return (<li key={id} className="recipe-item">{ingredient}</li>)
                            })}
                        </div>
                    </div>
                </div>
                <div className="divider-line"></div> 
                <div className="recipe-instructions">
                    <h2 className="section-title">INSTRUCTIONS</h2>
                    <div className="recipe-list">
                        {instructions.map(function(instruction, id) {
                            return (<li key={id} className="recipe-item">{id+1}. {instruction}</li>)
                        })}
                    </div>
                </div>
                <div className="divider-line"></div> 
                <div className="recipe-notes">
                    <h2 className="section-title">NOTES</h2>
                    <div className="recipe-list">
                        {notes.map(function(note, id) {
                            return (<li key={id} className="recipe-item">{note}</li>)
                        })}
                    </div>
                </div>
            </div>    
        </div>

    )
}

export default RecipePage

