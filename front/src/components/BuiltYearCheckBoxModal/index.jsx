import React, { useEffect, useState } from 'react'
// import FilterModalContainer from 'components/FilterCheckBoxModal/styles'
import { ModalContentFormWrap , 
        FilterModalContainer , 
        ModalHeaderWrap , 
        ModalContentWrap ,
        FilterModalBuiltYearContainer, 
        ModalCheck,
        ModalCheckBuiltYear
      } from 'components/BuiltYearCheckBoxModal/styles'

import { useQuery } from 'react-query'
import axios from 'axios'


const FilterCheckBoxModal = ({ 
                              left,
                              value, 
                              handleBuiltYearCheckBox,
                              label_01, 
                              label_02, 
                              label_03, 
                              label_04, 
                              label_05, 
                              label_06, 
                            }) => {
  
    
  return (
    <>
          <FilterModalBuiltYearContainer left={left} >
  

          <ModalHeaderWrap>
              <h1> 사용 승인일 </h1>
              {/* <p> 중복선택이 가능합니다. </p> */}
            </ModalHeaderWrap>



            {/* [라디오 버튼 으로써, '하나만! 클릭되게 하려면' 필수 요소]
                  input 태그에 대해서 name 속성이 있으면 -> 같은 name 을 가진 것들 중 '하나만 작동!'
                  
                  [그러면, htmlFor = {label_01}> 기능은?]
                  '라벨에 적힌 글자' 를 눌러도 -> 라디오 버튼을 누른 것! 과 동일한 기능
                */}
          <ModalContentFormWrap>
                {/* <form action=""> */}

            <ModalCheckBuiltYear>
              <input 
                  type="radio" 
                  name='filterOption' 
                  id={label_01} 
                  value={label_01} 
                  onChange={ e => handleBuiltYearCheckBox(e.target.value , e.target.checked) }
                  />
              <label htmlFor = {label_01}> {label_01} </label>
            </ModalCheckBuiltYear>
  
            <ModalCheckBuiltYear> 
              <input type="radio" name='filterOption' id={label_02}  value={label_02} onChange={ e => handleBuiltYearCheckBox(e.target.value , e.target.checked) } />
              <label> {label_02} </label>
            </ModalCheckBuiltYear>

            <ModalCheckBuiltYear> 
              <input type="radio" name='filterOption' id={label_03}  value={label_03} onChange={ e => handleBuiltYearCheckBox(e.target.value , e.target.checked) } />
              <label> {label_03} </label>              
            </ModalCheckBuiltYear>

            <ModalCheckBuiltYear> 
              <input type="radio" name='filterOption' id={label_04}  value={label_04} onChange={ e => handleBuiltYearCheckBox(e.target.value , e.target.checked) } />
              <label> {label_04} </label>              
            </ModalCheckBuiltYear>

            <ModalCheckBuiltYear> 
              <input type="radio" name='filterOption' id={label_05}  value={label_05} onChange={ e => handleBuiltYearCheckBox(e.target.value , e.target.checked) } />
              <label> {label_05} </label>              
            </ModalCheckBuiltYear>

            <ModalCheckBuiltYear> 
              <input type="radio" name='filterOption' id={label_06}  value={label_06} onChange={ e => handleBuiltYearCheckBox(e.target.value , e.target.checked) } />
              <label> {label_06} </label>
            </ModalCheckBuiltYear>

          {/* </form> */}
          </ModalContentFormWrap>
            

          </FilterModalBuiltYearContainer>
    </>
  )

}



export default FilterCheckBoxModal