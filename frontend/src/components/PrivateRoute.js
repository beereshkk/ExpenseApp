import React from "react";

import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ render: Render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem("jwtToken") ? (
          <Render {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        );
      }}
    />
  );
};

export default PrivateRoute;
