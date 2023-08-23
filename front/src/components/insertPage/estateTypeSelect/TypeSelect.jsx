import React, { useEffect } from "react";
import { Container, Title, SelectContainer, Select } from "./typeSelectstyled";
import { useState } from "react";
import { apartimg, homeimg } from "../../../img";
const TypeSelect = ({ selectValue, setSelectValue }) => {
  const select = (e) => {
    setSelectValue(e.target.value);
  };

  useEffect(() => {
    console.log(selectValue);
  }, [selectValue]);
  return (
    <Container>
      <Title>
        매물 유형 <span>*</span>
      </Title>
      <SelectContainer>
        <Select>
          <input
            type="radio"
            value="1"
            checked={selectValue === "1"}
            onChange={select}
          />
          <div>
            <img src={apartimg} alt="" />
            <br></br>
            <label>아파트</label>
          </div>
        </Select>

        <Select>
          <input
            type="radio"
            value="2"
            checked={selectValue === "2"}
            onChange={select}
          />
          <div>
            <img src={homeimg} alt="" />
            <br></br>
            <label>주택</label>
          </div>
        </Select>
      </SelectContainer>
    </Container>
  );
};

export default TypeSelect;
