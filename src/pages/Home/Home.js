import React from 'react';
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";

import * as S from "./style";

const Home = ({getStoredFavoriteUsers, setNavValue, isFavoritesView, handleActivePage}) => {
  const { users, isLoading } = usePeopleFetch();

  handleActivePage(isFavoritesView);

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={!isFavoritesView ? users : []} isFavoritesView={isFavoritesView} isLoading={isLoading} getStoredFavoriteUsers={getStoredFavoriteUsers}/>
      </S.Content>
    </S.Home>
  );
};

export default Home;
