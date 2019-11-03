import React from "react";
import { ResetPassword } from "../orbital-templates/Material";

const ResetPasswordModule = ({
  changePassword,
  classes,
  location,
  history,
  match
}) => {
  return (
    <React.Fragment>
      <ResetPassword
        changePassword={changePassword}
        classes={classes}
        location={location}
        history={history}
        match={match}
      />
    </React.Fragment>
  );
};

export default ResetPasswordModule;
