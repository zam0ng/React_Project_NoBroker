import React from 'react'

import { 
    SearchBarButtonContainer,
    ClickedSearchBarButtonItem, 
    UnClickedSearchBarButtonItem
    } from './styles'


const SearchBarButton = () => {
  return (
    <SearchBarButtonContainer>
        
        <ClickedSearchBarButtonItem> <span> 매물 </span> </ClickedSearchBarButtonItem>
        <UnClickedSearchBarButtonItem> <span> 찜한방 </span> </UnClickedSearchBarButtonItem>
        
    </SearchBarButtonContainer>
    
  )
}

export default SearchBarButton