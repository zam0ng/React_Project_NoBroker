import styled from "styled-components"

export const Comment = styled.div`
    width: 100%;
    margin-top: 30px;
    font-weight: bold;
    font-size: 18px;
    text-align: start;
    cursor: pointer;
`
export const UserImg = styled.img`
    width: 30px;
    height: 30px;
`

export const Recomment = styled.div`
    width: 100%;
    text-align: start;
    margin-bottom: 10px;
    font-size: 18px;
    margin-top: 10px;
    display: flex;

    & img {
        width: 20px;
        height: 20px;
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
`

export const CommentInput = styled.input`
    width: 50%;
`

export const InsertBtn = styled.div`
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: orange;
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
