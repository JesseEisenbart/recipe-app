import { render } from "react-dom";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import store from "./store";
import App from "./App";
import Home from "./views/Home/Home";
import AddRecipe from "./views/AddRecipe/AddRecipe";


//<Route path="expenses" element={<Home />} />
const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />}/>
          <Route path="add" element={<AddRecipe />}/>
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>,
  rootElement
);