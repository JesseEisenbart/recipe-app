import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import Home from "./views/Home";
import AddRecipe from "./views/AddRecipe";
import FullRecipe from "./views/FullRecipe";
import RecipePage from "./components/RecipePage";
import EditRecipe from "./views/EditRecipe";
import Login from "./components/Login";
import AccountPage from "./views/AccountPage";
import Nav from "./components/Nav";

const rootElement = document.getElementById("root");

render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>  
                <Route index element={<Login />}/>
                <Route path="/" element={<Nav />}>
                    <Route path="recipes" element={<Home />}/>
                    <Route path="add" element={<AddRecipe />}/>
                    <Route path="account" element={<AccountPage />} />
                    <Route path="edit" element={<FullRecipe />}>
                        <Route path=":id" element={<EditRecipe />} />
                    </Route>
                    <Route path="recipes" element={<FullRecipe />}>
                        <Route path=":id" element={<RecipePage />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>,
    rootElement
);