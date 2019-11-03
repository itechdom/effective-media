import React from "react";

const Maps = ({ lat, long, ...rest }) => {
  React.useEffect(() => {
    var options = {
      camera: {
        target: { lat, long },
        zoom: 19
      }
    };
    const mapDiv = document.getElementById("map");
    const map = plugin.google.maps.Map.getMap(mapDiv, options);
    var marker = map.addMarker({
      position: { lat, long },
      title: "image location"
    });
  }, []);
  return <div style={{ width: "100%", height: "100%" }} id="map"></div>;
};

export default Maps;
