import React, { useEffect, useState } from 'react'
import {DateImg,EstateAllInfo,OtherInfo,JustState,Ta} from './checkstyled';
import axios from '../../../Axios';
import { serverUrl } from 'components/serverURL';
import { useMutation, useQueryClient } from 'react-query';
let eog,manwon;
const List = ({data}) => {
    console.log(data);
    const [isDisplay,setIsDisplay] = useState(false);
    // console.log(data);
    const state = data.accpet === 0 ? "투표중" :
    data.accpet === 1 ? "정상등록" :
    data.accpet === 2 ? "허위판정" :
    data.accpet === 3 ? "투표미달" :
    "투표미달";

    useEffect(() => {
        if (data.accpet === 3) {
          setIsDisplay(true);
        } else {
          setIsDisplay(false);
        }
      }, [data.accpet]);

    // createdAt 시간 바꾸기
    let ta = new Date(data.createdAt);

    const options = {
        timeZone: "Asia/Seoul",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };

    const formatter = new Intl.DateTimeFormat("en-US", options);
    const formattedDate = formatter.format(ta);

    const revisedFormattedDate = formattedDate.replace(
        /(\d{2})\/(\d{2})\/(\d{4})/,
        "$3/$1/$2"
    );
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

    // const ImgUrl = data.img_1?.split("\\")[2];
    const ImgUrl = data.img_1?.substr(12);
    console.log("img", ImgUrl)

    const updateAccept = async(el)=>{
        const data= await axios.get('/mypage/resubmit',{
            params :{el},
            withCredentials : true,
        })
        return data.data;
    }
    const queryClient = useQueryClient();
    const mutation =  useMutation(updateAccept,{
        onSuccess :(data)=>{
            console.log("qwejnroqwenroqw",data);
            if(data.msg=="성공"){

                queryClient.invalidateQueries(['users',data.id])
            }
        }
    })

    const resubmit = (el)=>{
        console.log(el);

       mutation.mutate(el);
    }


    // 돈 단위 바꾸기
    const changeMoney = (td) => {
        let uk = parseInt(td / 100000000);
        let ukrest = (td % 100000000).toString().padStart(8, "0");
        let manwon = (ukrest / 10000)
        if (uk > 0) {

            if (ukrest == 0) {
                return (uk + "억");

            }
            else {
                return (uk + "억" + manwon + "만원");

            }
        }
        else {
            return (manwon + "만원");
        }
    }

    const detailpageblank = (el) => {
        const url = `http://localhost:3000/detail/${el}`;
        window.open(url, '_blank');
    };
    
  return (
    <>
    <EstateAllInfo>
        <Ta onClick={()=>{detailpageblank(data.id)}}>
        <DateImg>
            <span>{revisedFormattedDate}</span>
            <img src={`${serverUrl}estate_imgs/${ImgUrl}`}></img>
        </DateImg>
        <OtherInfo>
            <div> {changeMoney(data.deposit)}</div>
            <div>{data.jibun}&nbsp;{data.additional_address}</div>
            <div><span>{data.area}㎡</span><span>,&nbsp;{data.type}</span></div>
        </OtherInfo>
        </Ta>
        <JustState id="juststate">
            <span>{state}</span>
            {isDisplay ? <button onClick={()=>{resubmit(data.id)}}>재등록</button>:<></>}
        </JustState>

    </EstateAllInfo>

    </>
  )
}

export default List
