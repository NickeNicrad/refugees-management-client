import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Footer from "./components/constants/Footer";
import Header from "./components/constants/Header";
import AddLocations from "./components/pages/AddLocations";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import Refugees from "./components/pages/Refugees";
import Users from "./components/pages/Users";

function App() {
  const AUTH_TOKEN = window.localStorage.getItem('token');
  const ROLE = JSON.parse(window.localStorage.getItem('role'));
  
  return (
    <Router>
      {window.location.pathname === "/login" || !AUTH_TOKEN ? <Route path="/login" component={Login} /> :
        <>
          <Header />
          <Switch>
            <Route exact path="/" component={ROLE === "admin" ? Dashboard : Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/users" component={Users} />
            <Route path="/refugees" component={Refugees} />
            <Route path="/locations" component={AddLocations} />
          </Switch>
          <Footer />
        </>
      }
    </Router>
  );
}

export default App;
