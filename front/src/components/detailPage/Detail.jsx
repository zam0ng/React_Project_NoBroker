import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';

const Detail = () => {
  // 매물 아이디
  const { id } = useParams();

  // 매물 상세 정보 요청
  const getEstateDetail = async () => {
    const { data } = await axios.get("http://localhost:8080/detail/1", {
      withCredentials : true
    });
    return data;
  }

  const { data, isLoading } = useQuery(['estate', id], getEstateDetail);

  if (isLoading) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <>
      <div>{data.estate.id}</div>
      <div>{data.estate.id}</div>
      <div>{data.estate.id}</div>
      <div>{data.estate.id}</div>
      <div>like : {data.like}</div>
      <div>fake_count : {data.fake_count}</div>
    </>
  )
}

export default Detail