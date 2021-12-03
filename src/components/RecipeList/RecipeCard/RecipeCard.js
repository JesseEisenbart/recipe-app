import React from 'react'
import './RecipeCard.scss';

const Recipe = ({name, desc, rating, img, ingredients, instructions, totalTime}) => {
    return (
        <div className="recipe-card">
            <div className="recipe-card-bg" style={{ backgroundImage: 'url(' + img + ')', }} ></div>
            <img className="recipe-card-img" src={img}/>
            <div className="recipe-card-bubbles">
                <div className="recipe-card-bubble rating"><i class="fas fa-star"></i><span>{rating}</span></div>
                {totalTime ? <div className="recipe-card-bubble time"><i class="far fa-clock"></i><span>{totalTime}</span></div> : <div/>}
            </div>
            <h1 className="recipe-card-title">{name}</h1>
            <p className="recipe-card-desc">{desc}</p>    
        </div>
    )
}

export default Recipe
