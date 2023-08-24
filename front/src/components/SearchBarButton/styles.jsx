import styled from 'styled-components'

export const SearchBarButtonContainer = styled.div`
    width: 104px;
    height: 36px;
    display : flex;
    align-items : center;

`

export const ClickedSearchBarButtonItem = styled.button` 
    font-family: 'GmarketSansMedium';

    letter-spacing : 0.5px;

    width : 52px;
    height : 100%;
    display : flex; 
    justify-content : center; 
    align-items : center;

    font-size : 15px;
    /* font-weight : 700;/ */

    font-weight : ${ 
            props => props.myLikeClickedList === true? '200' : '500'
    };
    
    color:${
        props => props.myLikeClickedList === true ? 'rgb(150, 150, 150)' :
        'rgb(250, 250, 250)'
    }  ;

    border : 0px;
    border-radius : 2px;
    cursor: pointer;
    /* background-color : rgb(50, 108, 249); */
    /* background-color : rgb(249, 140, 50); */

    background-color : ${
        props => props.myLikeClickedList === false ? 'rgb(239, 123, 0)' :
        'rgb(245, 245, 245)' };
        
`

export const UnClickedSearchBarButtonItem = styled.button` 
    font-family: 'GmarketSansMedium';

    letter-spacing : -1px;

    width : 52px;
    height : 100%;
    display : flex; 
    justify-content : center; 
    align-items : center;

    font-size : 14px;

    font-weight : ${ 
            props => props.myLikeClickedList === true? '500' : '200'
    };
    
    border : 0px;
    border-radius : 2px;
    cursor: pointer;

    color:${
        props => props.myLikeClickedList === true ? 'rgb(250, 250, 250)' :
        'rgb(150, 150, 150)'
    }  ;

    /* background-color : rgb(50, 108, 249); */
    /* background-color : rgb(249, 140, 50); */
    
    background-color : ${
        props => props.myLikeClickedList === true ? 'rgb(239, 123, 0)' : 
        'rgb(245, 245, 245)' };
    
    /* background-color: rgb(245, 245, 245); */
`

