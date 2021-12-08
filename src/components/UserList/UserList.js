import React, { useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from "@material-ui/core/FormControl";
import CheckIcon from '@material-ui/icons/Check';
import Add from '@material-ui/icons/Add';

import "./userListStyle.css"
import * as S from "./style";

// const getStoredFavoriteUsers = () => {

//   if(localStorage.getItem("favoriteUsersList")){
//       console.log('local ' + localStorage.getItem("favoriteUsersList"));
//       return JSON.parse(localStorage.getItem("favoriteUsersList"));
//   }
//   return [];

// }
  
const UserList = ({ users, isLoading,isFavoritesView,getStoredFavoriteUsers}) => {
  let basicCountries = ['Brazil','Australia','Canad','Germany'];
  const [hoveredUserId, setHoveredUserId] = useState();
  const [filtersList, setfiltersList] = useState([]);
  const [favoriteUsers, setFavoriteUsers] = useState(getStoredFavoriteUsers());
  const [countryFilters, setCountryFilters] = useState(basicCountries);
  const [formInput, setFormInput] = useState();

  const isUserFavorite = (inputUser) => {
    return favoriteUsers.find(user => user.login.uuid === inputUser.login.uuid);  
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
    console.log('submitted ' + event.target.value);
  };  

  const handleSubmitFilter = (event) => {
    event.preventDefault();
    let tempFilters = [...countryFilters];
    tempFilters.push(formInput);
    setCountryFilters(tempFilters);
  };
  
  if(isFavoritesView){
    users = getStoredFavoriteUsers();
  }
  users = users.filter(user => filtersList.includes(user.location.country) || filtersList.length == 0);

    return (
      
      <S.UserList>
        <S.Filters>
          {
            countryFilters.map((countryName,key) => {
              return (
                <CheckBox label={countryName} key={key} onChange={handleChange} />
              );
            })
          }
          {/* <CheckBox value="BR" label="Brazil" onChange={handleChange} />
          <CheckBox value="AU" label="Australia" onChange={handleChange}/>
          <CheckBox value="CA" label="Canada" onChange={handleChange}/>
          <CheckBox value="DE" label="Germany" onChange={handleChange}/> */}
          <Button variant="outlined" className="addFilterBtn" color="primary"><Add /></Button>
          
        </S.Filters>
        <form className="customForm" onSubmit={handleSubmitFilter}>
            <TextField id="outlined-basic" className="filterInput" required label="Country name" variant="outlined" onChange={handeInput}/>
            <Button type="submit" variant="contained" color="primary"><CheckIcon /></Button>
        </form>

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
          <S.EmptyList>No users to show</S.EmptyList>
        )}

        </S.List>

      </S.UserList>

    );    

};

export default UserList;
