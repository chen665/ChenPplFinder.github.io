import React, { useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import CheckIcon from '@material-ui/icons/Check';
import Add from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import "./userListStyle.css"
import * as S from "./style";

import * as C from "constant";


const UserList = ({ users, isLoading,isFavoritesView,getStoredFavoriteUsers}) => {
  let basicCountries = ['Brazil','Australia','Canada','Germany'];
  const [hoveredUserId, setHoveredUserId] = useState();
  const [filtersList, setfiltersList] = useState([]);
  const [favoriteUsers, setFavoriteUsers] = useState(getStoredFavoriteUsers());
  const [countryFilters, setCountryFilters] = useState(basicCountries);
  const [formInput, setFormInput] = useState();
  const [isInputVisible, setIsInputVisible] = useState(false);

  const isUserFavorite = (inputUser) => {
    if(inputUser)
    {
      return favoriteUsers.find(user => user.login.uuid === inputUser.login.uuid);  
    }
  };
  
  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };  
  
  const handleFavButton = (inputUser) => {
  
    let newFavoriteUsers;

    if(!favoriteUsers.find(user => user.login.uuid === inputUser.login.uuid)){
      newFavoriteUsers = [...favoriteUsers,inputUser];
    }
    else{
      newFavoriteUsers = favoriteUsers.filter(user => user.login.uuid !== inputUser.login.uuid)
    }

    setFavoriteUsers(newFavoriteUsers);
    localStorage.setItem("favoriteUsersList", JSON.stringify(newFavoriteUsers));

  };

  const handleChange = (value, isChecked)  => {

    var tempFiltersList = [...filtersList];
    
    if(isChecked){
      tempFiltersList.push(value);
    }
    else{
      tempFiltersList = tempFiltersList.filter(element => element !== value);
    } 
    setfiltersList(tempFiltersList);

  };

  const handeInput = (event) => {
    setFormInput(event.target.value);
  };  

  const handleSubmitFilter = (event) => {
    event.preventDefault();
    let tempFilters = [...countryFilters];
    tempFilters.push(formInput);
    setCountryFilters(tempFilters);
    setFormInput("");
  };  
  
  const handleAddFilterBtn = () => {
    setIsInputVisible(!isInputVisible);
  };
  
  if(isFavoritesView){
    users = getStoredFavoriteUsers();
  }

  users = users.filter(user => filtersList.map(filter => filter.toLowerCase()).includes(user.location.country.toLowerCase()) || filtersList.length == 0);

    return (
      
      <S.UserList className="mainContainer">
        <S.Filters>
          {
            countryFilters.map((countryName,key) => {
              return (
                <CheckBox label={countryName} key={key} onChange={handleChange} />
              );
            })
          }
           <Tooltip title={isInputVisible ? C.TEXTS.HIDE_FILTER_BTN : C.TEXTS.NEW_FILTER_BTN}>
          <Button variant="outlined" className="addFilterBtn" onClick={handleAddFilterBtn} color="primary">
            {isInputVisible ?  <RemoveIcon /> : <Add />}
          </Button>
          </Tooltip>
        </S.Filters>
        {
          isInputVisible && (        
          <form className="customForm" onSubmit={handleSubmitFilter}>
            <TextField  placeholder={C.TEXTS.NEW_FILTER} value={formInput} className="filterInput" required label="Country name" variant="outlined" onChange={handeInput}/>
            <Button type="submit" variant="contained" color="primary" className="submitFilterBtn"><CheckIcon /></Button>
          </form>
        )}

        <S.List>
          
          {users?.map((user, index) => {
            
             return (
                  <S.User
                    key={index} uuid={user?.login.uuid}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <S.UserPicture src={user?.picture.large} alt="" />
                    <S.UserInfo>
                      <Text size="22px" bold>
                        {user?.name.title} {user?.name.first} {user?.name.last}
                      </Text>
                      <Text size="14px">{user?.email}</Text>
                      <Text size="14px">
                        {user?.location.street.number} {user?.location.street.name}
                      </Text>
                      <Text size="14px">
                        {user?.location.city} {user?.location.country}
                      </Text>
                    </S.UserInfo>
                    <S.IconButtonWrapper isVisible={index === hoveredUserId || isUserFavorite(user)}>
                      <IconButton onClick={()=>{handleFavButton(user)}}>
                        <FavoriteIcon color="error" />
                      </IconButton>
                    </S.IconButtonWrapper>
                  </S.User>
                );
            
          })}
          {isLoading && (
            <S.SpinnerWrapper>
              <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
            </S.SpinnerWrapper>
          )}
        {users.length === 0 && !isLoading && (
          <S.EmptyList>{C.TEXTS.NO_USERS}</S.EmptyList>
        )}

        </S.List>

      </S.UserList>

    );    

};

export default UserList;
