import styled from 'styled-components'


export const ButtonContainer = styled.div`
    

    position : relative;
    display : flex;
    border : 1px solid rgb(223, 223, 223);
    border-radius : 2px;
    margin-right : 10px;
    
    /* background-image : url (https://www.dabangapp.com/static/media/arrow.a4a570b9.svg) */

    
    & button {
        font-family : 'GmarketSansMedium';
        /* font : '14px'; */

        display : flex; 
        justify-content : center; 
        align-items : center;
        
        cursor: pointer;
        max-width : 140px;
        height : 34px;
        background-color : transparent;

    }
`


export const ButtonTitle = styled.p`
        margin-right : 5px;

        letter-spacing : -0.3px;
        font-size : 14px;
        font-weight : ${props => props.fontWeight || 400};
        color : ${props => props.color || "rgb(76, 76, 76)"};
        
        white-space : nowrap;
        text-overflow : ellipsis;
        overflow : hidden;    
`



