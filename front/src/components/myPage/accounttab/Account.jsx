import React, { useState,useContext } from 'react'
import {Container,Myaccount,DepositWithdraw,Coincontainer,Coinlist,CoinlistDiv,
  SecondCoinlist,TabDiv,TossBox,DepositDiv,WithdrawDiv,Ablewithdraw,WithdrawValue} from './accountstyled';
import { MypageGlobal } from '../Mypage';
// import axios from 'axios';
import axios from '../../../Axios';
import { useMutation ,useQueryClient} from 'react-query';
const Account = () => {
  const [istab, setIstab]= useState(1);
  const [isdisabled, setisdisabled] = useState(true);
  const [isdisabled2, setisdisabled2] = useState(true);
  const [depositAmount, setdepositAmount] =useState(0);
  const [withdrawAmount, setwithdrawAmount] =useState(0);
  const [depositvalue,setdepositvalue]= useState("");
  const [withdrwavalue,setwithdrawvalue]= useState("");
  const [tc,settc]= useState("");
  const {updatedata} = useContext(MypageGlobal);
  // console.log(updatedata)
  const handlerBtn=(index)=>{
    setIstab(index);
  }

  const depositValue = (e) =>{

    setdepositAmount(e.target.value.replace(/\,/g, ''));
    // 천단위 마다 , 찍기ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    let ta = (e.target.value).replace(/\D/g, '');
    ta = ta.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    setdepositvalue(ta)
    const inputValue = e.target.value.trim();

      const depositBtn = document.getElementById("depositBtn");

      if (inputValue !== "") {
        depositBtn.style.backgroundColor = "orange";
        setisdisabled(false);
      }
      else {
        depositBtn.style.backgroundColor = "lightgray";
        setisdisabled(true);

      }
  }

  const withdrawValue = (e) =>{
    setdepositAmount(e.target.value.replace(/\,/g, ''));
    // 천단위 마다 , 찍기ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    let ta = (e.target.value).replace(/\D/g, '');
    ta = ta.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    setwithdrawvalue(ta);
    const inputValue2 = e.target.value.trim();


      const withdrawBtn = document.getElementById("withdrawBtn");
      const withdrawInput= document.getElementById("withdrawInput");

      if (inputValue2 !== "") {
        withdrawBtn.style.backgroundColor = "orange";
        setisdisabled2(false);
        if(inputValue2 > updatedata.won){
          alert("출금가능 금액을 확인해주세요.")
          withdrawInput.value="";

        }
      }
      else {
        withdrawBtn.style.backgroundColor = "lightgray";
        setisdisabled2(true);

      }
  }


  const deposit = async(el)=>{
    console.log(el);
    const data = await axios.get("/",{
      params :{el},
      withCredentials :true,
    })
    return data.data;
  }
  const queryClient = useQueryClient();

  const mutation = useMutation(deposit, {
    onSuccess: (data) => {

      console.log(data);
      const newWindow = window.open("/", "_blank");
      newWindow.document.write(data);
    }
  })

  const withdraw = async(el)=>{
    const data = await axios.get("/mypage/withdraw",{
      params :{el},
      withCredentials : true,
    })
    return data.data;
  }
  const withdrawMutation = useMutation(withdraw,{
    onSuccess :(data)=>{
      console.log(data);
      if(data =="출금완료"){
        queryClient.invalidateQueries('update')
      }
    }
  })

  const depositHandler = (id,money)=>{
    const depositInput= document.getElementById("depositInput");
    console.log("눌림?")
    depositInput.value="";
    mutation.mutate({id,money});
  }
  const withdrawHandler = (id,money)=>{
    const withdrawInput= document.getElementById("withdrawInput");
    console.log("눌림?")
    withdrawInput.value="";
    withdrawMutation.mutate({id,money});
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
              <div>{(updatedata.won)?.toLocaleString()} KRW</div>
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
          {/* <TabDiv isActive={istab===3} onClick={()=>handlerBtn(3)}>내역</TabDiv> */}
        </h4>
        <TossBox>
          { istab === 1 ?
            <>
          <DepositDiv>
            <span>입금금액 (KRW)</span>
            <input id="depositInput" type="text" placeholder='KRW' onChange={depositValue} value={depositvalue}/>
          </DepositDiv>
          <ul>
            <li>입금 실행시, 신청한 금액만큼 NoBroker 지갑으로 이체됩니다.</li>
            <li>은행 점검시간에는 입금 서비스 이용이 원활하지 않을수 있습니다.</li>
            <li>VPN 환경을 활용해 접속한 경우 입출금 이용이 제한될 수 있습니다.</li>
          </ul>
          <button id="depositBtn" onClick={()=>{depositHandler(updatedata.id,depositAmount)}} disabled={isdisabled} style={{backgroundColor: isdisabled ? "lightgray":"orange"}}>입금 신청</button>
          </> : <>
          <WithdrawDiv>
            <Ablewithdraw>
              <span>출금가능</span>
              <span>{(updatedata.won)?.toLocaleString()} KRW</span>
            </Ablewithdraw>
            <WithdrawValue>
              <span>출금금액 (KRW)</span>
              <input id="withdrawInput" type="text" placeholder='KRW' onChange={withdrawValue} value ={withdrwavalue}/>
            </WithdrawValue>
          </WithdrawDiv>
          <ul>
            <li>실명 인증된 계정을 타인에게 대여하는 경우 개인정보 노출 위험에 처할 수 있습니다.</li>
            <li>은행 점검시간에는 입금 서비스 이용이 원활하지 않을수 있습니다.</li>
            <li>부정거래가 의심될 경우 출금이 제한될 수 있습니다.</li>
          </ul>
          <button id="withdrawBtn" onClick={()=>{withdrawHandler(updatedata.id,withdrawAmount)}} disabled={isdisabled2} style={{backgroundColor: isdisabled2 ? "lightgray":"orange"}}>출금 신청</button>



          </>
          }
        </TossBox>
      </DepositWithdraw>

    </Container>
  )
}

export default Account