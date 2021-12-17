class Recipe {
    constructor(id, name, desc, img, ratings, servings, cookTime, prepTime, ingredients, instructions, notes) {
        this.id = id;  
        this.name = name;
        this.desc = desc;
        this.img = img;
        this.ratings = ratings;
        this.servings = servings;
        this.cookTime = cookTime;
        this.prepTime = prepTime;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.notes = notes;     
    }

    getAverageRating() {
        let total = 0;
        let finalTotal = 0;
        let len = this.ratings.length;

        for (var i=0; i < len; i++) {
            total += this.ratings[i];
        }
        
        finalTotal = (total/len);

        if (!Number.isInteger(finalTotal)) {
            finalTotal.toFixed(1);
        }

        return finalTotal;
    }

    formatTime(time) {
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

    getCookTime() {
        return this.formatTime(this.cookTime);
    }

    getPrepTime() {
        return this.formatTime(this.prepTime);
    }

    getTotalTime() {
        return this.formatTime(this.cookTime + this.prepTime);
    }
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

export function createRecipe(id=0, name="", desc="", img="", ratings=[], servings=1, cookTime=0, prepTime=0, ingredients=[], instructions=[], notes=[]) {
    return new Recipe(id, name, desc, img, ratings, servings, cookTime, prepTime, ingredients, instructions, notes);
}






