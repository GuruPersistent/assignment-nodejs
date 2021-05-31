import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";
import Navbar from "./Navbar";

function Auth(props) {
  const [user, setUser] = useState(null);

  async function getUser() {
    let user = await axios.get("/api/");
    if (!user) {
      props.history.push("/");
    }
    setUser(user);
  }

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return <Login />;
  }

  if (user === null) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-3">
        {props.children}
      </div>
    </div>
  );
}

export default Auth;
