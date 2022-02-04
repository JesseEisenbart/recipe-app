import { useSelector, useDispatch } from 'react-redux'
import Recipe from "./RecipeCard/RecipeCard"
import './RecipeList.scss'

import { formatTime, getTotalTime, getAverageRating} from '../../scripts/recipe/recipe'
import { selectAllRecipes } from './recipeListSlice'

const Recepies = () => {
    // const [recipes, setRecipes] = useState([]);

    // useEffect(() => {
    //     const q = query(collection(db, 'recipes'));
    //     onSnapshot(q, (querySnapshot) => {
    //     setRecipes(querySnapshot.docs.map(doc => (
    //             {
    //             id: doc.id,
    //             data: doc.data()
    //         }
    //         )))
    //     })
    // },[])

    const recipes = useSelector((state) => state.recipeList.recipes);
    
    return (
        <div className="recipes-container">
            {recipes.map((rec, i) => (
                <Recipe key={i} id={rec.data.id} name={rec.data.name} desc={rec.data.desc} rating={getAverageRating(rec.data.ratings)} img={rec.data.img} ingredients={rec.data.ingredients} instructions={rec.data.instructions} totalTime={getTotalTime(rec.data.cookTime, rec.data.prepTime)}/>
            ))}        
        </div>
    )
}

export default Recepies
