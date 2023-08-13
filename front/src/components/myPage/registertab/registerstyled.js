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
    display: flex;
    align-items: center;
    justify-content: space-around;
`
export const StateDiv = styled.div`
    width: ${(props)=>props.width || "15%"};
    height: 50px;
    /* border: 1px solid blue; */
    border-right: ${(props)=>props.br};
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    font-weight :600;
    font-size: smaller;
    color : ${(props)=>props.color || "white"};
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
    border: 1px solid red;
    overflow-y: scroll;
`
export const SellDiv = styled.div`
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    border-radius: 15px 0 0 15px;
    
    justify-content: space-evenly;
    background-image: linear-gradient(to right,rgb(21,159,251),rgb(18,207,170));

`
export const BuyDiv = styled(SellDiv)`
    border-radius: 0 15px 15px 0;
    
    border-left: 3px solid white;
    background-image: linear-gradient(to right,rgb(74,200,37),rgb(214,205,1));

`