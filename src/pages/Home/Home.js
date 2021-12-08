import React , { useState } from 'react';
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = ({getStoredFavoriteUsers,setNavValue}) => {
  const { users, isLoading } = usePeopleFetch();
  setTimeout(() => setNavValue(0), 0);
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} getStoredFavoriteUsers={getStoredFavoriteUsers}/>
      </S.Content>
    </S.Home>
  );
};

export default Home;
