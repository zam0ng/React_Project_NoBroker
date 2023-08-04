import React, { useEffect } from 'react'
import { Container,Title,SelectContainer } from './typeSelectstyled'
import { useState } from 'react'
const TypeSelect = () => {
    const [selectValue,setSelectValue] = useState("1");
    
  
  const select =(e) =>{
    setSelectValue(e.target.value);
    
  }

  useEffect(()=>{
    console.log(selectValue);
  },[selectValue])
  return (
    
    <Container>
        <Title>매물 유형</Title>
        <SelectContainer>
            <input type="radio" value ="1" checked={selectValue==="1"} onChange={select} />
            <label>아파트</label>

            <input type="radio" value ="2" checked={selectValue==="2"} onChange={select}/>
            <label>주택</label>

        </SelectContainer>

    </Container>
  )
}

export default TypeSelect