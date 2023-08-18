import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BigImg, Estate, List, ListDiv, EstateNum, Title, Road, ContentDiv, VoteDate } from './votelist.styled';

const VoteList = ({ votable }) => {
    console.log("voteable", votable);

    const nav = useNavigate();

    // 돈 단위 설정
    const won = (money) => {

        if (money >= 10000 && money < 100000000) {
        // if (money >= 10000 && money < 100000000) {
            const man = Math.floor(money / 10000);
            const remainder = money % 10000;
            // return `${man}만${remainder !== 0 ? ` ${remainder}` : ''}`;
            return `${man}`;
        } else if (money >= 100000000) {
            const eok = Math.floor(money / 100000000);
            const remainder = money % 100000000;
            return `${eok}억${remainder >= 10000 ? ` ${won(remainder)}` : ''}`;
        } else {
            return `${money}`;
        }

    }

    const loop = () => {
        let arr = [];
        votable?.forEach((el, index) => {
            arr.push(
                <>
                <Estate onClick={() => { nav(`/vote/${el.id}`) }}>
                    <EstateNum>{index+1}</EstateNum>
                    <BigImg src={el.img_1 && el.img_1 != "" ? "http://localhost:8080/estate_imgs/" + el.img_1.substr(12) : 'http://localhost:8080/estate_imgs/null.png'} />

                    <ContentDiv>
                        {/* <Title>매매 {won(el.balance + el.deposit)}</Title> */}
                        <Title>매매 {won(el.deposit)}</Title>
                        <Road>{el.road}</Road>
                        <VoteDate>투표 마감 : {el.vote_end_date.substr(0,10)}</VoteDate>
                    </ContentDiv>

                    <ContentDiv style={{marginLeft : "20px"}}>
                        투표 정보
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