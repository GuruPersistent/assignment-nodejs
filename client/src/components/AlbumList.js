import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AlbumList(props) {
  const [albumList, setAlbumList] = useState([]);
  const artistName = props?.location?.state?.artistName;

  const getData = async (albumId) => {
    try {
      let res = await axios.get(`/api/artists/albums/${albumId}`);
      setAlbumList(res.data.albums.items);
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
      <div className="row text-center mt-3">
        {albumList &&
          albumList.map((album) => (
            <div key={album.id} className="col-sm-6 col-md-3 p-2">
              <Link
                to={{
                  pathname: `/tracks/${album.id}`,
                  state: { artistName: artistName, albumName: album.name },
                }}
                className="text-decoration-none"
              >
                <div className="card bg-dark text-white pt-5">
                  <img
                    src={album.images[0]?.url}
                    style={{
                      display: "flex",
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      margin: "0 auto",
                    }}
                    alt={album.name}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{album.name}</h6>
                    <p className="small">Total Tracks: {album.total_tracks}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AlbumList;
