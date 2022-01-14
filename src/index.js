import { render } from "react-dom";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import reduxStore from "./store";
import App from "./App";
import Home from "./views/Home/Home";
import AddRecipe from "./views/AddRecipe/AddRecipe";
import FullRecipe from "./views/FullRecipe/FullRecipe";
import RecipePage from "./components/RecipePage";
import EditRecipe from "./views/EditRecipe/EditRecipe";

const rootElement = document.getElementById("root");
const store = reduxStore;

// store.subscribe(()=>{
//   localStorage.setItem('reduxState', JSON.stringify(store.getState()))
//   console.log(store.getState())
// })

render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}/>
          <Route path="add" element={<AddRecipe />}/>
          <Route path="edit" element={<FullRecipe />}>
            <Route path=":recipeId" element={<EditRecipe />} />
          </Route>
          <Route path="recipes" element={<FullRecipe />}>
            <Route path=":recipeId" element={<RecipePage />} />
          </Route>
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>,
  rootElement
);