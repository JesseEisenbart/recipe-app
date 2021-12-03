import { useState, useEffect, useRef } from 'react'
import { createRecipe } from '../../scripts/recipe/recipe';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../RecipeList/recipeListSlice';
import { useNavigate } from 'react-router';

import './RecipeForm.scss'

const RecipeForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [img, setImg] = useState("");
    const [rating, setRating] = useState(5);
    const [prepTime, setPrepTime] = useState(0);
    const [cookTime, setCookTime] = useState(0);
    const [ingredients, setIngredients] = useState([]);
    const [ingredientString, setIngredientString] = useState("");
    const [errors, setErrors] = useState({});

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
            case "img":
                setImg(URL.createObjectURL(target.files[0]));
            break;
            case "rating":
                setRating(value);
            break;
            case "prep":
                setPrepTime(value);
            break;
            case "cook":
                setCookTime(value);
            break;
        }    
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

        if (!validateRating()) {
            errorsList["rating"] = " *Enter a value between 0-5 ";
            formIsValid = false;
        }
        

        setErrors(errorsList);

        return formIsValid;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (handleValidation()) {
            let finalRating = 0;
            let finalPrep = 0;
            let finalCook = 0;
            if (rating !== "") {
                finalRating = parseInt(rating);
            }
            if (cookTime !== "") {
                finalPrep = parseInt(cookTime);
            }
            if (prepTime !== "") {
                finalCook = parseInt(prepTime);
            }
            const recipe = createRecipe(0, title, desc, img, [finalRating], "1-4", finalCook, finalPrep, [], [], []);
            dispatch(addRecipe(recipe));
            navigate("/");
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
                    <button type="button" className="button add-ingredient" onClick={addIngredient}>Add Ingredient</button>
                </div>
                <div className="input-group">
                    <label htmlFor="rating">Initial Rating<span className="optional"> (0-5 optional)</span><span className="error">{errors["rating"]}</span></label> 
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
                        className="remove-image" 
                        onClick={removeImage} style={img === "" ? {display: "none"} : {display: "block"}}>
                        <i className="fas fa-times"></i>
                    </button>
                    <img className="preview-image" src={img}/>
                </div>
                <div className="input-group">
                    <label className="custom-file-upload button" htmlFor="img">Image</label> 
                    <input 
                        id="img" 
                        type="file" 
                        name="img" 
                        onChange={handleInputChange} 
                    />
                </div>  
                <input className="button" type="submit" value="Add"/>
            </form>
        </div>
    )
}

export default RecipeForm
