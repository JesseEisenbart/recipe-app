export function getAverageRating(ratings) {
    let total = 0;
    let finalTotal = 0;
    let len = ratings.length;

    for (var i=0; i < len; i++) {
        total += ratings[i];
    }
    
    finalTotal = (total/len);

    if (!Number.isInteger(finalTotal)) {
        finalTotal.toFixed(1);
    }

    return finalTotal;
}

export function formatTime(time) {
    var num = time;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    let finalstr = "";

    if (num >= 60) {
        finalstr += rhours + "h ";
    }

    if (rminutes > 0) {
        finalstr += rminutes + "m";
    }

    return finalstr;
}

export function getTotalTime(cookTime, prepTime) {
    return formatTime(cookTime + prepTime);
}

export function getRecipeByID(id, recipies) {
    let recipe = -1;
    for (var i=0; i<recipies.length; i++) {
        if (recipies[i].id === id) {
            recipe = recipies[i];
        }
    }

    return recipe;
}

export function createRecipe(id=0, name="", desc="", img="", imgURL="", ratings=[], servings=1, cookTime=0, prepTime=0, ingredients=[], instructions=[], notes=[]) {
    return {
        id: id, 
        name: name, 
        desc: desc, 
        img: img, 
        imgURL: imgURL, 
        ratings: ratings, 
        servings: servings, 
        cookTime: cookTime, 
        prepTime: prepTime, 
        ingredients: ingredients, 
        instructions: instructions, 
        notes: notes,
    }
}






