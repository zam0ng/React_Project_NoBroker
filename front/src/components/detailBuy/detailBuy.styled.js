import styled from "styled-components"

export const LikeBtn = styled.div`
    background-color: beige;
    /* width: 200px; */
    height: 60px;
    cursor: pointer;
`

export const BuyBtn = styled.div`
    width: 80%;
    height: 60px;
    border-radius: 10px;
    background-color: ${(props)=> props.backgroundColor || "blue"};
    cursor: pointer;
`

export const Title = styled.p`
    font-weight: bold;
`

export const Content = styled.p`
    font-size: 18px;
`

export const ContentDiv = styled.div`
    display: flex;
    & ${Title} {
        width: 40%;
    }

    & ${Content} {
        width: 60%;
    }
`

export const LikeBtnDiv = styled.div`
    display: flex;

`