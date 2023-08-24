import React from 'react'
import {Container,ResigterEstate,StateDiv,Selectstate} from './votestyled';
import voteimg from '../../../img/voteimg.png'
import VoteList from './VoteList';
import { useQuery } from 'react-query';
// import axios from 'axios';
import axios from '../../../Axios'

const Vote = () => {

  const getMyvotedata = async()=>{
    const data = await axios.get("/mypage/getMyvotedata",{
      withCredentials : true,
    })
    return data.data;
  }
  const {data: votedata, isLoading : votedataLoading, error : votedataError} = useQuery('votedata',getMyvotedata);
  // console.log(votedata);
  const filter = () =>{
    return votedata?.map((item)=><VoteList data={item}></VoteList>)
  }
  return (
    <Container>
      <ResigterEstate>
        <StateDiv><img src={voteimg}></img>투표한 매물 내역 👍</StateDiv>

      </ResigterEstate>
      <Selectstate>
        {filter()}
      </Selectstate>
    </Container>
  )
}

export default Vote