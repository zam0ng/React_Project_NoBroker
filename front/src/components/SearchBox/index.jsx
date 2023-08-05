import React from 'react'

import {
  SearchBarWrap,
  SearchBarContainer
  } from 'components/SearchBox/styles'

import PlaceAutocomplete from 'components/PlaceAutocomplete/index'



const SearchBox = () => {
  return (

    <SearchBarWrap>
      <SearchBarContainer>
        
        <PlaceAutocomplete />
          <div> SearchResults </div>

      </SearchBarContainer>
    </SearchBarWrap>
  )
}

export default SearchBox