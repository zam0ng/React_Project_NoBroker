import React , {useEffect, useState} from 'react'

import ItemListWrapper from './styles'
import EstateItem from 'components/EstateItem/index'

import axios from 'axios';
import { useQuery } from 'react-query';

const ItemList = () => {
  
    // const [tradableData  , setTradableData] = useState([])      // state 기준으로 뽑은 거래가능한 데이터 | 현재는 테스트 버전만 뽑음

    // // react-query 로 데이터 가져오기 
    //   const { data, error, isLoading, isError } = useQuery('fetchData', () =>

    //   axios.get('http://localhost:8080/list/tradableEstate', {
    //           withCredentials: true,
    //       }).then((res) => res.data
    //       ).catch((error) => {console.log(error)})
    //   );

    // // 서버에서 받아온 매물 데이터를 hook 에 저장 
    //   useEffect( () => {
    //     if(data && !error && !isLoading) {
    //       setTradableData(data.tradableEstate)
    //     }
    //   } , [data , error , isLoading])
      
    //   useEffect( () => {
    //     if(tradableData && tradableData.length > 0) {
    //       console.log(" @ 잘들어왔나확인" , tradableData)
    //       // console.log(tradableData[0].deposit)  // 1000
    //       // console.log(tradableData[0].area)  // 100.2
    //       // console.log(tradableData[0].estate_name)  // "보라매롯데타워"
    //     }
    //   } , [tradableData])

      
  return (

    // 여기에서 필요한 데이터는 이제 props 로 전달받아서 사용하면 됨 ⭐⭐⭐⭐⭐⭐ 
    <ItemListWrapper>

      <EstateItem />
    
    </ItemListWrapper>
  
  
    )
}

export default ItemList