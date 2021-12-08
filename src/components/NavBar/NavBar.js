import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link  } from "react-router-dom";

const NavBar = ({navValue, setNavValue}) => {

  const handleChange = (_e, newValue) => {
    setNavValue(newValue);
  };
  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={navValue}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" index={0} to="/" component={Link}/>
        <Tab label="Favorites" to="/Favorites" index={1} component={Link}/>
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
