import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BigImg, Estate, List } from './votelist.styled';

const VoteList = ({ votable }) => {
    console.log("voteable", votable);

    const nav = useNavigate();

    const loop = () => {
        let arr = [];
        votable.forEach(el => {
            arr.push(<Estate onClick={() => { nav(`/vote/${el.id}`) }}>
                <div>
                <BigImg src={el.img_1 && el.img_1 != "" ? "http://localhost:8080/estate_imgs/" + el.img_1.substr(12) : 'http://localhost:8080/estate_imgs/null.png'} />
                매매 {el.balance + el.deposit}
                </div>
                </Estate>);
        });

        return arr;
    }

    return (
        <>
            {votable.length!=0 ? <List>{loop()}</List> : <>투표할 수 있는 매물이 없습니다.</>}
        </>
    )
}

export default VoteList