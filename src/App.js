import { Outlet, Link } from "react-router-dom";
import './styles/style.scss';
import Nav from './components/Nav/Nav';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRecipes } from "./components/RecipeList/recipeListSlice";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from './config'



function App() {



  return (
    <div className="App">
      <Nav />
      <Outlet /> 
    </div>
  );
}

export default App;
