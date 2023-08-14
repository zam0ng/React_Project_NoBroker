import React, { useEffect } from "react";
import * as WorldWind from "@nasaworldwind/worldwind"; // WorldWind 라이브러리를 불러옵니다.
import Placemark from "./Placemark";
import MainHeader from "../navbar/MainHeader";

const Main = () => {
  // 컴포넌트가 마운트 되었을 때 해당 코드 실행
  useEffect(() => {
    // 'canvasOne' 앨리먼트에 월드 윈도우 생성
    var wwd = new WorldWind.WorldWindow("canvasOne");
    // ⭐️⭐️⭐️⭐️⭐️ 우주 배경을 그리는 코드 ⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️
    // starFieldLayer : 우주 배경을 그리는 레이어, 별, 태양을 그린다.
    var starFieldLayer = new WorldWind.StarFieldLayer();
    // addLayer : 레이어를 추가한다. 매개변수로 해당 레이어로 그려낼 객체를 넣는다.
    wwd.addLayer(starFieldLayer);

    starFieldLayer.starBrightness = 0.7; // 별의 밝기 조절
    starFieldLayer.starScale = 1.5; // 별의 크기 조절
    starFieldLayer.starTextureUrl = "./path-to-star-texture.png"; // 직접 제작한 별 텍스처 사용

    // 시간을 업데이트하여 시간이 경과하는 것을 시뮬레이션합니다.
    var now = new Date();
    starFieldLayer.time = now;

    // ⭐️⭐️⭐️⭐️⭐️ 초기 화면 세팅 (고도, 위도, 경도) ⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️
    // 초기 카메라 위치와 타겟 설정
    var initialPosition = new WorldWind.Position(37.0, 127, 5000000); // 초기 위도, 경도, 고도 설정
    wwd.navigator.lookAtLocation = initialPosition;

    // 초기 시야(Field of View, FOV) 설정
    wwd.navigator.range = 28000000; // 지구 표면과의 초기 거리 설정
    wwd.navigator.tilt = 0; // 초기 기울기 각도 설정 (0은 수직으로 내려다보는 것을 의미)

    // ⭐️⭐️⭐️⭐️⭐️ 지구 그리는 코드 ⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️
    // BMNGOneImageLayer : 지구 레이어 함수
    wwd.addLayer(new WorldWind.BMNGOneImageLayer());
    // wwd.addLayer(new WorldWind.BMNGLandsatLayer());    // 대륙 초록색으로 보이게 하는 함수
    // wwd.addLayer(new WorldWind.CompassLayer());    // 나침반 레이어
    // wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));    // 좌표 표시 (위도,경도,고도) 레이어
    // wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));  // 뷰 컨트롤 레이어

    // highResLayer : 고화질 지구 이미지를 불러오는 객체
    var highResLayer = new WorldWind.RenderableLayer();
    wwd.addLayer(highResLayer);

    var highResImageUrl =
      "../../public/world.topo.bathy.200408.3x5400x2700.jpg";
    var highResImage = new WorldWind.SurfaceImage(
      new WorldWind.Sector(WorldWind.Sector.FULL_SPHERE),
      highResImageUrl
    );
    highResLayer.addRenderable(highResImage);

    // ⭐️⭐️⭐️⭐️⭐️ 지구의 주/야간을 그리는 코드 ⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️
    // 주/야간 반사를 위한 AtmosphereLayer를 생성합니다.
    var atmosphereLayer = new WorldWind.AtmosphereLayer();
    wwd.addLayer(atmosphereLayer);

    // 현재 시간을 기반으로 AtmosphereLayer의 시간을 업데이트하는 함수를 작성합니다.
    function updateAtmosphereTime() {
      var now = new Date();
      atmosphereLayer.time = now;
      wwd.redraw(); // WorldWindow 씬을 업데이트합니다.
    }

    // updateAtmosphereTime 함수를 호출하여 시간을 초기화하고 업데이트합니다.
    updateAtmosphereTime();

    // ⭐️⭐️⭐️⭐️⭐️ 마커 그리는 코드 ⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️⭐️
    // RenderableLayer : 지구 캔버스에 그릴 수 있는 다양한 객체 또는 특징을 나타내는 개념. 맵에 그릴 수 있는 그래픽 요소들을 그룹화하고 관리하는 컨테이너
    // 이 클래스로 좌표를 찍을 수 있다.
    // var placemarkLayer = new WorldWind.RenderableLayer();
    // // placemarkLayer로 생성한 좌표를 레이어를 추가하여 그려낸다.
    // wwd.addLayer(placemarkLayer);

    // // PlacemarkAttributes : 좌표의 모양, 크기, 색상, 라벨 등을 설정하는데 사용한다.
    // var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

    // // 좌표 이미지 오프셋 설정 (좌표 위치 조정)
    // placemarkAttributes.imageOffset = new WorldWind.Offset(
    //   WorldWind.OFFSET_FRACTION,
    //   0.3,
    //   WorldWind.OFFSET_FRACTION,
    //   0.0
    // );
    // // 좌표 라벨 오프셋 설정 (좌표 위치 조정)
    // // placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
    // //   WorldWind.OFFSET_FRACTION,
    // //   0.5,
    // //   WorldWind.OFFSET_FRACTION,
    // //   1.0
    // // );

    // const app = document.querySelector(".App");
    // var placemarkImage = document.createElement("img");
    // placemarkImage.src =
    //   WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";
    // placemarkImage.style.cursor = "pointer";
    // placemarkImage.addEventListener("click", function () {
    //   console.log("클릭좀 떠라 진짜");
    // });

    // placemarkImage.style.position = "absolute";
    // placemarkImage.style.top = "0";

    // app.append(placemarkImage);
    // // 좌표 이미지 경로 설정
    // // placemarkAttributes.imageSource =
    // //   WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";
    // // position : 좌표 위치 설정 (위도 경도 고도?)
    // placemarkAttributes.imageSource = placemarkImage;
    // var position = new WorldWind.Position(37.0, 127.0, 100.0);
    // // 좌표 생성
    // var placemark = new WorldWind.Placemark(
    //   position,
    //   false,
    //   placemarkAttributes
    // );

    // // 라벨 오프셋 (마커에 설명을 달 수 있을 듯)
    // // placemark.label =
    // //   "Placemark\n" +
    // //   "Lat " +
    // //   placemark.position.latitude.toPrecision(4).toString() +
    // //   "\n" +
    // //   "Lon " +
    // //   placemark.position.longitude.toPrecision(5).toString();

    // // 좌표가 항상 맨 위에 노출되도록 하는 구문. 이 좌표가 다른 객체나 레이어에 겹치더라도 최상단에 노출되어 시각적 강조
    // placemark.alwaysOnTop = true;

    // placemark.clickRecognizer = new WorldWind.ClickRecognizer({
    //   // 클릭 이벤트 처리
    //   handleClick: function (recognizer) {
    //     console.log("좌표가 클릭되었습니다!");
    //     // 여기에 클릭 이벤트 처리 로직 추가
    //   },
    // });

    // // placemarkLayer 레이어의 생성되어있는 렌더러블 레이어애 좌표인 placemark를 추가
    // placemarkLayer.addRenderable(placemark);

    // 🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼
    // Add a polygon
    // var polygonLayer = new WorldWind.RenderableLayer();
    // wwd.addLayer(polygonLayer);

    // var polygonAttributes = new WorldWind.ShapeAttributes(null);
    // polygonAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.75);
    // polygonAttributes.outlineColor = WorldWind.Color.BLUE;
    // polygonAttributes.drawOutline = true;
    // polygonAttributes.applyLighting = true;

    // var boundaries = [];
    // boundaries.push(new WorldWind.Position(20.0, -75.0, 700000.0));
    // boundaries.push(new WorldWind.Position(25.0, -85.0, 700000.0));
    // boundaries.push(new WorldWind.Position(20.0, -95.0, 700000.0));

    // var polygon = new WorldWind.Polygon(boundaries, polygonAttributes);
    // polygon.extrude = true;
    // polygonLayer.addRenderable(polygon);

    // 🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼🔼

    // 🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤
    // Add a COLLADA model
    // var modelLayer = new WorldWind.RenderableLayer();
    // wwd.addLayer(modelLayer);

    // var position = new WorldWind.Position(10.0, -125.0, 800000.0);
    // var config = {
    //   dirPath:
    //     WorldWind.configuration.baseUrl + "examples/collada_models/duck/",
    // };

    // var colladaLoader = new WorldWind.ColladaLoader(position, config);
    // colladaLoader.load("duck.dae", function (colladaModel) {
    //   colladaModel.scale = 9000;
    //   modelLayer.addRenderable(colladaModel);
    // });

    // 🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤🐤

    // Add WMS imagery
    var serviceAddress =
      "https://neo.sci.gsfc.nasa.gov/wms/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
    var layerName = "MOD_LSTD_CLIM_M";

    var createLayer = function (xmlDom) {
      var wms = new WorldWind.WmsCapabilities(xmlDom);
      var wmsLayerCapabilities = wms.getNamedLayer(layerName);
      var wmsConfig =
        WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
      var wmsLayer = new WorldWind.WmsLayer(wmsConfig);
      wwd.addLayer(wmsLayer);
    };

    var logError = function (jqXhr, text, exception) {
      console.log(
        "There was a failure retrieving the capabilities document: " +
          text +
          " exception: " +
          exception
      );
    };

    // $.get(serviceAddress).done(createLayer).fail(logError);

    fetch(serviceAddress)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(createLayer)
      .catch(logError);

    // }
  }, []);

  const handleClick = () => {
    console.log("click");
  };

  const position = new WorldWind.Position(37, 127, 100);

  return (
    <>
      <MainHeader></MainHeader>
      <canvas
        id="canvasOne"
        // width="1024"
        // height="768"
        style={{ backgroundColor: "black", width: "100%", height: "100%" }}
      >
        Your browser does not support HTML5 Canvas.
      </canvas>
      {/* <Placemark position={position} onClick={handleClick} layer={placemarkLayer} /> */}
    </>
  );
};

export default Main;
