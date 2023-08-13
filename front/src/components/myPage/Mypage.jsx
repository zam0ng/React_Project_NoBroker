import React, { useState ,createContext} from 'react'
import {MypageContainer,MypageAlldiv,UserInfoDiv,FakeInfo,UserInfoUpdate,FakeDiv,
    MypageList,TabInfo, ListItem} from './mypagestyled'
import Account from './accounttab/Account'
import Check from './checktab/Check'
import Register from './registertab/Register'
import Transaciton from './transactiontab/Transaciton'
import Vote from './votetab/Vote'
import axios from 'axios'
import MypageIslogin from '../insertPage/isLogined/MypageIslogin'
import { useQuery } from 'react-query'
export const MypageGlobal = createContext();
const Mypage = () => {
    const [componentsValue, setComponentsValue] = useState("Account");
    // const listBtn =()=>{
    //     console.log( "눌림")
    //     let list = document.querySelectorAll(".list");

    //     list.forEach((el,index) => {
    //         el.onclick =()=>{
    //             console.log(index);
    //         }
    //     });
    // }
    // function selectComponents(params) {
    //     setComponentsValue(params);
    // }

    const selectComponents= (params)=>{
        setComponentsValue(params);

    }
    const user_id = "qwer";
    const fake_count = 1;
    // (true : 공인중개사, false : 일반 유저)
    const role = false;
    let roleText;
    if(role==false){
         roleText = "일반유저";
    }
    else{
         roleText = "공인중개사"
    }
    let fakeInfoMsg ="";

    switch (fake_count) {
        case 0:
            fakeInfoMsg = " 👍 누적된 경고가 없습니다."
            break;
        case 1:
            fakeInfoMsg = " 🟨 누적된 경고1회, 2회 추가 경고 시 판매글 작성 불가"
            break;

        case 2:
            fakeInfoMsg = " ❗ 누적된 경고2회, 1회 추가 경고 시 판매글 작성 불가."
            break;
    
        default:
            fakeInfoMsg = " ⛔ 누적된 경고3회, 판매글 작성 불가"

            break;
    }
    const getUserInfo = async () => {
        const response = await axios.get('http://localhost:8080/mypage/mypageinfo');
        return response.data;
      };
  
      const { data: MyPageUserInfo, isLoading : userisLoading, error : usererror } = useQuery('users', getUserInfo);

    //   console.log(MyPageUserInfo);

    
    if (userisLoading) {
        return <div>로딩 중...</div>;
      }
    
      if (usererror) {
        return <div>오류: {usererror.message}</div>;
      }

      const obj ={
        MyPageUserInfo,
    }

  return (
    <MypageGlobal.Provider value={obj}>
    <MypageIslogin/>
    <MypageAlldiv>
        <MypageContainer height={"210px"}>
            <UserInfoDiv height={"230px"}>
                <div></div>
                <span>010-1234-5678</span>
            </UserInfoDiv>
                <FakeInfo>
                    <FakeDiv>
                        <div>
                            <span>{roleText}</span>
                        </div>
                        <span>{user_id}님,</span>
                        <div>{fakeInfoMsg}</div>
                    </FakeDiv>
                </FakeInfo>
                <UserInfoUpdate>
                    <div>회원정보 수정</div>
                </UserInfoUpdate>
        </MypageContainer>
        <MypageContainer height={"640px"}>
            <MypageList>
                <ListItem isActive={componentsValue==="Account"} onClick={()=>selectComponents("Account")}>입출금</ListItem>
                <ListItem isActive={componentsValue==="Check"} onClick={()=>selectComponents("Check")}>등록한 매물 내역</ListItem>
                <ListItem isActive={componentsValue==="Register"} onClick={()=>selectComponents("Register")}>매물 거래 내역</ListItem>
                <ListItem isActive={componentsValue==="Transaciton"} onClick={()=>selectComponents("Transaciton")}>찜한 매물</ListItem>
                <ListItem isActive={componentsValue==="Vote"} onClick={()=>selectComponents("Vote")}>투표한 매물 내역</ListItem>
            </MypageList>
            <TabInfo>
                {componentsValue==='Account' && <Account/>}
                {componentsValue==='Check' && <Check/>}
                {componentsValue==='Register' && <Register/>}
                {componentsValue==='Transaciton' && <Transaciton/>}
                {componentsValue==='Vote' && <Vote/>}
            </TabInfo>

        </MypageContainer>

        
    </MypageAlldiv>
    </MypageGlobal.Provider>
  )
}

export default Mypage