import React, { useState } from 'react'
import {Container,Myaccount,DepositWithdraw,Coincontainer,Coinlist,CoinlistDiv,
  SecondCoinlist,TabDiv} from './accountstyled';
const Account = () => {
  const [istab, setIstab]= useState(1);

  const handlerBtn=(index)=>{
    setIstab(index);
  }
  const krw = 10000;
  return (
    <Container>
      <Myaccount>
        <h3>총 보유자산</h3>
        <Coincontainer>
          <CoinlistDiv>
            <h4>코인명</h4>
            <Coinlist>
              <div>KRW</div>
              <div>BTC</div>
              <div>ETH</div>
            </Coinlist>
          </CoinlistDiv>
          <CoinlistDiv>
            <h4>보유금액</h4>
            <SecondCoinlist>
              <div>{krw} KRW</div>
              <div>1.3 BTC</div>
              <div>2.4 ETH</div>
            </SecondCoinlist>
          </CoinlistDiv>
        </Coincontainer>
      </Myaccount>
      <DepositWithdraw>
        <h4>
          <TabDiv isActive={istab===1} onClick={()=>handlerBtn(1)}>입금</TabDiv>
          <TabDiv isActive={istab===2} onClick={()=>handlerBtn(2)}>출금</TabDiv>
          <TabDiv isActive={istab===3} onClick={()=>handlerBtn(3)}>내역</TabDiv>
        </h4>

      </DepositWithdraw>

    </Container>
  )
}

export default Account