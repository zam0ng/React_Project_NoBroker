import React, { useState, useEffect, useCallback } from "react";
import WorldWind from "@nasaworldwind/worldwind";
import $ from "jquery";

const LayerManager = (props) => {
  const { wwd } = props;
  const [layerList, setLayerList] = useState([]);
  const [searchText, setSearchText] = useState("");

  // 생성자 코드와 메서드 코드를 useEffect 안에 넣습니다.
  // 'this.'가 사용된 부분을 제거하고 필요한 경우 함수 및 변수에 접근하게 수정합니다.

  useEffect(() => {
    if (!wwd) return;

    createProjectionList();
    $("#projectionDropdown")
      .find("li")
      .on("click", (e) => {
        onProjectionClick(e);
      });

    synchronizeLayerList();

    $("#searchBox")
      .find("button")
      .on("click", (e) => {
        onSearchButton(e);
      });

    $("#searchText").on("keypress", function (e) {
      onSearchTextKeyPress($(this), e);
    });

    const onProjectionClick = (event) => {
      // ...
      var projectionName = event.target.innerText || event.target.innerHTML;
      $("#projectionDropdown")
        .find("button")
        .html(projectionName + ' <span class="caret"></span>');

      if (projectionName === "3D") {
        if (!roundGlobe) {
          setRoundGlobe(
            new WorldWind.Globe(new WorldWind.EarthElevationModel())
          );
        }

        if (wwd.globe !== roundGlobe) {
          wwd.globe = roundGlobe;
        }
      } else {
        if (!flatGlobe) {
          flatGlobe = new WorldWind.Globe2D();
        }

        if (projectionName === "Equirectangular") {
          flatGlobe.projection = new WorldWind.ProjectionEquirectangular();
        } else if (projectionName === "Mercator") {
          flatGlobe.projection = new WorldWind.ProjectionMercator();
        } else if (projectionName === "North Polar") {
          flatGlobe.projection = new WorldWind.ProjectionPolarEquidistant(
            "North"
          );
        } else if (projectionName === "South Polar") {
          flatGlobe.projection = new WorldWind.ProjectionPolarEquidistant(
            "South"
          );
        } else if (projectionName === "North UPS") {
          flatGlobe.projection = new WorldWind.ProjectionUPS("North");
        } else if (projectionName === "South UPS") {
          flatGlobe.projection = new WorldWind.ProjectionUPS("South");
        } else if (projectionName === "North Gnomonic") {
          flatGlobe.projection = new WorldWind.ProjectionGnomonic("North");
        } else if (projectionName === "South Gnomonic") {
          flatGlobe.projection = new WorldWind.ProjectionGnomonic("South");
        }

        if (wwd.globe !== flatGlobe) {
          wwd.globe = flatGlobe;
        }
      }

      wwd.redraw();
    };
    const onLayerClick = (layerButton) => {
      // 원래 코드와 마찬가지로 수정
      var layerName = layerButton.text();

      // Update the layer state for the selected layer.
      for (var i = 0, len = wwd.layers.length; i < len; i++) {
        var layer = wwd.layers[i];
        if (layer.hide) {
          continue;
        }

        if (layer.displayName === layerName) {
          layer.enabled = !layer.enabled;
          if (layer.enabled) {
            layerButton.addClass("active");
          } else {
            layerButton.removeClass("active");
          }
          wwd.redraw();
          break;
        }
      }
    };

    const synchronizeLayerList = () => {
      // 원래 코드와 마찬가지로 수정
      var layerListItem = $("#layerList");

      layerListItem.find("button").off("click");
      layerListItem.find("button").remove();

      // Synchronize the displayed layer list with the WorldWindow's layer list.
      for (var i = 0, len = wwd.layers.length; i < len; i++) {
        var layer = wwd.layers[i];
        if (layer.hide) {
          continue;
        }

        var layerItem = createLayerItem(layer);
        layerListItem.append(layerItem);

        layerListItem.find("button").on("click", function (e) {
          onLayerClick($(this));
        });
      }

      var self = this;
      layerListItem.find("button").on("click", function (e) {
        self.onLayerClick($(this));
      });
    };

    const createLayerItem = (layer) => {
      var layerItem = $(
        '<button class="list-group-item btn btn-block">' +
          layer.displayName +
          "</button>"
      );

      if (layer.showSpinner && WorldWind.Spinner) {
        var opts = {
          scale: 0.9,
        };
        var spinner = new WorldWind.Spinner(opts).spin();
        layerItem.append(spinner.el);
      }

      if (layer.enabled) {
        layerItem.addClass("active");
      } else {
        layerItem.removeClass("active");
      }

      return layerItem;
    };

    const createProjectionList = () => {
      // 원래 코드와 마찬가지로 수정
      var projectionNames = [
        "3D",
        "Equirectangular",
        "Mercator",
        "North Polar",
        "South Polar",
        "North UPS",
        "South UPS",
        "North Gnomonic",
        "South Gnomonic",
      ];
      var projectionDropdown = $("#projectionDropdown");

      var dropdownButton = $(
        '<button class="btn btn-info btn-block dropdown-toggle" type="button" data-toggle="dropdown">3D<span class="caret"></span></button>'
      );
      projectionDropdown.append(dropdownButton);

      var ulItem = $('<ul class="dropdown-menu">');
      projectionDropdown.append(ulItem);

      for (var i = 0; i < projectionNames.length; i++) {
        var projectionItem = $("<li><a >" + projectionNames[i] + "</a></li>");
        ulItem.append(projectionItem);
      }

      ulItem = $("</ul>");
      projectionDropdown.append(ulItem);
    };

    const onSearchButton = (event) => {
      // 원래 코드와 마찬가지로 수정
      performSearch($("#searchText")[0].value);
    };

    const onSearchTextKeyPress = (searchInput, event) => {
      // 원래 코드와 마찬가지로 수정
      if (event.keyCode === 13) {
        searchInput.blur();
        performSearch($("#searchText")[0].value);
      }
    };

    const performSearch = (queryString) => {
      // 원래 코드와 마찬가지로 수정
      if (queryString) {
        var latitude, longitude;

        if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
          var tokens = queryString.split(",");
          latitude = parseFloat(tokens[0]);
          longitude = parseFloat(tokens[1]);
          goToAnimator.goTo(new WorldWind.Location(latitude, longitude));
        } else {
          geocoder.lookup(queryString, function (geocoder, result) {
            if (result.length > 0) {
              latitude = parseFloat(result[0].lat);
              longitude = parseFloat(result[0].lon);

              WorldWind.Logger.log(
                WorldWind.Logger.LEVEL_INFO,
                queryString + ": " + latitude + ", " + longitude
              );

              goToAnimator.goTo(new WorldWind.Location(latitude, longitude));
            }
          });
        }
      }
    };

    // document event listeners 추가
    $(document).on("click", "#projectionDropdown li", onProjectionClick);
    $(document).on("click", "#layerList button", function () {
      onLayerClick($(this));
    });
    $(document).on("click", "#searchBox button", onSearchButton);
    $("#searchText").on("keypress", function (e) {
      onSearchTextKeyPress($(this), e);
    });

    // 초기화 코드 실행
    createProjectionList();
    synchronizeLayerList();

    // Cleanup
    return () => {
      $(document).off("click", "#projectionDropdown li", onProjectionClick);
      $(document).off("click", "#layerList button", onLayerClick);
      $(document).off("click", "#searchBox button", onSearchButton);
      $(document).off("keypress", "#searchText", onSearchTextKeyPress);
    };
  }, [wwd]);
};

export default LayerManager;
