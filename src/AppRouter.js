import React,{useState} from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";

const AppRouter = () => {
  const [navValue, setNavValue] = useState(0);

  const getStoredFavoriteUsers = () => {
    if(localStorage.getItem("favoriteUsersList")){
      return JSON.parse(localStorage.getItem("favoriteUsersList"));
    }
    return [];
  }

  return (
    <ThemeProvider>
      <Router>
        <NavBar setNavValue={setNavValue} navValue={navValue}/>
        <Switch>
          <Route exact path="/" component={()=><Home isFavoritesView={false} getStoredFavoriteUsers={getStoredFavoriteUsers} setNavValue={setNavValue}/>} />
          <Route exact path="/Favorites" component={()=><Home isFavoritesView={true}  getStoredFavoriteUsers={getStoredFavoriteUsers} setNavValue={setNavValue}/>} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
