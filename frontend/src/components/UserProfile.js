import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

import { useSelector } from "react-redux";

const UserProfile = (props) => {
  const [name, setName] = useState("");
  const user = useSelector((state) => state.user);

  return (
    <div>
      <center>
        <h1>User Profile</h1>
      </center>
    </div>
  );
};

export default UserProfile;
