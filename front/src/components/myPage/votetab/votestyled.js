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
    border-bottom: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const StateDiv = styled.div`
    width: 20%;
    height: 50px;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    font-size: smaller;
    color: black;
    cursor: pointer;
    border-bottom: 3px solid none;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    align-content: center;
    & span{
        font-size: large;
    }
    & img{
        width: 80px;
        height: 80px;
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