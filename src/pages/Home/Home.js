import React , { useState } from 'react';
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";
import TabPanel from '@material-ui/lab/TabPanel';
import Cookies from 'js-cookie';

const Home = ({getStoredFavoriteUsers,setNavValue}) => {
  const { users, isLoading } = usePeopleFetch();
  setNavValue(0);
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
