import React, { useState,useContext } from 'react'
import {Container,Myaccount,DepositWithdraw,Coincontainer,Coinlist,CoinlistDiv,
  SecondCoinlist,TabDiv,TossBox} from './accountstyled';
import { MypageGlobal } from '../Mypage';
import axios from 'axios';
import { useMutation ,useQueryClient} from 'react-query';
const Account = () => {
  const [istab, setIstab]= useState(1);
  const [isdisabled, setisdisabled] = useState(true);
  const [depositAmount, setdepositAmount] =useState(0);

  const {updatedata} = useContext(MypageGlobal);
  console.log(updatedata)
  const handlerBtn=(index)=>{
    setIstab(index);
  }
  const krw = 10000;

  const depositValue = (e) =>{
    const inputValue = e.target.value.trim();
    console.log(inputValue)
    setdepositAmount(inputValue)
    const depositBtn = document.getElementById("depositBtn");

    if(inputValue!==""){
      depositBtn.style.backgroundColor = "orange";
      setisdisabled(false);
    }
    else{
      depositBtn.style.backgroundColor = "lightgray";
      setisdisabled(true);

    }
  }

  const deposit = async(el)=>{
    const data = await axios.get("http://localhost:8080/",{
      params :{el},
      withCredentials :true,
    })
    return data.data;
  }
  const queryClient = useQueryClient();

  const mutation = useMutation(deposit, {
    onSuccess: (data) => {

      console.log(data);
      const newWindow = window.open("http://localhost:8080/", "_blank");
      newWindow.document.write(data);
    }
  }) 

  const depositHandler = (id,money)=>{
    console.log("눌림?")
    mutation.mutate({id,money});
  }
  
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
              <div>{updatedata.won} KRW</div>
              <div>{updatedata.btc} BTC</div>
              <div>{updatedata.eth} ETH</div>
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
        <TossBox>
          { istab === 1 ?
            <>
          <div>
            <span>입금금액 (KRW)</span>
            <input type="text" placeholder='KRW' onChange={depositValue} />
          </div>
          <ul>
            <li>입금 실행시, 신청한 금액만큼 NoBroker 지갑으로 이체됩니다.</li>
            <li>은행 점검시간에는 입금 서비스 이용이 원활하지 않을수 있습니다.</li>
            <li>VPN 환경을 활용해 접속한 경우 입출금 이용이 제한될 수 있습니다.</li>
          </ul>
          <button id="depositBtn" onClick={()=>{depositHandler(updatedata.id,depositAmount)}} disabled={isdisabled}>입금 신청</button> 
          </> : istab == 2 ? <>출금</> : <>내역</>
          }   
        </TossBox>
      </DepositWithdraw>

    </Container>
  )
}

export default Account