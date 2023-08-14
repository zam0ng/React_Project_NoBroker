import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BigImg } from './votelist.styled';

const VoteList = ({ votable }) => {
    console.log("voteable", votable);

    const nav = useNavigate();

    const loop = () => {
        let arr = [];
        votable.forEach(el => {
            arr.push(<div onClick={()=>{nav(`/vote/${el.id}`)}}><BigImg src={el.img_1 && el.img_1!="" ? "http://localhost:8080/estate_imgs/"+el.img_1.substr(12): 'http://localhost:8080/estate_imgs/null.png'} />매매 {el.balance + el.deposit}</div>);
        });
        return arr;
    }

    return (
        <>
            <div>VoteList</div>
            <div>{loop()}</div>
        </>
    )
}

export default VoteList