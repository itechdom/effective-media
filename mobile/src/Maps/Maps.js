import React from "react";

function ParseDMS(input) {
  var exifLong = data.exif.get("GPSLongitude");
  console.log(exifLong);
  var exifLongRef = data.exif.get("GPSLongitudeRef");
  console.log(exifLongRef);
  var exifLat = data.exif.get("GPSLatitude");
  console.log(exifLat);
  var exifLatRef = data.exif.get("GPSLatitudeRef");
  console.log(exifLatRef);

  if (exifLatRef == "S") {
    var latitude =
      exifLat[0] * -1 + (exifLat[1] * -60 + exifLat[2] * -1) / 3600;
  } else {
    var latitude = exifLat[0] + (exifLat[1] * 60 + exifLat[2]) / 3600;
  }
  console.log(latitude);

  if (exifLongRef == "W") {
    var longitude =
      exifLong[0] * -1 + (exifLong[1] * -60 + exifLong[2] * -1) / 3600;
  } else {
    var longitude = exifLong[0] + (exifLong[1] * 60 + exifLong[2]) / 3600;
  }
  console.log(longitude);
}
const Maps = ({ lat, long, ...rest }) => {
  React.useEffect(() => {
    var options = {
      camera: {
        target: { lat: ParseDMS(lat), long: ParseDMS(long) },
        zoom: 19
      }
    };
    const mapDiv = document.getElementById("map");
    alert(typeof lat);
    alert(typeof long);
    alert(lat);
    const map = plugin.google.maps.Map.getMap(mapDiv, options);
    var marker = map.addMarker({
      position: { lat: ParseDMS(lat), long: ParseDMS(long) },
      title: "image location"
    });
  }, [lat, long]);
  return (
    <div
      style={{ width: "100%", height: "100vh", display: "grid" }}
      id="map"
    ></div>
  );
};

export default Maps;
