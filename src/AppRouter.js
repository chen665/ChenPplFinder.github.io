import React,{useState} from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";

import * as C from "constant";

const AppRouter = () => {
  const [navValue, setNavValue] = useState(0);

  const getStoredFavoriteUsers = () => {
    if(localStorage.getItem(C.LOCAL.FAVE_USERS)){
      return JSON.parse(localStorage.getItem(C.LOCAL.FAVE_USERS));
    }
    return [];
  }

  const handleActivePage = (isFavoritesView) => {
    setNavValue((isFavoritesView ? 1 : 0), 0);
  };

  return (
    <ThemeProvider>
      <Router>
        <NavBar setNavValue={setNavValue} navValue={navValue}/>
        <Switch>
          <Route exact path="/" component={()=><Home handleActivePage={handleActivePage} isFavoritesView={false} getStoredFavoriteUsers={getStoredFavoriteUsers} setNavValue={setNavValue}/>} />
          <Route exact path="/Favorites" component={()=><Home handleActivePage={handleActivePage} isFavoritesView={true}   getStoredFavoriteUsers={getStoredFavoriteUsers} setNavValue={setNavValue}/>} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
