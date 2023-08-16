import React, { useEffect, useState } from 'react'
import { FilterModalContainer , ModalHeaderWrap , ModalContentWrap , ModalCheck} from 'components/BuiltYearCheckBoxModal/styles'
import { useQuery } from 'react-query'
import axios from '../../Axios'
import { components } from 'react-select'

// import {
//   FilterModalContainer, ModalCheck
// } from 'components/FilterCheckBoxModal/styles'


const FilterCheckBoxModal = ({ 
                              label_01 , 
                              label_02 , 
                              handleCheckBox, 
                              checkboxValue,
                              // tradableData, 
                              // setTradableData , 
                              // title, 
                              height,
                              left}) => {
                      
  return (
    <>
          <FilterModalContainer left={left} height={height} >

            <ModalHeaderWrap>
              <h1> 방종류 </h1>
              <p> 중복선택이 가능합니다. </p>
            </ModalHeaderWrap>


            <ModalContentWrap>
              <div>

                <ModalCheck>
                  <input 
                      type="checkbox" 
                      id="APT" 
                      value={label_01} 
                      onChange={ e => handleCheckBox(e.target.value , e.target.checked) }/>
                  
                  <label> {label_01} </label>
                </ModalCheck>

              </div>

              <div>
                <ModalCheck>
                  <input type="checkbox" id="House"  value={label_02} onChange={ e => handleCheckBox(e.target.value , e.target.checked) } />
                  <label> {label_02} </label>
                </ModalCheck>
                
              </div>
            </ModalContentWrap>

  

          </FilterModalContainer>
    </>
  )

}



export default FilterCheckBoxModal