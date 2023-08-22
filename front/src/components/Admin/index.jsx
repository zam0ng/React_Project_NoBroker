import React from 'react'

import {
    TitleHeaderWrap, 
    AdminPageDefault,
    UserListWrap,
} from 'components/Admin/styles'

import Criteria from './Criteria'
import UserItem from './UserItem'
import axios from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { useEffect } from 'react'



const Admin = () => {

    const [userData, setUserData] = useState();

    const userDataList = async() => {
        let url = '/admin/userListData'

        const response = await axios.get(url , {
            withCredentials : true, 
        })
        
        // 수정 필요 
        setUserData(response.data.userListData)
        return response.data
    }

    const {data, error, isLoading} = useQuery ( [ 
        'userDataList' , userData] ,
        userDataList, {
            // enabled : !!userData //  [해석] 이게 활성화 되면 -> checkboxValue 에 값이 있을 때만 값이 가져와짐
        })


    useEffect( () => {
        // console.log("response.data" , response.data)
        console.log("userData" , userData)
    } )


return (
    <AdminPageDefault>

        <TitleHeaderWrap>
            <h1>admin 계정 관리</h1>
            <p> 회원 목록 및 승인 관리 </p>
        </TitleHeaderWrap>

            {/* 필터 기능 있어야?*/}
            <UserListWrap>
                <Criteria > </Criteria >

            </UserListWrap>
                {
                    userData && userData.map( (item, index) => {
                        return <UserItem item={item} >  </UserItem>

                    } )
                } 




    </AdminPageDefault>
    
    )
}

export default Admin



/*
{
    "id": 1,
    "user_img": "userimg",
    "user_id": "qwer",
    "password": "qwer",
    "role": false,
    "certificate_img": "certificateimg",
    "certificate_user": null,
    "fake_count": 0,
    "ban": false,
    "user_name": "JY",
    "address": "경기도 부천시 소사구 범박동",
    "phone": "010-1234-5678",
    "ssn": "950811-1234567",
    "seal_img": "sealimg",
    "won": 100000,
    "btc": 0.3,
    "eth": 1.5,
    "disabled_won": 10000,
    "disabled_btc": 0.1,
    "disabled_eth": 0.5,
    "createdAt": "2023-08-07T06:48:39.000Z",
    "updatedAt": "2023-08-07T06:48:39.000Z"
}


*/