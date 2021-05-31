import React, { useState } from "react";
import ArtistList from "./ArtistList";
import axios from "axios";

function Dashboard({ accessToken, history }) {
  const [artist, setArtist] = useState("");
  const [artistList, setArtistList] = useState([]);

  const getData = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.get(`/api/artists/${artist}`);
      setArtistList(res.data.artists.artists.items);
    } catch (error) {
      history.push("/");
    }
  };

  return (
    <div>
      <form className="row g-3" onSubmit={getData}>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Search Artist"
          />
        </div>
        <div className="col-auto">
          <button
            type="submit"
            className="btn btn-primary mb-3"
            disabled={!artist}
          >
            Search
          </button>
        </div>
      </form>
      {artistList.length > 0 && <ArtistList artistList={artistList} />}
    </div>
  );
}

export default Dashboard;
