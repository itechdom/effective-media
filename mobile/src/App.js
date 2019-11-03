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
            path="/verify"
            render={props => {
              return (
                <Crud
                  modelName="hashes"
                  SERVER={config.SERVER}
                  offlineStorage={offlineStorage}
                  notificationDomainStore={rootStore.notificationDomainStore}
                  crudDomainStore={rootStore.crudDomainStore}
                >
                  <Notification
                    notificationDomainStore={rootStore.notificationDomainStore}
                  >
                    <MainWrapper
                      routeList={routeList}
                      {...props}
                      {...this.props}
                    >
                      <Camera actionLabel={"Choose a picture"} sourceType={0} />
                    </MainWrapper>
                  </Notification>
                </Crud>
              );
            }}
          ></Route>
          <Route
            exact
            path="/images"
            render={props => {
              return (
                <Crud
                  modelName="hashes"
                  SERVER={config.SERVER}
                  offlineStorage={offlineStorage}
                  notificationDomainStore={rootStore.notificationDomainStore}
                  crudDomainStore={rootStore.crudDomainStore}
                >
                  <Notification
                    notificationDomainStore={rootStore.notificationDomainStore}
                  >
                    <MainWrapper
                      routeList={routeList}
                      {...props}
                      {...this.props}
                    >
                      <Camera
                        actionLabel={"Open photo Gallery"}
                        sourceType={2}
                      />
                    </MainWrapper>
                  </Notification>
                </Crud>
              );
            }}
          ></Route>
          <Route
            path="/"
            exact
            render={props => {
              return (
                <Crud
                  modelName="making-the-case"
                  SERVER={config.SERVER}
                  offlineStorage={offlineStorage}
                  notificationDomainStore={rootStore.notificationDomainStore}
                  crudDomainStore={rootStore.crudDomainStore}
                >
                  <Notification
                    notificationDomainStore={rootStore.notificationDomainStore}
                  >
                    <MainWrapper
                      routeList={routeList}
                      {...props}
                      {...this.props}
                    >
                      <Camera actionLabel={"Open camera"} sourceType={1} />
                    </MainWrapper>
                  </Notification>
                </Crud>
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
  routeList
})(App);
