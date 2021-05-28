import React, { useState } from "react";
import Navbar from "./Navbar";
import ArtistList from "./ArtistList";
import axios from "axios";

function Dashboard({ accessToken }) {
  const [artist, setArtist] = useState("");
  const [artistList, setArtistList] = useState([]);

  const getData = async (e) => {
    e.preventDefault();
    let res = await axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=10`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + accessToken,
      },
    });
    setArtistList(res.data.artists.items);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-3">
        <form className="row g-3" onSubmit={getData}>
          <div className="col-auto">
            <input type="text" className="form-control" onChange={e => setArtist(e.target.value)} placeholder="Search Artist" />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3" disabled={!artist}>Search</button>
          </div>
        </form>

        {artistList.length>0 && <ArtistList artistList={artistList}/>}
      </div>
    </div>

  );
}

export default Dashboard;
