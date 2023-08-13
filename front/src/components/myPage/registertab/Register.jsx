import React from 'react'
import {ResigterEstate,Container,StateDiv,Selectstate,SellDiv,BuyDiv} from './registerstyled';
const Register = () => {
  return (
    <Container>
      <ResigterEstate>
        <SellDiv>
          <StateDiv>판매<span>0</span></StateDiv>
          <StateDiv>판매중<span>0</span></StateDiv>
          <StateDiv>판매완료<span>0</span></StateDiv>
          <StateDiv>판매취소<span>0</span></StateDiv>
        </SellDiv>
        <BuyDiv>
          <StateDiv>구매<span>0</span></StateDiv>
          <StateDiv>구매중<span>0</span></StateDiv>
          <StateDiv>구매완료<span>0</span></StateDiv>
          <StateDiv>구매취소<span>0</span></StateDiv>
        </BuyDiv>

      </ResigterEstate>
      <Selectstate>


      </Selectstate>


    </Container>
  )
}

export default Register