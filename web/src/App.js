import React from "react";
import { Route, Switch } from "react-router-dom";
import { routeList } from "./Routes";
import config from "Config";
import { Crud, Notification } from "@markab.io/react";
import rootStore from "../../mobile/src/Store/rootStore";
import { styles } from "./App.styles";
import { withStyles } from "@material-ui/core/styles";
import { MainWrapper } from "../../mobile/src/orbital-templates/Material";
import FileInput from "../../mobile/src/orbital-templates/Material/_shared/Forms/Inputs/Forms.ImageFileInput";
import { processImage } from "../../mobile/src/Camera/Camera";
const offlineStorage = {
  getItem: () => {
    return new Promise((resolve, reject) => {
      resolve("resolved");
    });
  },
  setItem: () => {
    return new Promise((resolve, reject) => {
      resolve("resolved");
    });
  }
};
const App = topProps => {
  const [imageData, setImageData] = React.useState();
  const actionLabel = "verify-an-image";
  return (
    <React.Fragment>
      <Switch>
        <Route
          exact
          path="/"
          render={props => {
            return (
              <MainWrapper routeList={routeList} {...props} {...topProps}>
                <img id="current-image" src={imageData} />

                <Crud
                  modelName="hash"
                  SERVER={config.SERVER}
                  offlineStorage={offlineStorage}
                  notificationDomainStore={rootStore.notificationDomainStore}
                  crudDomainStore={rootStore.crudDomainStore}
                >
                  <Notification
                    notificationDomainStore={rootStore.notificationDomainStore}
                  >
                    <FileInput
                      onMediaDrop={data => {
                        const reader = new FileReader();
                        // it's onload event and you forgot (parameters)
                        reader.onload = function(e) {
                          setImageData(e.target.result);
                          const img = document.getElementById("current-image");
                          processImage(
                            img,
                            (md5Hash, allMetaData) => {
                              console.log(allMetaData);
                            },
                            actionLabel
                          );
                        };
                        // you have to declare the file loading
                        reader.readAsDataURL(data[0]);
                      }}
                    />
                  </Notification>
                </Crud>
                <canvas
                  style={{ width: "5000px", height: "5000px" }}
                  id={"myCanvas" + actionLabel}
                />
              </MainWrapper>
            );
          }}
        ></Route>
      </Switch>
    </React.Fragment>
  );
};
export default withStyles(styles)(App);
