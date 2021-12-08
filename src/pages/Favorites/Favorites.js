import React , { useState } from 'react';
import Text from "components/Text";

import UserList from "components/UserList";
import { getStoredFavoriteUsers } from "hooks";
import * as S from "../Home/style";
const Favorites = ({setNavValue,getStoredFavoriteUsers}) => {
  setTimeout(() => setNavValue(1), 0)
  return (
    <S.Home>  
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder - Favorites
          </Text>
        </S.Header>
        <UserList isFavoritesView={true} isLoading={false}  getStoredFavoriteUsers={getStoredFavoriteUsers}/>
      </S.Content>
    </S.Home>
  );
};

export default Favorites;
