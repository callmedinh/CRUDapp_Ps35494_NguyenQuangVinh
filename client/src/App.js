
import { BrowserRouter as Router,  Switch , Route } from "react-router-dom";
import './App.css';
import home from "./pages/Home";
import user from "./pages/User";
import edituser from "./pages/edituser"
 import distributor from "./pages/Distributor"
 import fruit from "./pages/fruit"
import editFruit from "./pages/editFruit";
import Login from "./pages/Login";



function App() {
  return (
    <div >
      <Router>
        <Switch>
        <Route path="/" exact  component={home} />
        <Route path ="/user" exact component={user} />
        <Route path = "/Distributor" component = {distributor}></Route>
        <Route path = "/fruit" component = {fruit}></Route>

        <Route path="/edituser/:id" component ={edituser}/>
        <Route path="/editfruit/:id" component ={editFruit}/>
        <Route path="/login" component ={Login}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
