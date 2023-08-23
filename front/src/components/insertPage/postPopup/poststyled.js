import { styled } from "styled-components";

export const Container = styled.div`
  width: 85%;
  height: 450px;
  /* border: 1px solid black; */
  border-bottom: 1px solid rgb(219 195 158);

  display: flex;
  align-items: center;

  & span {
    color: #168fff;
  }
`;
export const Title = styled.div`
  width: 140px;
  height: 450px;
  /* border: 1px solid black; */
  text-align: left;
  line-height: 400px;
  /* font-size: smaller; */
  display: flex;
  align-items: center;
  font-weight: 600;
  padding-left: 10px;
  font-size: 17px;
  background-color: rgb(255, 229, 197);
`;
export const AddressContainer = styled.div`
  width: 50%;
  height: 450px;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
export const MapContainer = styled.div`
  width: 40%;
  height: 400px;
  border: 1px solid lightgray;
  color: black;
  font-size: smaller;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
`;

export const AddressSearchBtn = styled.button`
    font-family: 'GmarketSansMedium';

  width: 200px;
  height: 50px;
  /* border: 1px solid black; */
  border: none;
  background-color: orange;
  color: white;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
`;

export const AddressList = styled.div`
  width: 95%;
  height: 150px;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(235 235 235);
`;

export const AddressBox = styled.div`
  width: 90%;
  height: 75px;
  /* border: 1px solid black; */
  display: flex;
`;
export const Namee = styled.div`
  & h4 {
    width: 60px;
    height: 30px;
    line-height: 30px;
    /* border-radius: 15px; */
    background-color: #d3d3d3;
  }
  width: 20%;
  height: 70px;
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  /* line-height: 70px; */
`;
export const Address = styled.div`
  width: ${(props) => props.width || "75%"};
  height: 70px;
  /* border: 1px solid red; */
  line-height: 70px;
  text-align: left;
  padding-left: 10px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const AdditionalInput = styled.input`
  width: ${(props) => props.width || "75%"};
  height: 50px;
  line-height: 70px;
  text-align: left;
  padding-left: 10px;
  margin-left: 10px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
export const AdditionalBox = styled.div`
  & p {
    padding-left: 10px;
    font-weight: 600;
    /* font-size: smaller; */
  }
  width: 95%;
  height: 130px;
  /* border: 1px solid black; */
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;
