import React from "react";

function Login(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <div>
        <h3 className="mb-3">Spotify Task </h3>
        <a href="/api/login" className="btn bg-dark text-white">
          Login with Spotify
        </a>
      </div>
    </div>
  );
}

export default Login;
