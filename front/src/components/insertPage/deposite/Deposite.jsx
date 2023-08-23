import React from 'react'
import { Container, Title, DepositBox,DivBox,Name,Balance,Hover,SpeechBubble } from './depositestyled'

const Deposite = ({setBalance,setDeposite,deposite,balance}) => {

    const BalanceInputValue = (e)=>{
        setDeposite(e.target.value);
        const Deposite = parseInt(e.target.value)/10
        setBalance(Deposite);
    }

    const DepositeInputValue =(e)=>{
        setBalance(e.target.value);
    }

  return (
    <Container>
        <Title>가격 정보 <span>*</span></Title>
        <DepositBox>

            <DivBox>
                <Name>판매가</Name>
                <Balance>
                    <input type="text" onChange={BalanceInputValue}/>
                    <p>만원</p>
                </Balance>
            </DivBox>

            <DivBox>
                <Name>계약금</Name>
                <Balance>
                    <input type="text" placeholder={balance} onChange ={DepositeInputValue}/>
                    <p>만원</p>
                </Balance>
            </DivBox>
            <Hover>?
            <SpeechBubble>계약금 미입력시<br></br>자동으로 판매가의 10%로<br></br> 설정됩니다.</SpeechBubble>
            </Hover>
            
        </DepositBox>
    </Container>
  )
}

export default Deposite