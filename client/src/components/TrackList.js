import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function TrackList(props) {
  const [tracks, setTrack] = useState([]);
  const artistName = props?.location?.state?.artistName || "Unknown";
  const albumName = props?.location?.state?.albumName || "Unknown";

  const getData = async (albumId) => {
    try {
      let res = await axios.get(`/api/artists/albums/songs/${albumId}`);
      setTrack(res.data.songs.items);
      console.log(res.data.songs.items);
    } catch (error) {
      props.history.push("/dashboard");
    }
  };

  useEffect(() => {
    const albumId = props?.match?.params?.id;
    if (!albumId) {
      props.history.push("/dashboard");
    }
    getData(albumId);
  }, []);

  return (
    <div>
      <span className="h4 mb-5">
        Artist: <span className="h2">{artistName}</span>
      </span>
      <br />
      <span className="h4 mb-5">
        Album: <span className="h2">{albumName}</span>
      </span>
      <div className="row text-center mt-3">
        {tracks &&
          tracks.map((track) => (
            <div key={track.id} className="col-sm-6 col-md-3 p-2">
              <div className="card bg-dark text-white pt-3">
                <div className="card-body">
                  <a className="text-decoration-none" href={track.external_urls.spotify} target="_blank">
                    <span
                      className="material-icons"
                      style={{ fontSize: "5rem" }}
                    >
                      play_circle_filled
                    </span>
                  </a>
                  <h6 className="card-title">{track.name}</h6>
                  <p className="small">Track No:{track.track_number}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TrackList;
