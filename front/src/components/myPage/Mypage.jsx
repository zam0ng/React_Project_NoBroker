import React, { useState ,createContext, useEffect} from 'react'
import {MypageContainer,MypageAlldiv,UserInfoDiv,FakeInfo,UserInfoUpdate,FakeDiv,
    MypageList,TabInfo, ListItem,UpdateModal,UpdateBox,Closediv,Updateimg
,Updatebox,UpdateboxInput,UpdateBtn} from './mypagestyled'
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
    const [isActive, setisActive] = useState(false);
    const [componentsValue, setComponentsValue] = useState("Account");
    const [updateId,setupdateId] = useState("");
    const [updatephone,setupdatephone] = useState("");
    const [updateaddress,setupdateaddress] = useState("");
    const [updateImg,setupdateImg] = useState("");
    
    const selectComponents= (params)=>{
        setComponentsValue(params);

    }
    
    useEffect(()=>{
        if(isActive==true){
            document.body.style.overflow="hidden";
        }
        else{
            document.body.style.overflow="visible";

        }
    },[isActive])

    // real_estate 테이블에서 내가 등록한 매물 내역 불러오기ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const getUserInfo = async () => {
        const response = await axios.get('http://localhost:8080/mypage/mypageinfo');
        return response.data;
      };  
  
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

    // transaction 테이블에서 내가 판매한, 구매한 내역 가져오기
    const getMyRegisterInfo = async ()=>{
        const {data} = await axios.get('http://localhost:8080/mypage/getmyregisterinfo',{
            withCredentials: true,
        })
        return data;
    }
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

    // 거래 완료 된 completed 1인거 정산
    const transactionCom = async() =>{
        const {data}= await axios.get('http://localhost:8080/mypage/transactionCom',
        {
          withCredentials : true,
        })
        return data;
    }
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    const getUpdateinfo = async()=>{
        const data = await axios.get('http://localhost:8080/mypage/getUpdateinfo',{
            withCredentials : true,
        })
        return data.data;
    }

    const { data: MyPageUserInfo, isLoading : userisLoading, error : usererror } = useQuery('users', getUserInfo);
    
    const {data: getmyregisterinfo,isLoading:getmyregisterinfoLoading, error : getmyregisterinfoError} = useQuery('getmyregister',getMyRegisterInfo);
    // console.log(getmyregisterinfo);

    const {data : updatedata,isLoading:updatedataLoading, error : updatedataError } =useQuery('update',getUpdateinfo)
    console.log(updatedata);
    const ta = (updatedata?.ssn)?.split("-");
    const ImgUrl = (updatedata?.user_img)?.split("\\")[2];
    

    const { data: transactionComdata, isLoading : transisLoading, error : transerror } = useQuery('transCom', transactionCom);
    // console.log(transactionComdata);
    

    if (userisLoading || getmyregisterinfoLoading || updatedataLoading) {
        return <div>로딩 중...</div>;
    }

    if (usererror) {
        return <div>오류: {usererror.message}</div>;
    }
    
    if (getmyregisterinfoError) {
        return <div>오류: {getmyregisterinfoError.message}</div>;
    }
    if (updatedataError){
        return <div>오류: {updatedataError.message}</div>;

    }
    const obj ={
        MyPageUserInfo,getmyregisterinfo
    }
    // (true : 공인중개사, false : 일반 유저)

    let roleText;
    if(updatedata.role==false){
         roleText = "일반유저";
    }
    else{
         roleText = "공인중개사"
    }
    let fakeInfoMsg ="";

    switch (updatedata.fake_count) {
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

    const infoUpdate = ()=>{
        setisActive(!isActive);
    }
    const profileupdate =(e)=>{
        let input = e.target;

        let profileImg= document.getElementById("profileImg");
        profileImg.innerHTML = '';
        if(input.files){

            let reader; 
            let file = input.files[0];
            setupdateImg(input.files[0]);
            
            reader = new FileReader();
            reader.onload =function(e){
                console.log("e.target--------------",e.target)
                let img = document.createElement('img');
                img.src = e.target.result;
                
                profileImg.appendChild(img);
            }
            reader.readAsDataURL(file);

        }
    }
    const onChangeHandler =(e)=>{
        const fieldName = e.target.name; 
        const fieldValue = e.target.value;

        const labelElement = e.target.previousElementSibling;
        if(fieldValue){
            labelElement.style.color = "orange";

            if(fieldName =='userid'){
                setupdateId(fieldValue)
            }
            else if(fieldName =='userphone'){
                setupdatephone(fieldValue)
            }
            else if(fieldName =='useraddress'){
                setupdateaddress(fieldValue)
            }
        }
        else if(fieldValue ==""){
            labelElement.style.color = "black";

        }
        // const placeholderValue = e.target.getAttribute('placeholder');
        // console.log(placeholderValue);
        // `${fieldName} changed to ${fieldValue}`
    }
    const updateHandler =()=>{

        const form = new FormData();
        form.append('userid',updateId);
        form.append('userphone',updatephone);
        form.append('useraddress',updateaddress);
        form.append('upload',updateImg);
        
        const data = axios.post('http://localhost:8080/mypage/update',form,{
            headers:{

                "Content-Type" : "multipart/form-data",
            },
            withCredentials : true,
        })
    }   

    
  return (
    <MypageGlobal.Provider value={obj}>
    <MypageIslogin/>
    <MypageAlldiv>
        {isActive ? <UpdateModal>
            <UpdateBox>
            <Closediv>
                <button onClick={infoUpdate}>x</button>
            </Closediv>
            <Updateimg>
                <div id="profileImg">
                    <img src={`http://localhost:8080/estate_imgs/${ImgUrl}`} alt="" />
                </div>
                <form action="/" method="post" encType='multipart/form-data'>
                    <label for="file"> 프로필 편집</label>
                    <input onChange={profileupdate} type="file" name='upload' id='file'></input>
                </form>
            </Updateimg>
            <Updatebox>
                <span>이름</span>
                <div>{updatedata.user_name}</div>
            </Updatebox>
            <Updatebox>
                <span>생년월일</span>
                <div>{ta[0]}</div>
            </Updatebox>
            <UpdateboxInput>
                <label for="userid">ID</label>
                <input onChange={onChangeHandler} id="userid" name="userid" placeholder={updatedata.user_id}></input>
            </UpdateboxInput>
            <UpdateboxInput>
                <label for="userphone">PHONE</label>
                <input onChange={onChangeHandler} id="userphone" name="userphone" placeholder={updatedata.phone}></input>
            </UpdateboxInput>
            <UpdateboxInput>
                <label for="useraddress">ADDRESS</label>
                <input onChange={onChangeHandler} id="useraddress" name="useraddress" placeholder={updatedata.address}></input>
            </UpdateboxInput>

            <UpdateBtn onClick={updateHandler}>수정하기</UpdateBtn>
            </UpdateBox>
        </UpdateModal>: <></>}
        <MypageContainer height={"210px"}>
            <UserInfoDiv height={"230px"}>
                <div>
                    <img src={`http://localhost:8080/estate_imgs/${ImgUrl}`} alt="" />
                </div>
                <span>{updatedata.phone}</span>
            </UserInfoDiv>
                <FakeInfo>
                    <FakeDiv>
                        <div>
                            <span>{roleText}</span>
                        </div>
                        <span>{updatedata.user_name}님,</span>
                        <div>{fakeInfoMsg}</div>
                    </FakeDiv>
                </FakeInfo>
                <UserInfoUpdate onClick={infoUpdate}>
                    <div>회원정보 수정</div>
                </UserInfoUpdate>
        </MypageContainer>
        <MypageContainer height={"640px"}>
            <MypageList>
                <ListItem isActive={componentsValue==="Account"} onClick={()=>selectComponents("Account")}>입출금</ListItem>
                <ListItem isActive={componentsValue==="Check"} onClick={()=>selectComponents("Check")}>등록한 매물 내역</ListItem>
                <ListItem isActive={componentsValue==="Register"} onClick={()=>selectComponents("Register")}>매물 거래 내역</ListItem>
                <ListItem isActive={componentsValue==="Transaciton"} onClick={()=>selectComponents("Transaciton")}>찜한 매물 / 취소 보상 내역</ListItem>
                {updatedata.role ?<ListItem isActive={componentsValue==="Vote"} onClick={()=>selectComponents("Vote")}>투표한 매물 내역</ListItem>:<></>}
            </MypageList>
            <TabInfo>
                {componentsValue==='Account' && <Account/>}
                {componentsValue==='Check' && <Check MyPageUserInfo={MyPageUserInfo} getmyregisterinfo={getmyregisterinfo}/>}
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