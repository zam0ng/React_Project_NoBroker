import React, { useState } from 'react'

import { UserItemWrap ,
        ImageContainer ,
        ClickedImageContainer,
        SealImageContainer,
        SealClickedImageContainer,
        ApproveBtn,
        DisapproveBtn,
        ButtonWrap, 
        AvailableForSale, 
        GeneralUser,
        NotForSale,
        ApprovedAgent, 
        DecisionInProcessAgent,
        LeaveOutAgent,


    } from './styles'
import { useMutation } from 'react-query'
import axios from 'axios'
import { QueryClient } from 'react-query';
import { serverUrl } from 'components/serverURL';


const queryClient = new QueryClient();



const UserItem = ({item , queryClient}) => {
    const [showExpandedImg , setShowExpandedImg] = useState(false)
    const [isCertificateImgClicked , setIsCertificateImgClicked ] = useState(false)
    const [isSealImgClicked , setIsSealImgClicked] = useState(false)

    const approveEstateAgent = useMutation( async(approveForm) => {
        const {data} = await axios.post("/admin/agentApprove" , approveForm , {
            withCredentials : true
        });
        return data;
    } , {onSuccess : (data) => {
            if(data?.message == "성공") {
                console.log("부동산 업자 승인 완료")

                queryClient.invalidateQueries('userDataList');    // UI 즉각 반영
                // queryClient.refetchQueries('userDataList')    // 'userDataList 키' 를 가진 usequery 를 재시작해서, 1) 새로고침없이 데이터를 받고, 2) 그에 따라 ui 변경하기

            } else {
                console.log("승인 과정 오류" , data)
                alert("오류 발생")
            }
        }
    }, {onError : (error) => {
            console.error(error)
        }
    })
    
    const disApproveEstateAgent = useMutation( async(disapproveForm) => {
        const {data} = await axios.post("/admin/agentDisapprove" , disapproveForm , {
            withCredentials : true
        });
        return data;
    } , {onSuccess : (data) => {
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


    const handleCertificateImgClicked = () => {
        setIsCertificateImgClicked (!isCertificateImgClicked)
    }
    const handleSealImgClicked = () => {
        setIsSealImgClicked(!isSealImgClicked )
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
                        item.ban == '0' ? <AvailableForSale> 판매 가능 </AvailableForSale> : <NotForSale> 판매 불가 </NotForSale>
                    }
                </p>
                {/* <p>
                    {
                        item.ban == '0' ? '판매가능': '판매불가'
                    }
                </p> */}


            {/* role == true -> 공인중개사 | role === false : 일반유저 |

             */}
            <p>
                { 
                    item.role == false ?  <GeneralUser> <div> 일반유저 </div> </GeneralUser>  :
                    // | item.role == true 인 경우 👇 | 공인중개사 신청한 경우 👇 |
                        item.certificate_user == 0 ? <ApprovedAgent> <div>업자 승인완료</div> </ApprovedAgent>   :
                        item.certificate_user == 1 ? <DecisionInProcessAgent> <div> 업자 심사중 </div> </DecisionInProcessAgent>   :
                        <LeaveOutAgent>  <div> 업자 자격 미달 </div>  </LeaveOutAgent>  
                }
            </p>

            {/* | certificate_img | */}
            {
                <div style={{width : '100px', display : 'flex' , alignItems : 'center' , justifyContent : 'center'} } >
                    <ImageContainer
                        onClick={handleCertificateImgClicked}
                        imageUrl={`${serverUrl}user_imgs/${item.certificate_img?.substr(13)}`} />

                    <ClickedImageContainer onClick={handleCertificateImgClicked} display={isCertificateImgClicked ? 'block' : 'none'} imageUrl={`${serverUrl}user_imgs/${item.certificate_img?.substr(13)}`} />
                </div>
            }

            {/* | seal_img | */}
            {
                <div style={{width : '80px' , display : 'flex' , alignItems : 'center' , justifyContent : 'center' }} >
                    <ImageContainer
                        onClick={handleSealImgClicked}
                        imageUrl={`${serverUrl}user_imgs/${item.seal_img?.substr(13)}`} />

                    <ClickedImageContainer onClick={handleSealImgClicked} display={isSealImgClicked ? 'block' : 'none'} imageUrl={`${serverUrl}user_imgs/${item.seal_img?.substr(13)}`} />
                </div>
            }

            {/* role 이 true(공인중개사 신청) 이고 && certificate_user == 1(신청중 인 상황) 이면 -> 승인, 미승인 버튼이 나오게 하기
                role 이 true(공인중개사 신청) 이고 && certificate_user == 0(신청 완료) 이면 -> ban 할 수도 있으니까
            */}
            
            <div>
                {item.role == true && item.certificate_user == 1 ? (
                <>
                    <ButtonWrap>
                        <ApproveBtn onClick={handleApproveBtn} >
                            승인
                        </ApproveBtn>

                        <DisapproveBtn onClick={handleDisapproveBtn} >
                            미승인
                        </DisapproveBtn>
                    </ButtonWrap>
                </>
                // ) : item.certificate_user == 0 ? ( <div style={{width : '120px'}} > <button onClick={handleBanBtn} >ban</button> </div>
                ) : <div style={{width : '120px'}} > </div>
            }
            </div>


        </UserItemWrap>


    </>




  )
}

export default UserItem