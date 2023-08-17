import { styled } from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

export const ResigterEstate = styled.div`
    width: 81%;
    height: 80px;
    /* border: 1px solid black; */
    border-bottom : 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: space-around;
`
export const StateDiv = styled.div`
    width: ${(props)=>props.width || "10%"};
    height: 50px;
    /* border: 1px solid black; */
    border-right: ${(props)=>props.br};
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    font-weight :600;
    font-size: smaller;
    color : ${(props)=>props.color || "black"};
    cursor: pointer;
    border-bottom: ${(props)=>props.isActive ? `3px solid ${props.color}` : "none"};
    & span{
        font-size: large;
    }
`
export const Selectstate = styled.div`
    width: 90%;
    height: 555px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid red; */
    overflow-y: scroll;
`
export const EstateAllInfo = styled.div`
    width: 90%;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-bottom: 1px solid lightgray;

    & button{
        width: 50px;
        height: 20px;
        font-size: x-small;
        background-color: orange;
        color: white;
        border: none;
        border-radius: 10px;
    }
`
export const DateImg = styled.div`
    width: 20%;
    height: 90px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & span{
        font-size: smaller;
    }

    & img{
        width: 70px;
        height: 70px;
        object-fit: cover;
    }

   
`
export const OtherInfo = styled.div`
    width : 50%;
    height: 80px;
    display: flex;
    /* border-left: 1px solid lightgray; */
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 10px;
    margin-left: -50px;
 
    & div:nth-of-type(1){
        font-weight: 600;
        margin-bottom:10px;
    }
    & div:nth-of-type(2){
        font-size: smaller;
        height: 20px;
    }
    & div:nth-of-type(3){
        font-size: smaller;
        height: 20px;
    } 
`
export const JustState = styled.div`
    width: 10%;
    height: 30px;
    line-height: 30px;
    font-size: 11px;
    border-left: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    

`