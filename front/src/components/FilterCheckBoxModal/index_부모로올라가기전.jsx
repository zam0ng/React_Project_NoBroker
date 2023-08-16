import React, { useEffect, useState } from 'react'
import FilterModalContainer from 'components/FilterCheckBoxModal/styles'
import { useQuery } from 'react-query'
import axios from 'axios'


const FilterCheckBoxModal = ({ checkboxValue, setCheckboxValue , handleCheckBox, tradableData, setTradableData , title, left}) => {

  const fetchFilterTradableEstateData = async () => {

    const response = await axios.get(`http://localhost:8080/list/tradableEstate?roomType=${checkboxValue}` , {
      withCredentials : true, 
    })
    console.log("response 들어왔나🐣🐣🐣" , response)   // 📛 back 에서 아직 데이터가 안 들어옴
    return response.data.tradableEstate
  }

  const { data , error , isLoading } = useQuery( ['filterTradableEstateData' , checkboxValue] , fetchFilterTradableEstateData , {
    enabled : !!checkboxValue
  } )
  

  useEffect( () => {
    if(data && !error && !isLoading) {
      setTradableData(data)
      console.log("@filtermodal tradableData  바꼈나? 👏👏👏 " , tradableData)
    }
  } , [ data, error, isLoading ])
  

  const handleCheckBoxChange = (inputValue, isChecked) => {
    if(isChecked) {
      setCheckboxValue(inputValue)
      console.log("체크박스 된 것 들어갔나 확인" , checkboxValue)
    }
  }

  return (
    <>
          <FilterModalContainer left={left} >
  
          <form action="">
  
            <input type="checkbox" id="APT" value="아파트" onChange={ e => handleCheckBoxChange(e.target.value , e.target.checked) }/>
            <label> 아파트 </label>
  
            <input type="checkbox" id="House"  value="주택" onChange={ e => handleCheckBoxChange(e.target.value , e.target.checked) } />
            <label> 주택 </label>
          </form>

          </FilterModalContainer>
    </>
  )

}



export default FilterCheckBoxModal