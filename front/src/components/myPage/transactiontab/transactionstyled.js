import { styled } from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
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
    width: ${(props)=>props.width || "12%"};
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
    border-bottom: 3px solid ${(props)=>props.isActive ?  "pink": "none"};
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