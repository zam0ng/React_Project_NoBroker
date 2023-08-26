import axios from '../../Axios';
import React from 'react'
import { useQuery } from 'react-query';
import VoteList from '../voteList/VoteList';
import NavHeader from "../navbar/NavHeader";
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'AuthContext';

const Vote = () => {
  const nav = useNavigate();
  const { certificate, logout } = useAuth();

  // 투표 가능한 매물 목록 받아오기
  const getVotableEstates = async () => {
    const { data } = await axios.get(`/vote`, {
      withCredentials : true
    });
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
    certificate(false);
    return (
      <div>{data.message}</div>
    )
  } else if (data?.message == "다시 로그인") {
    logout();
    certificate(false);
    nav("/login");
  }

  return (
    <div>
      <NavHeader />
      <h1>투표 목록</h1>
      <VoteList votable = {data.votable} />
    </div>
  )
}

export default Vote