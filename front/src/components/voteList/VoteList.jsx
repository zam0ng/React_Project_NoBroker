import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BigImg, Estate, List, ListDiv, EstateNum, Title, Road, ContentDiv, VoteDate, ChartDiv, Chart, Bar } from './votelist.styled';

const VoteList = ({ votable }) => {
    console.log("voteable", votable);

    const nav = useNavigate();

    // 돈 단위 설정
    const won = (money) => {
        if (money >= 10000 && money < 100000000) {
            const man = Math.floor(money / 10000);
            return `${man}`;
        } else if (money >= 100000000) {
            const eok = Math.floor(money / 100000000);
            const remainder = money % 100000000;
            return `${eok}억${remainder >= 10000 ? ` ${won(remainder)}` : ''}`;
        } else {
            return 0;
        }

    }

    // 투표 마감일 반환
    const voteEnd = (endDate) => {
        const date = Math.floor((new Date(endDate).getTime() - new Date().getTime())/(1000*60*60*24));
        let str;
        {date == 0 ? str = " (D-day)" : str = " (D-"+ date+")"}
        return endDate + str;
    }

    const loop = () => {
        let arr = [];
        votable?.forEach((el, index) => {
            arr.push(
                <>
                    <Estate onClick={() => { nav(`/vote/${el.id}`) }}>
                        <EstateNum>{index + 1}</EstateNum>
                        <BigImg src={el.img_1 && el.img_1 != "" ? "http://localhost:8080/estate_imgs/" + el.img_1?.substr(12) : 'http://localhost:8080/estate_imgs/null.png'} />

                        <ContentDiv>
                            {/* <Title>매매 {won(el.balance + el.deposit)}</Title> */}
                            <Title>매매 {won(el.deposit)}</Title>
                            <Road>{el.road}</Road>
                            <p>{el.area}㎡</p>
                            <p>매물 등록일 : {el.createdAt?.substr(0,10)}</p>
                        </ContentDiv>
                        <div style={{width:"0px", height:"100%", border: "1px solid gray"}}></div>
                        <ContentDiv>
                            <ChartDiv>
                            <p>진행률 {el.maxVote != 0 ? Math.ceil(el.voteCount/el.maxVote * 100) : Math.ceil(el.voteCount / 1) * 100}%</p>
                                <Chart>
                                    {el.maxVote != 0 ?
                                    <>
                                    <Bar width = {`${Math.ceil((el.voteCount/el.maxVote) * 100)}%`}></Bar>
                                    <Bar width = {`${Math.ceil((el.maxVote - el.voteCount)/el.maxVote * 100)}%`} backgroundColor={"gray"}></Bar>
                                    </>
                                    :
                                    <>
                                    <Bar width={`${Math.ceil((el.voteCount / 1) * 100)}%`}></Bar>
                                    <Bar width={`${Math.ceil(((1 - el.voteCount) / 1) * 100)}%`} backgroundColor={"gray"}></Bar>
                                    </>
                                    }
                                </Chart>
                            </ChartDiv>
                            <VoteDate>투표 마감 : {voteEnd(el.vote_end_date?.substr(0, 10))}</VoteDate>
                        </ContentDiv>
                    </Estate>
                </>
            );

        });

        return arr;
    }

    return (
        <>
            {votable?.length != 0 ? <ListDiv><List>{loop()}</List></ListDiv> : <>투표할 수 있는 매물이 없습니다.</>}
        </>
    )
}

export default VoteList