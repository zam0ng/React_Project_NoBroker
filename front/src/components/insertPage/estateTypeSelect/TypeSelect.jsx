import React, { useEffect } from 'react'
import { Container,Title,SelectContainer } from './typeSelectstyled'
import { useState } from 'react'
import { apartimg,homeimg } from '../../../img'
const TypeSelect = ({selectValue,setSelectValue}) => {
    
  const select =(e) =>{
    setSelectValue(e.target.value);

  }

  useEffect(()=>{
    console.log(selectValue);
  },[selectValue])
  return (
    
    <Container>
        <Title>매물 유형 <span>*</span></Title>
        <SelectContainer>
            <input type="radio" value ="1" checked={selectValue==="1"} onChange={select} />
            <img src={apartimg} alt="" /><br></br>
            {/* <label>아파트</label> */}

            <input type="radio" value ="2" checked={selectValue==="2"} onChange={select}/>
            <img src={homeimg} alt="" /><br></br>

            {/* <label>주택</label> */}

        </SelectContainer>

    </Container>
  )
}

export default TypeSelect