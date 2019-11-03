import React from "react";
import { Route, Switch } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import { routeList } from "./Routes";
import config from "Config";
import { Crud, Notification } from "@markab.io/react";
import rootStore from "./Store/rootStore";
import { styles } from "./App.styles";
import theme from "./theme";
import { withStyles } from "@material-ui/core/styles";
import { MainWrapper } from "./orbital-templates/Material";
import Camera from "./Camera/Camera";
import withOrbital from "./withOrbitalMobile";
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
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            exact
            path="/images"
            render={props => {
              return (
                <MainWrapper routeList={routeList} {...props} {...this.props}>
                  <Crud
                    modelName="hash"
                    SERVER={config.SERVER}
                    offlineStorage={offlineStorage}
                    notificationDomainStore={rootStore.notificationDomainStore}
                    crudDomainStore={rootStore.crudDomainStore}
                  >
                    <Notification
                      notificationDomainStore={
                        rootStore.notificationDomainStore
                      }
                    >
                      <Camera
                        actionLabel={"Open photo Gallery"}
                        sourceType={2}
                      />
                    </Notification>
                  </Crud>
                </MainWrapper>
              );
            }}
          ></Route>
          <Route
            path="/"
            exact
            render={props => {
              return (
                <MainWrapper routeList={routeList} {...props} {...this.props}>
                  <Crud
                    modelName="hash"
                    SERVER={config.SERVER}
                    offlineStorage={offlineStorage}
                    notificationDomainStore={rootStore.notificationDomainStore}
                    crudDomainStore={rootStore.crudDomainStore}
                  >
                    <Notification
                      notificationDomainStore={
                        rootStore.notificationDomainStore
                      }
                    >
                      <Camera actionLabel={"Open camera"} sourceType={1} />
                    </Notification>
                  </Crud>
                </MainWrapper>
              );
            }}
          />
        </Switch>
      </React.Fragment>
    );
  }
  componentWillReceiveProps(nextProps) {}
}
export default withOrbital({
  styles,
  theme,
  rootStore,
  offlineStorage,
  routeList,
  disableAuth: true
})(App);
