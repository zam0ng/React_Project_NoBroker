import axios from '../../Axios';
import React from 'react'
import { useQuery } from 'react-query';
import VoteList from '../voteList/VoteList';

const Vote = () => {

  // 투표 가능한 매물 목록 받아오기
  const getVotableEstates = async () => {
    const { data } = await axios.get(`/vote`, {
      withCredentials : true
    });
    console.log("받아온 데이터",data);
    return data;
  }

  const { data, isLoading } = useQuery(['votable'], getVotableEstates);

  if (isLoading) {
    return (
      <div>loading...</div>
    )
  }

  if (data.error) {
    return (
      <div>오류</div>
    )
  }

  if (data?.message == "투표할 수 있는 권한이 없습니다.") {
    return (
      <div>{data.message}</div>
    )
  }

  return (
    <div>
      <h1>투표 목록</h1>
      <VoteList votable = {data.votable} />
    </div>
  )
}

export default Vote