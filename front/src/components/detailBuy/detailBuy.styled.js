import styled from "styled-components"

export const LikeBtn = styled.div`
    background-color: aliceblue;
    width: 200px;
    height: 200px;
    cursor: pointer;
`

export const BuyBtn = styled.div`
    width: 180px;
    height: 60px;
    border-radius: 10px;
    background-color: ${(props)=> props.backgroundColor || "blue"};
    cursor: pointer;
`