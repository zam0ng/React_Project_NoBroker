import styled from "styled-components"

export const UserImg = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 4px;
`

export const Date = styled.p`
    font-size: 16px;
    font-weight: normal;
    margin-top: 4px;
    color: rgba(0,0,0,0.8);
    /* display: inline-block; */
`

export const Comment = styled.div`
    width: 96%;
    margin-top: 30px;
    font-weight: bold;
    font-size: 20px;
    text-align: start;
    border-radius: 10px;
    background-color: rgba(255, 185, 0, 0.08);
    padding: 4px;
    padding-left: 20px;
    cursor: pointer;

    & ${UserImg} {
        margin-right: 4px;
    }
`


export const Recomment = styled.div`
    width: 96%;
    text-align: start;
    margin-bottom: 10px;
    font-size: 18px;
    margin-top: 10px;
    padding: 4px;
    padding-left: 20px;
    display: flex;

    & img {
        width: 20px;
        height: 20px;
        margin-right: 4px;
    }

    /* & img:nth-child(1) {
        width: 20%;
    }
    & div:nth-child(2) {
        width: 80%;
    } */

    & ${UserImg} {
        width: 30px;
        height: 30px;
    }
`

export const InputDiv = styled.div`
    display: none;
    width: 100%;
    justify-content: center;
    margin-top: 20px;
`

export const CommentInput = styled.input`
    width: 70%;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 16px;
    border-radius: 10px;
    font-family: 'GmarketSansMedium';
`

export const InsertBtn = styled.div`
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    /* background-color: orange; */
    border: ${(props) => props.border || "4px solid orange" };
    border-radius: 10px;
    margin-left: 4px;
    user-select: none;
    cursor: pointer;
    /* z-index: 1100; */
`

export const H1 = styled.h1`
    display: flex;
    justify-content: start;
    padding-left: 20px;

`

export const CommentDiv = styled.div`
    padding-left: 20px;
`
