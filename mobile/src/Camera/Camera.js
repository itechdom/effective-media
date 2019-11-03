import React from "react";
import { Button, Grid } from "../orbital-templates/Material";
import EXIF from "exif-js";
import md5 from "blueimp-md5";
import {
  Card,
  CardMedia,
  CardHeader,
  CardContent,
  Table,
  TableRow,
  TableCell,
  Typography
} from "@material-ui/core";
import Maps from "../Maps/Maps";

const Row = ({ placeholder, value }) => (
  <TableRow>
    <TableCell>
      <Typography variant="subtitle2">{placeholder}</Typography>
    </TableCell>
    <TableCell>{value}</TableCell>
  </TableRow>
);

export const ExifInfo = ({ imageExif }) => (
  <>
    <Maps lat={imageExif.GPSLatitude} long={imageExif.GPSLongitude} />
    {Object.keys(imageExif).map(key => {
      return (
        <Row
          placeholder={key}
          value={
            typeof imageExif[key] === "string"
              ? imageExif[key]
              : JSON.stringify(imageExif[key])
          }
        ></Row>
      );
    })}
  </>
);

export const processImage = (img, onData, actionLabel) => {
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
      let md5Hash = md5(c.toDataURL());
      onData(md5Hash, allMetaData);
    });
  };
};
const CameraView = ({
  sourceType,
  actionLabel,
  hash,
  hash_createModel,
  hash_getModel,
  ...rest
}) => {
  const [imageData, setImageData] = React.useState();
  const [imageExif, setImageExif] = React.useState();
  const [md5Hash, setMD5Hash] = React.useState();
  const [previousMd5Hash, setPreviousMD5Hash] = React.useState();
  const Camera = navigator.camera;
  function onFail(message) {
    console.error("Error! because: " + JSON.stringify(message));
  }

  function onSuccess(data) {
    const img = document.getElementById("current-image");
    setImageData("");
    setImageData(data);
    return processImage(
      img,
      (md5Hash, allMetaData) => {
        let previousMd5Hash = window.localStorage.getItem("md5");
        setPreviousMD5Hash(previousMd5Hash);
        window.localStorage.setItem("md5", md5Hash);
        setMD5Hash(md5Hash);
        setImageExif(allMetaData);
        alert(md5Hash);
      },
      actionLabel
    );
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
      <Card style={{ overflow: "scroll" }}>
        <CardContent>
          <Table>
            <div style={{ display: "grid", height: "100%" }}>
              <Row
                placeholder="previous md5 hash"
                value={<input type="text" value={previousMd5Hash} />}
              ></Row>
              <Row
                placeholder="current md5 hash"
                value={<input type="text" value={md5Hash} />}
              ></Row>
            </div>
          </Table>
          <ExifInfo imageExif={imageExif} />
          <img
            style={{ maxWidth: "100%", maxHeight: "100vh", margin: "auto" }}
            width="100%"
            height="auto"
            id="current-image"
            src={imageData}
          />
        </CardContent>
      </Card>
      <canvas
        style={{ width: "5000px", height: "5000px", display: "none" }}
        id={"myCanvas" + actionLabel}
      />
    </>
  );
};

export default CameraView;
