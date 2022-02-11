import { useState, useEffect, useRef } from 'react'
import { createRecipe } from '../../scripts/recipe/recipe'
import { useDispatch, useSelector } from 'react-redux'
import { addRecipe, updateRecipe } from '../RecipeList/recipeListSlice'
import { useNavigate } from 'react-router'
import generateID from '../../scripts/id/generateID'
import { useAuthState } from 'react-firebase-hooks/auth';
import { addRecipeToDB, auth, db, logout, uploadFile } from "../../config/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import './RecipeForm.scss'

const RecipeForm = ({recTitle="", recDesc="", recImg="", recRating=5, recPrep=0, recCook=0, recIngredients=[], recInstructions=[], recId=0, editing=false, recServings=1}) => {
    const [title, setTitle] = useState(recTitle);
    const [desc, setDesc] = useState(recDesc);
    const [img, setImg] = useState(recImg);
    const [servings, setServings] = useState(recServings)
    const [rating, setRating] = useState(recRating);
    const [prepTime, setPrepTime] = useState(recPrep);
    const [cookTime, setCookTime] = useState(recCook);
    const [ingredients, setIngredients] = useState(recIngredients);
    const [ingredientString, setIngredientString] = useState("");
    const [instructions, setInstructions] = useState(recInstructions);
    const [instructionString, setInstructionString] = useState("");
    const [errors, setErrors] = useState({});

    const [user, loading, error] = useAuthState(auth);
    const [userUID, setUserUID] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) {
            setUserUID(user.uid);
        }
    }, [user, loading]);


    function removeImage() {
        setImg("");
    }

    function handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        
        switch(name) {
            case "title":
                setTitle(value);
            break;
            case "desc":
                setDesc(value);
            break;
            case "ingredients":
                setIngredientString(value);
            break;
            case "instructions":
                setInstructionString(value);
            break;
            case "img":
                let file = target.files[0];
                uploadFile(file, setImg);
            break;
            case "rating":
                setRating(value);
            break;
            case "servings":
                setServings(value);
            break;
            case "prep":
                setPrepTime(value);
            break;
            case "cook":
                setCookTime(value);
            break;
        }    
    }

    function addInstruction() {
        let valid = validateInstruction();
        const newList = [...instructions];
        if (valid) {
            newList.push(instructionString);
            setInstructions(newList);
            setInstructionString("");
        }   
    }

    function removeInstruction(index) {
        const newList = ingredients.filter((j, i) => i !== index);
        setInstructions(newList);
    }

    function addIngredient() {
        let valid = validateIngredient();
        const newList = [...ingredients];
        if (valid) {
            newList.push(ingredientString);
            setIngredients(newList);
            setIngredientString("");
        }   
    }

    function removeIngredient(index) {
        const newList = ingredients.filter((j, i) => i !== index);
        setIngredients(newList);
    }

    function validateTitle() {
        let isValid = true;
        if (title === "") {
            isValid = false;
        }

        return isValid;
    }

    function validateDescription() {
        let isValid = true;
        if (desc === "") {
            isValid = false;
        }

        return isValid;
    }

    function validateIngredient() {
        let isValid = true;
        if (ingredientString === "") {
            isValid = false;
        }

        return isValid;
    }

    function validateIngredientList() {
        let isValid = true;
        if (!ingredients.length) {
            isValid = false;
        }

        return isValid;
    }

    function validateInstruction() {
        let isValid = true;
        if (instructionString === "") {
            isValid = false;
        }

        return isValid;
    }
    
    function validateInstructionList() {
        let isValid = true;
        if (!instructions.length) {
            isValid = false;
        }

        return isValid;
    }

    function validateRating() {
        let isValid = true;
        if (rating > 5 || rating < 0) {
            isValid = false;
        }

        return isValid;
    }

    function handleValidation() {
        let errorsList = {};
        let formIsValid = true;

        if (!validateTitle()) {
            errorsList["title"] = " *Required ";
            formIsValid = false;
        }

        if (!validateDescription()) {
            errorsList["desc"] = " *Required ";
            formIsValid = false;
        }

        if (!validateIngredientList()) {
            errorsList["ingredients"] = " *Requires at least one ingredient ";
            formIsValid = false;
        }

        if (!validateInstructionList()) {
            errorsList["instructions"] = " *Requires at least one step ";
            formIsValid = false;
        }

        if (!validateRating()) {
            errorsList["rating"] = " *Enter a value between 0-5 ";
            formIsValid = false;
        }
        
        setErrors(errorsList);

        return formIsValid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (handleValidation()) {
            let finalRating = 0;
            let finalPrep = 0;
            let finalCook = 0;
            let finalServings = 0;

            if (rating !== "") {
                finalRating = parseFloat(rating);
            }

            if (cookTime !== "") {
                finalPrep = parseInt(cookTime);
            }

            if (servings !== "") {
                finalServings = parseInt(servings);
            }

            if (prepTime !== "") {
                finalCook = parseInt(prepTime);
            }
            
            const recipe = createRecipe(userUID, title, desc, img, [finalRating], finalServings, finalCook, finalPrep, ingredients, instructions, []);  
            addRecipeToDB(recipe);

            // if (editing) {
            //     const recipe = createRecipe(recId, title, desc, img, imgURL, [finalRating], finalServings, finalCook, finalPrep, ingredients, instructions, []);            
            //     dispatch(updateRecipe(recipe))
            // } else {
            //     const recipe = createRecipe(generateID(), title, desc, img, imgURL, [finalRating], finalServings, finalCook, finalPrep, ingredients, instructions, []);
            //     dispatch(addRecipe(recipe));
            // }

            navigate("/recipes");
        }
    }

    return (
        <div className="recipe-form-container">
            <form className="recipe-form" onSubmit={handleSubmit} noValidate>
                <div className="input-group">
                    <label htmlFor="title">Name<span className="error">{errors["title"]}</span></label> 
                    <input 
                        id="title"
                        type="text" 
                        name="title" 
                        value={title} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="desc">Description<span className="error">{errors["desc"]}</span></label> 
                    <textarea 
                        id="desc" 
                        type="text" 
                        name="desc" 
                        value={desc} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="ingredients">Ingredients<span className="error">{errors["ingredients"]}</span></label> 
                    <div>
                        {ingredients.map(function(ingredient, id) {
                            return (<div key={id} className="ingredient-item"><li>{ingredient}</li><i className="fas fa-times" onClick={() => removeIngredient(id)}></i></div>)
                        })}
                    </div>
                    <input 
                        id="ingredients"
                        type="text" 
                        name="ingredients" 
                        value={ingredientString} 
                        onChange={handleInputChange} 
                    />
                    <button type="button" className="button" onClick={addIngredient}>Add Ingredient</button>
                </div>
                <div className="input-group">
                    <label htmlFor="instructions">Instructions<span className="error">{errors["instructions"]}</span></label> 
                    <div>
                        {instructions.map(function(instruction, id) {
                            return (<div key={id} className="instruction-item"><li><span className="step-number">{id+1}.</span>{instruction}</li><i className="fas fa-times" onClick={() => removeInstruction(id)}></i></div>)
                        })}
                    </div>
                    <input 
                        id="instructions"
                        type="text" 
                        name="instructions" 
                        value={instructionString} 
                        onChange={handleInputChange} 
                    />
                    <button type="button" className="button" onClick={addInstruction}>Add Step</button>
                </div>
                <div className="input-group">
                    <label htmlFor="rating">Rating<span className="optional"> (0-5 optional)</span><span className="error">{errors["rating"]}</span></label> 
                    <input 
                        id="rating" 
                        type="number" 
                        name="rating" 
                        value={rating} 
                        min="1" 
                        max="5" 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="servings">Servings<span className="optional"> (optional)</span></label> 
                    <input 
                        id="servings" 
                        type="number" 
                        name="servings" 
                        value={servings} 
                        min="1" 
                        max="100" 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="prep">Prpe Time<span className="optional"> (minutes optional)</span></label> 
                    <input 
                        id="prep" 
                        type="number" 
                        name="prep" 
                        min="0" 
                        max="999" 
                        step="1" 
                        value={prepTime} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="cook">Cook Time<span className="optional"> (minutes optional)</span></label> 
                    <input 
                        id="cook" 
                        type="number" 
                        name="cook" 
                        min="0" 
                        max="999" 
                        step="1" 
                        value={cookTime} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <button 
                        type="button"
                        className="button" 
                        onClick={removeImage} 
                        style={img === "" ? {display: "none"} : {display: "block"}
                    }>
                    <i className="fas fa-times"></i>
                    </button>
                    <img className="preview-image" src={img}/>
                </div>
                <div className="input-group">
                    <label className="button custom-file-upload" htmlFor="img">Add Image</label> 
                    <input 
                        id="img" 
                        type="file" 
                        name="img" 
                        onChange={handleInputChange} 
                    />
                </div>  
                <input className="button" type="submit" value={editing ? "Update Recipe" : "Add Recipe to Bank" }/>
            </form>
        </div>
    )
}

export default RecipeForm
