import React, {useEffect, useState} from "react";
import axios from "axios";
import Login from "./Login";

function Auth(props) {
  const [user, setUser] = useState(null);

  async function getUser() {
    let user = await axios.get("/api/");
    if (!user) {
      props.history.push("/login");
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

  return <div>{props.children}</div>;
}

export default Auth;
