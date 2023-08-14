import styled from "styled-components"

export const LikeBtn = styled.div`
    background-color: rgba(255, 185, 0, 0.08);
    border-radius: 10px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    & img {
        width: 30px;
    }
`

export const BuyBtn = styled.div`
    width: 80%;
    height: 60px;
    border-radius: 10px;
    background-color: ${(props)=> props.backgroundColor || "orange"};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
`

export const Title = styled.p`
    font-weight: bold;
    font-size: 18px;
`

export const Content = styled.p`
    font-size: 18px;
`

export const ContentDiv = styled.div`
    display: flex;
    align-items: center;
    & ${Title} {
        width: 40%;
    }

    & ${Content} {
        width: 60%;
    }

    & #date_input {
        width: 180px;
        height: 30px;
        border-radius: 10px;
        font-size: 16px;
        display: flex;
        padding-left : 20px;
        padding-right : 20px;
    }
`

export const LikeBtnDiv = styled.div`
    display: flex;
    justify-content: center;
    font-size: 16px;


    & div:nth-child(1) {
        background-color: rgba(255, 185, 0, 0.08);
        width: 60%;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & ${LikeBtn} {
        width: 20%;
        margin-left: 10px;
        font-size: 18px;
    }
`

export const UserImg = styled.img`
    width: 60px;
    height: 60px;
`

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: rgba(0,0,0,0.3);
    margin-top: 20px;
    margin-bottom: 20px;
`