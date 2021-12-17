import { Outlet, Link } from "react-router-dom";
import './styles/style.scss';
import Nav from './components/Nav/Nav';



function App() {

  return (
    <div className="App">
      <Nav />
      <Outlet /> 
    </div>
  );
}

export default App;
