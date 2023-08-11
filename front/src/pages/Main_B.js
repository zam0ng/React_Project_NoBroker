import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import WorldWind from "@nasaworldwind/worldwind";
import LayerManager from "../components/LayerManager";

const Main = () => {
  const canvasRef = useRef(null);
  let worldWindInstance;

  useEffect(() => {
    if (canvasRef.current) {
      initializeWorldWind(canvasRef.current);

      const handleClickGlobe = (event) => {
        if (event.clientX && event.clientY) {
          var clickLocation = worldWindInstance.canvasCoordinates(
            event.clientX,
            event.clientY
          );
          var pickList = worldWindInstance.pick(clickLocation);

          if (pickList.objects.length > 0) {
            // 가장 근접한 객체의 위치를 사용하십시오.
            var pickedObj = pickList.objects[0];
            if (pickedObj.isTerrain) {
              var position = pickedObj.position;

              // position.latitude, position.longitude, position.altitude를 사용 하십시오.
            }
          }
        }
      };

      // 이벤트 리스너 추가
      canvasRef.current.addEventListener("click", handleClickGlobe);

      // 컴포넌트가 unmount될 때 이벤트 리스너를 제거합니다.
      return () => {
        canvasRef.current.removeEventListener("click", handleClickGlobe);
      };
    }
  }, [canvasRef]);

  const initializeWorldWind = (canvas) => {
    // Tell WorldWind to log only warnings and errors.
    WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

    // Create the WorldWindow.
    // var worldWindInstance = new WorldWind.WorldWindow("canvasOne");
    worldWindInstance = new WorldWind.WorldWindow(canvas);

    //------------- 🌕🌕 NigthSky 🌕🌕 ----------------------
    var BMNGOneImageLayer = new WorldWind.BMNGOneImageLayer();
    var BMNGLayer = new WorldWind.BMNGLayer();
    worldWindInstance.addLayer(BMNGOneImageLayer);
    worldWindInstance.addLayer(BMNGLayer);

    var starFieldLayer = new WorldWind.StarFieldLayer();
    starFieldLayer.sunSize = 64;
    var atmosphereLayer = new WorldWind.AtmosphereLayer();
    worldWindInstance.addLayer(starFieldLayer);
    worldWindInstance.addLayer(atmosphereLayer);

    var now = new Date();
    starFieldLayer.time = now;
    atmosphereLayer.time = now;
    //--------------- 🌕 🌕 🌕 🌕 ---------------------------

    // Create renderable layer to hold the Collada model.
    // var modelLayer = new WorldWind.RenderableLayer("Duck");
    // worldWindInstance.addLayer(modelLayer);
    var placemarkLayer = new WorldWind.RenderableLayer("Placemarks");
    worldWindInstance.addLayer(placemarkLayer);

    // The following is an example of 3D ray intersaction with a COLLADA model.
    // A ray will be generated extending from the camera "eye" point towards a point in the
    // COLLADA model where the user has clicked, then the intersections between this ray and the model
    // will be computed and displayed.

    // Add placemarks to visualize intersection points.
    var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
    placemarkAttributes.imageScale = 1;
    placemarkAttributes.imageColor = WorldWind.Color.RED;
    placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
    placemarkAttributes.drawLeaderLine = true;
    placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;
    placemarkAttributes.imageSource =
      WorldWind.configuration.baseUrl + "images/crosshair.png";

    // The next placemark will portray the closest intersection point to the camera, marked in a different color.
    var closestPlacemarkAttributes = new WorldWind.PlacemarkAttributes(
      placemarkAttributes
    );
    closestPlacemarkAttributes.imageColor = WorldWind.Color.GREEN;
    closestPlacemarkAttributes.leaderLineAttributes.outlineColor =
      WorldWind.Color.GREEN;

    // Function to add placemarks at specified coordinates
    function addPlacemarks(coordinatesArray) {
      placemarkLayer.removeAllRenderables();
      for (var i = 0; i < coordinatesArray.length; i++) {
        var coordinate = coordinatesArray[i];
        var position = new WorldWind.Position(coordinate[0], coordinate[1], 0);

        var placemarkAttributes = new WorldWind.PlacemarkAttributes(null);
        placemarkAttributes.imageSource = "./collada_models/pin.png";
        placemarkAttributes.imageScale = 0.05;
        placemarkAttributes.imageColor = WorldWind.Color.WHITE;

        var placemark = new WorldWind.Placemark(
          position,
          false,
          placemarkAttributes
        );
        // placemark.altitudeMode = WorldWind.ABSOLUTE;
        // placemark.attributes = placemarkAttributes;
        placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND; // 고도 모드를 RELATIVE_TO_GROUND로 설정합니다.
        placemarkLayer.addRenderable(placemark);
      }
      worldWindInstance.redraw();
    }

    // Example usage: Call addPlacemarks with an array of coordinates
    var coordinatesArray = [
      [37, 127], // Latitude, Longitude of the second point
    ];
    addPlacemarks(coordinatesArray);

    //------------- 🌕🌕 NigthSky 🌕🌕 ----------------------
    function runSimulation() {
      // Compute the number of simulated days (or fractions of a day) since the simulation began.
      //   var elapsedTimeMillis = Date.now() - startTimeMillis;
      //   var simulatedDays = elapsedTimeMillis / simulatedMillisPerDay;
      var now2 = Date.now();

      // Compute a real date in the future given the simulated number of days.
      //   var millisPerDay = 24 * 3600 * 1000; // 24 hours/day * 3600 seconds/hour * 1000 milliseconds/second
      //   var simulatedMillis = simulatedDays * millisPerDay;
      //   var simulatedDate = new Date(startTimeMillis + simulatedMillis);
      var simulatedDate = new Date(now2);
      //   var simulatedDate = new Date(2023,9,29,1,0,0,0);

      // Update the date in both the Starfield and the Atmosphere layers.
      starFieldLayer.time = simulatedDate;
      atmosphereLayer.time = simulatedDate;
      worldWindInstance.redraw(); // Update the WorldWindow scene.

      requestAnimationFrame(runSimulation);
    }

    // Animate the starry sky as well as the globe's day/night cycle.
    requestAnimationFrame(runSimulation);
    //--------------- 🌕 🌕 🌕 🌕 ---------------------------

    // Create a layer manager for controlling layer visibility.
    var layerManager = new LayerManager(worldWindInstance);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        id="canvasOne"
        width="1000"
        height="1000"
        style={{ width: "100%", height: "auto", backgroundColor: "black" }}
      >
        Your browser does not support HTML5 Canvas.
      </canvas>
      {/* <LayerManager worldWindInstance={worldWindInstance} /> */}
    </>
  );
};

export default Main;
