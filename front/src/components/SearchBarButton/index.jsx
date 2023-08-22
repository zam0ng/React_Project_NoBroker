import React from 'react'

import { 
    SearchBarButtonContainer,
    ClickedSearchBarButtonItem, 
    UnClickedSearchBarButtonItem
    } from './styles'


const SearchBarButton = ({handleMyLikeClickedList}) => {
  return (
    <SearchBarButtonContainer>
        
        <ClickedSearchBarButtonItem> <span> 매물 </span> </ClickedSearchBarButtonItem>
        <UnClickedSearchBarButtonItem onClick={handleMyLikeClickedList} > <span> 찜한방 </span> </UnClickedSearchBarButtonItem>
        
    </SearchBarButtonContainer>
    
  )
}

export default SearchBarButton