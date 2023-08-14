import React, { useEffect } from "react";
import * as WorldWind from "@nasaworldwind/worldwind"; // WorldWind 라이브러리를 불러옵니다.

const Placemark = ({ position, onClick, layer }) => {
  useEffect(() => {
    // PlacemarkAttributes : 좌표의 모양, 크기, 색상, 라벨 등을 설정하는데 사용한다.
    // markAttribute로 좌표를 찍을 수 있다.
    const markAttribute = new WorldWind.PlacemarkAttributes(null);

    // 좌표 이미지 경로 설정
    markAttribute.imageSource =
      WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";

    // handleClickMark : 클릭 이벤트를 실행하는 함수
    const handleClickMark = () => {
      if (onClick) {
        onClick();
      }
    };

    if (layer) {
      // 클릭 인식기를 설정하여 클릭 이벤트를 처리합니다.
      // 좌표 생성
      const placemark = new WorldWind.Placemark(position, false, markAttribute);
      // 좌표가 항상 맨 위에 노출되도록 하는 구문. 이 좌표가 다른 객체나 레이어에 겹치더라도 최상단에 노출되어 시각적 강조
      placemark.alwaysOnTop = true;
      placemark.clickRecognizer = new WorldWind.ClickRecognizer(
        // placemarkLayer 레이어의 생성되어있는 렌더러블 레이어애 좌표인 placemark를 추가
        placemark.layer.addRenderable(placemark)
      );
    }
  }, [position, onClick]);

  // 렌더링은 useEffect 내에서 처리되므로 null을 반환
  return null;
};

export default Placemark;
