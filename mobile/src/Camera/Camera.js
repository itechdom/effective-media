import React from "react";
import { Button, Grid } from "../orbital-templates/Material";
import EXIF from "exif-js";
import md5 from "blueimp-md5";
import { Card, CardImage, CardHeader, CardContent } from "@material-ui/core";

const CameraView = ({
  sourceType,
  actionLabel,
  hashes,
  hashes_createModel,
  hashes_getModel
}) => {
  console.log("hashes are", hashes);
  const [imageData, setImageData] = React.useState();
  const [imageExif, setImageExif] = React.useState();
  const [md5Hash, setMD5Hash] = React.useState();
  const [previousMd5Hash, setPreviousMD5Hash] = React.useState();
  const Camera = navigator.camera;
  function onFail(message) {
    console.error("Error! because: " + JSON.stringify(message));
  }
  function processImage(img) {
    alert("processingImage");
    img.onload = function() {
      alert("image loaded");
      EXIF.getData(img, function(d) {
        let allMetaData = EXIF.getAllTags(this);
        let c = document.getElementById("myCanvas" + actionLabel);
        let ctx = c.getContext("2d");
        let img = document.getElementById("current-image");
        const width = allMetaData.ImageWidth;
        const height = allMetaData.ImageHeight;
        ctx.drawImage(img, 0, 0, width, height);
        let bitmapData = ctx.getImageData(0, 0, width, height).data;
        setImageExif(JSON.stringify(allMetaData));
        // let md5Hash = md5(`${bitmapData}`);
        let md5Hash = md5(c.toDataURL());
        alert(md5Hash);
        let previousMd5Hash = window.localStorage.getItem("md5");
        setPreviousMD5Hash(previousMd5Hash);
        // alert(`Current ${md5Hash}\n
        // Previous ${previousMd5Hash}\n
        // do they match? ${md5Hash === previousMd5Hash}
        // `);
        window.localStorage.setItem("md5", md5Hash);
        setMD5Hash(md5Hash);
      });
    };
  }
  function onSuccess(data) {
    const img = document.getElementById("current-image");
    setImageData("");
    setImageData(data);
    return processImage(img);
  }
  return (
    <>
      <Grid container justify="center">
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            const img = document.getElementById("current-image");
            if (img.src) {
            }
            Camera.getPicture(onSuccess, onFail, {
              saveToPhotoAlbum: true,
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: sourceType,
              encodingType: Camera.EncodingType.JPEG
            });
          }}
        >
          {actionLabel ? actionLabel : "Take a picture"}
        </Button>
      </Grid>
      <div style={{ display: "grid", height: "100%" }}>
        <h5 id="exif">{imageExif}</h5>
        <div id="allMetaDataSpan"></div>
        Previous
        <input type="text" value={previousMd5Hash} />
        Current
        <input type="text" value={md5Hash} />
        <img
          style={{ maxWidth: "100%", maxHeight: "100vh", margin: "auto" }}
          width="100%"
          height="auto"
          id="current-image"
          src={imageData}
        />
        <canvas
          style={{ width: "5000px", height: "5000px" }}
          id={"myCanvas" + actionLabel}
        />
      </div>
    </>
  );
};

export default CameraView;
