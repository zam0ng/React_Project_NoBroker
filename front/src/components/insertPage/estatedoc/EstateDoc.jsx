import React from 'react'
import {Container,Title,DocBox} from './estatedocstyled';

const EstateDoc = ({setUniqueNum}) => {
  function uniqueNum(e) {
    setUniqueNum(e.target.value);
  }
  return (
    <Container>

        <Title>매물 고유번호 *</Title>
        <DocBox>

            <input onChange={uniqueNum} type="text" placeholder='매물 고유번호 입력' />
        </DocBox>

    </Container>
  )
}

export default EstateDoc