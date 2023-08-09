import React from 'react'
import { Container , Title,BuiltBox} from './builtstyled'

const EstateBuilt = ({setYear}) => {
  function yearHandler(e) {
    setYear(e.target.value);
  }
  const today= new Date(); // 현재 날짜 받아오기
  // yyyy-mm-dd 형태로 변환
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + today.getDate()).slice(-2);
  var dateString = year + '-' + month  + '-' + day;

  return (
    <Container>
        <Title>매물 건축년도 <span>*</span></Title>
        <BuiltBox>
            <input onChange={yearHandler} type="date" max={dateString} />
        </BuiltBox>
    </Container>
  )
}

export default EstateBuilt