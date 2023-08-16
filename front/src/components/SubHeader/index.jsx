import React from 'react'
import SubHeaderWrapper from './styles'

import SearchWrap from 'components/SearchWrap/index'
import FilterWrap from 'components/FilterWrap/'

const SubHeader = () => {
  return (

    <SubHeaderWrapper>

        <SearchWrap />
        <FilterWrap />

    </SubHeaderWrapper>
    
  )
}

export default SubHeader