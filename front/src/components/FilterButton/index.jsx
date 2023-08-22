import React, { useEffect, useState } from 'react'

import { ButtonContainer , ButtonTitle }from './styles'
import DropDownArrow from 'components/DropDownArrow/index'
// import ButtonTitle from 'components/DropDownArrow/index'


const FilterButton = ({title, handleModalToggle, id , fontWeight, color}) => {

    return (
      <>
        <ButtonContainer>

            <button  
              id={id} 
              style={{paddingLeft: '10px' , paddingRight: '10px' , border : 'none'}}
              onClick={ (e) => { 
                console.log(" FilterButton 에서 id 확인 " , e.currentTarget.id)   // currentTarget 를 쓰면 -> e.target.id 보다 더 잘 찍힌다.
                handleModalToggle(e.currentTarget.id) 
                }} >
              
              
              {/* 제목 */}
              <ButtonTitle fontWeight = {fontWeight} color={color}>  
                {title} 
              </ButtonTitle>

              {/* 밑으로 떨어지는 화살표 */}
              <DropDownArrow /> 


          </button>
        </ButtonContainer>
      </>
  )
}

export default FilterButton