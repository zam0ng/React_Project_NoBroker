import styled from 'styled-components'

export const SearchBarButtonContainer = styled.div`
    width: 104px;
    height: 36px;
    display : flex;
    align-items : center;

`

export const ClickedSearchBarButtonItem = styled.button` 
    letter-spacing : -1px;
    width : 52px;
    height : 100%;
    display : flex; 
    justify-content : center; 
    align-items : center;

    font-size : 13px;
    font-weight : 700;
    border : 0px;
    border-radius : 2px;
    cursor: pointer;
    background-color : rgb(50, 108, 249);
    color: rgb(255, 255, 255);    
`

export const UnClickedSearchBarButtonItem = styled.button` 
    letter-spacing : -1px;

    width : 52px;
    height : 100%;
    display : flex; 
    justify-content : center; 
    align-items : center;

    font-size : 13px;
    font-weight : 400;
    border : 0px;
    border-radius : 2px;
    cursor: pointer;
    background-color: whitesmoke;
    color: rgb(174, 174, 174);
`

