import React from 'react'

import { 
    SearchBarButtonContainer,
    ClickedSearchBarButtonItem, 
    UnClickedSearchBarButtonItem
    } from './styles'


const SearchBarButton = ({ myLikeClickedList ,  handleMyLikeClickedList , handleAllEstateList}) => {
  return (
    <SearchBarButtonContainer>
        
        
          <ClickedSearchBarButtonItem myLikeClickedList={myLikeClickedList}  onClick={handleAllEstateList} > <span> 매물 </span> </ClickedSearchBarButtonItem>
        
          <UnClickedSearchBarButtonItem myLikeClickedList={myLikeClickedList} onClick={handleMyLikeClickedList} > <span> 찜한방 </span> </UnClickedSearchBarButtonItem>

        {/* keep */}
        {/* <ClickedSearchBarButtonItem onClick={handleAllEstateList} > 
          <span> 매물 </span> </ClickedSearchBarButtonItem>
        <UnClickedSearchBarButtonItem onClick={handleMyLikeClickedList} > <span> 찜한방 </span> </UnClickedSearchBarButtonItem> */}
        
    </SearchBarButtonContainer>
    
  )
}

export default SearchBarButton