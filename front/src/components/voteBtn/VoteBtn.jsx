import React from 'react'
import axios from '../../Axios'
import { useQuery, useMutation } from 'react-query'
import { Btn, BtnDiv, H1 } from './voteBtn.styled'

const VoteBtn = ({ estate, queryClient }) => {
  // 투표, 투표 완료했을때 보여지는 부분
  // estate의 투표 가능 여부에 따라 버튼 표시
  // detail에서 해당 유저가 투표한 적 있는지 여부 확인(정보 표시)

  const createMutation = useMutation(
    async (vote) => {
      const { data } = await axios.post(
        "/vote/voteEstate",
        vote,
        {
          withCredentials: true,
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        if (data.message && data.message == "성공") {
          queryClient.invalidateQueries("vote");
        } else {
          alert("오류 발생");
        }
      },
    }
  );

  // 정상/허위매물 버튼 클릭하면 실행되는 함수
  const voteEstate = (result) => {
    let str;
    result ? str = "정상 매물" : str = "허위 매물";
    if (!window.confirm(str + "에 투표하시겠습니까? ")) {
      return;
    }

    createMutation.mutate({
      real_estate_id: estate.id,
      result
    });
  };

  const getUserVote = async () => {
    const { data } = await axios.get(`/vote/getUserVote/${estate.id}`, {
      withCredentials: true,
    });
    console.log("받아온 데이터", data);
    return data;
  }

  const { data, isLoading } = useQuery(["vote", estate.id], getUserVote);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      {
        !data?.certificate_user
        ?
        <>
        <H1>투표 권한 없음</H1>
        </>
        :
        <>
        <H1>투표</H1>
        <div>
          현재 투표 : {data.voteCounts.voteCount}표
          정상 매물 : {data.voteCounts.trueCount}표
          허위 매물 : {data.voteCounts.falseCount}표
          최대 투표 가능 수 : {data.voteCounts.maxVote}표

          진행률 : {data.voteCounts.voteCount!=0 ? <>{Math.ceil(data.voteCounts.voteCount / data.voteCounts.maxVote * 100)}%</> : "0%"}
        </div>
        <BtnDiv>
          {estate.accpet == 0 ? data.vote?.result != null ? <><Btn backgroundColor="gray">투표 불가</Btn></> : <><Btn backgroundColor="green" onClick={() => { voteEstate(true) }}>정상매물</Btn> <Btn backgroundColor="red" onClick={() => { voteEstate(false) }}>허위매물</Btn></> : <><Btn backgroundColor="gray">투표 불가</Btn></>}
        </BtnDiv>
        </>
      }
      {/* <H1>투표</H1>
      <div>
        현재 투표 : {data.voteCounts.voteCount}표
        정상 매물 : {data.voteCounts.trueCount}표
        허위 매물 : {data.voteCounts.falseCount}표
        최대 투표 가능 수 : {data.voteCounts.maxVote}표

        진행률 : {data.voteCounts.voteCount!=0 ? <>{Math.ceil(data.voteCounts.voteCount / data.voteCounts.maxVote * 100)}%</> : "0%"}
      </div>
      <BtnDiv>
        {estate.accpet == 0 ? data.vote?.result != null ? <><Btn backgroundColor="gray">투표 불가</Btn></> : <><Btn backgroundColor="green" onClick={() => { voteEstate(true) }}>정상매물</Btn> <Btn backgroundColor="red" onClick={() => { voteEstate(false) }}>허위매물</Btn></> : <><Btn backgroundColor="gray">투표 불가</Btn></>}
      </BtnDiv> */}
    </>

  )
}

export default VoteBtn