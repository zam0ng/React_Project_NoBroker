import React from 'react'

import {
    SearchBarButtonContainer,
    ClickedSearchBarButtonItem,
    UnClickedSearchBarButtonItem
    } from './styles'

import { useAuth } from 'AuthContext'

const SearchBarButton = ({ myLikeClickedList ,  handleMyLikeClickedList , handleAllEstateList}) => {
  const { isLoggedIn } = useAuth();

  return (
    <SearchBarButtonContainer>


          <ClickedSearchBarButtonItem myLikeClickedList={myLikeClickedList}  onClick={handleAllEstateList} > <span> 매물 </span> </ClickedSearchBarButtonItem>

          {isLoggedIn ?
          <UnClickedSearchBarButtonItem myLikeClickedList={myLikeClickedList} onClick={handleMyLikeClickedList} > <span> 찜한방 </span> </UnClickedSearchBarButtonItem>
          :
          <UnClickedSearchBarButtonItem myLikeClickedList={myLikeClickedList} onClick={()=>{window.alert("로그인 하세요.");}} > <span> 찜한방 </span> </UnClickedSearchBarButtonItem>
          }

        {/* keep */}
        {/* <ClickedSearchBarButtonItem onClick={handleAllEstateList} >
          <span> 매물 </span> </ClickedSearchBarButtonItem>
        <UnClickedSearchBarButtonItem onClick={handleMyLikeClickedList} > <span> 찜한방 </span> </UnClickedSearchBarButtonItem> */}

    </SearchBarButtonContainer>

  )
}

export default SearchBarButton