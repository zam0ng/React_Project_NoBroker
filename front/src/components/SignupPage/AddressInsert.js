import React from "react";

const AddressInsert = (props) => {
  // 주소 검색 api URL
  //   const adrInURL =
  //     "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

  // console.log("뭔데에에엑", props.adr);
  const PostSearchClick = () => {
    // console.log("클릭은 되는걸까,.,,?");
    DaumPostcode();
  };

  const DaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var roadAddr = data.roadAddress; // 도로명 주소 변수
        var extraRoadAddr = ""; // 참고 항목 변수

        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraRoadAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraRoadAddr +=
            extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraRoadAddr !== "") {
          extraRoadAddr = " (" + extraRoadAddr + ")";
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById("postcode").value = data.zonecode;
        document.getElementById("roadAddress").value = roadAddr;
        // document.getElementById("jibunAddress").value = data.jibunAddress;

        // 참고항목 문자열이 있을 경우 해당 필드에 넣는다.
        // if (roadAddr !== "") {
        //   document.getElementById("extraAddress").value = extraRoadAddr;
        // } else {
        //   document.getElementById("extraAddress").value = "";
        // }

        var guideTextBox = document.getElementById("guide");
        // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
        if (data.autoRoadAddress) {
          var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
          guideTextBox.innerHTML = "(예상 도로명 주소 : " + expRoadAddr + ")";
          guideTextBox.style.display = "block";
          // } else if (data.autoJibunAddress) {
          //   var expJibunAddr = data.autoJibunAddress;
          //   guideTextBox.innerHTML = "(예상 지번 주소 : " + expJibunAddr + ")";
          //   guideTextBox.style.display = "block";
        } else {
          guideTextBox.innerHTML = "";
          guideTextBox.style.display = "none";
        }
      },
    }).open();
  };

  const AdrChange = () => {
    const adr1 = document.getElementById("roadAddress").value;
    const adr2 = document.getElementById("detailAddress").value;

    let Adr = `${adr1} ${adr2}`;
    props.adr(Adr);
  };

  return (
    <>
      <div className="adrbox2">
        <div
          className="adr1"
          style={{
            marginLeft: "50px",
            display: "flex",
            flexDirection: "column",
            // alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              className="adrInput1"
              type="text"
              id="postcode"
              placeholder="우편번호"
              style={{
                // backgroundColor: "#fcfbf1",
                // border: "none",
                // borderBottom: "2px solid",
                width: "160px",
              }}
            />
            <button
              onClick={PostSearchClick}
              style={{
                backgroundColor: "white",
                width: "120px",
                height: "35px",
                border: "3px solid orange",
                borderRadius: "2em",
                cursor: "pointer",
                fontFamily: "GmarketSansMedium",
                marginBottom: "20px",
              }}
            >
              우편번호 찾기
            </button>
          </div>
          <input
            className="adrInput2"
            type="text"
            id="roadAddress"
            placeholder="도로명주소"
            onChange={AdrChange}
            style={{
              // backgroundColor: "#fcfbf1",
              // border: "none",
              // borderBottom: "2px solid",
              width: "280px",
            }}
          />
          {/* <input className="adrInput" type="text" id="jibunAddress" placeholder="지번주소" /> */}
          <span id="guide"></span>
          <input
            className="adrInput2"
            type="text"
            id="detailAddress"
            placeholder="상세주소"
            onChange={AdrChange}
            style={{
              // backgroundColor: "#fcfbf1",
              // border: "none",
              // borderBottom: "2px solid",
              width: "280px",
            }}
          />
          {/* <input className="adrInput" type="text" id="extraAddress" placeholder="참고항목" /> */}
        </div>

        <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
      </div>
    </>
  );
};

export default AddressInsert;
