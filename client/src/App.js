import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App(props) {
    const [user, setUser] = useState(null);

    useEffect(()=>{
      async function getUser(){
        let user = await axios.get("/api/");
        setUser(user);
      }
      getUser();
    }, []);

    if(!user){
      return <Login />
    }
    return <Dashboard accessToken={user?.data?.use?.accessToken} />;
}

export default App;
