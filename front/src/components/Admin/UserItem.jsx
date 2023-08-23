import React, { useState } from 'react'

import { UserItemWrap , 
        ImageContainer , 
        ClickedImageContainer,
        SealImageContainer,
        SealClickedImageContainer,

    } from './styles'
import { useMutation } from 'react-query'
import axios from 'axios'
import { QueryClient } from 'react-query';


const queryClient = new QueryClient();




const UserItem = ({item}) => {    
    const [showExpandedImg , setShowExpandedImg] = useState(false)
    const [isClicked , setIsClicked] = useState(false)
    
    const approveEstateAgent = useMutation( async(approveForm) => {
        const {data} = await axios.post("/admin/agentApprove" , approveForm , {
            withCredentials : true
        });
        return data;
    } , {
        onSuccess : (data) => {
            if(data?.message == "성공") {
                console.log("부동산 업자 승인 완료")
                
                queryClient.invalidateQueries('userDataList');    // UI 즉각 반영 
                queryClient.refetchQueries('userDataList')    // 매개변수는 앞에서 쿼리 key 를 입력
                
            } else {
                console.log("승인 과정 오류" , data)
                alert("오류 발생")
            }
        }
    }, {
        onError : (error) => {
            console.error(error)
        }
    })
    
    const disApproveEstateAgent = useMutation( async(disapproveForm) => {
        const {data} = await axios.post("/admin/agentDisapprove" , disapproveForm , {
            withCredentials : true
        });
        return data;
    } , {
        onSuccess : (data) => {
            if(data?.message == "성공") {
                console.log("미승인 완료")
                
                queryClient.invalidateQueries('userDataList');    // UI 즉각 반영 
                queryClient.refetchQueries('userDataList')    // 매개변수는 앞에서 쿼리 key 를 입력
                
            } else {
                console.log("승인 과정 오류" , data)
                alert("오류 발생")
            }
        }
    }, {
        onError : (error) => {
            console.error(error)
        }
    })


    const handleImageClicked = () => {
        setIsClicked(!isClicked)
    }

    // role 이 true(공인중개사 신청) 이고 && certificate_user == 1(신청중 인 상황) 이면 -> 승인, 미승인 버튼이 나온 상황
    const handleApproveBtn = () => {
        console.log(`${item.user_id} : 승인 버튼 클릭하면 -> item.certificate_user 을 0 으로 변경시키기 `)
        approveEstateAgent.mutate({user_id : item.user_id})
    }

    // role 이 true(공인중개사 신청) 이고 && certificate_user == 1(신청중 인 상황) 이면 -> 승인, 미승인 버튼이 나온 상황
    const handleDisapproveBtn = () => {
        console.log(`${item.user_id} : 미승인 버튼 클릭`)
        disApproveEstateAgent.mutate({user_id : item.user_id})
    }

    // ban 버튼 | 사용 안 함 
    // const handleBanBtn = () => {
    //     console.log( `${item.user_id}  : "ban 버튼`)
    // }

    return (
    <>
        <UserItemWrap> {/* UserListWrap 이랑 UserItemWrap 이 같아야 함   */}

            {/* 유저 아이디 | user_id  */}
            <p>{item.user_id} </p>

            {/* user_name */}
            <p>{item.user_name}</p>

            {/* address */}
            <p>{item.address}</p>

            {/* phone */}
            <p>{item.phone}</p>

            {/* fake_count */}
            <p> {item.fake_count}</p>

            {/* ban | 저장된 값이 BOOLEAN 타입. 따라서 '0' 으로 함 */}
                <p>
                    { 
                        item.ban == '0' ? '판매가능': '판매불가'
                    }    
                </p>


            {/* role == true -> 공인중개사 | role === false : 일반유저 |
            
             */}
            <p>
                {
                    item.role == false ? "일반유저" : 
                    // | item.role == true 인 경우 👇 | 공인중개사 신청한 경우 👇 | 
                        item.certificate_user == 0 ? '승인된 공인중개사' :
                        item.certificate_user == 1 ? '공인중개사 자격 심사중' :
                        '공인중개사 자격 미달'
                }
            </p>

            {/* | certificate_img | */}
            {
                <div>
                    <ImageContainer 
                        onClick={handleImageClicked} 
                        imageUrl={`http://localhost:8080/estate_imgs/${item.certificate_img}`} />

                    <ClickedImageContainer onClick={handleImageClicked} display={isClicked ? 'block' : 'none'} imageUrl={`http://localhost:8080/estate_imgs/${item.certificate_img}`} />
                </div>
            }

            {/* | seal_img | */}
            {
                <div>
                    <ImageContainer 
                        onClick={handleImageClicked} 
                        imageUrl={`http://localhost:8080/estate_imgs/${item.seal_img}`} />

                    <ClickedImageContainer onClick={handleImageClicked} display={isClicked ? 'block' : 'none'} imageUrl={`http://localhost:8080/estate_imgs/${item.seal_img}`} />
                </div>
            }

            {/* role 이 true(공인중개사 신청) 이고 && certificate_user == 1(신청중 인 상황) 이면 -> 승인, 미승인 버튼이 나오게 하기 
                role 이 true(공인중개사 신청) 이고 && certificate_user == 0(신청 완료) 이면 -> ban 할 수도 있으니까
            */}
            <p>
                {item.role == true && item.certificate_user == 1 ? (
                    <div style={{width : '120px'}}>
                        <button onClick={handleApproveBtn} >승인</button>
                        <button onClick={handleDisapproveBtn} >미승인</button>
                    </div>
                // ) : item.certificate_user == 0 ? ( <div style={{width : '120px'}} > <button onClick={handleBanBtn} >ban</button> </div> 
                ) : <div style={{width : '120px'}} > </div>
            }
            </p>
                
                
        </UserItemWrap>

    
    </>




  )
}

export default UserItem