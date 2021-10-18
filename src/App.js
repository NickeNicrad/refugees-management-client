import React, {useEffect} from "react";
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

  useEffect(() =>
  {
    if (!AUTH_TOKEN && window.location.pathname !== "/login")
    {
      window.location.href = "/login"
    }
  }, [AUTH_TOKEN]);
  
  return (
    <Router>
      {!AUTH_TOKEN || window.location.pathname === "/login" ? null : <Header />}
      <Switch>
        <Route exact path="/" component={ROLE === "admin" ? Dashboard : Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/users" component={Users} />
        <Route path="/refugees" component={Refugees} />
        <Route path="/locations" component={AddLocations} />
        <Route path="/login" component={Login} />
      </Switch>
      {!AUTH_TOKEN || window.location.pathname === "/login" ? null : <Footer />}
    </Router>
  );
}

export default App;
