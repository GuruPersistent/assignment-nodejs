import React from "react";
import { Link } from "react-router-dom";

function ArtistList({ artistList }) {
  return (
    <div className="row text-center">
      {artistList &&
        artistList.map((artist) => (
          <div key={artist.id} className="col-sm-6 col-md-3 p-2">
            <Link
              to={{
                pathname: `/albums/${artist.id}`,
                state: { artistName: artist.name },
              }}
              className="text-decoration-none"
            >
              <div className="card bg-dark text-white pt-5">
                <img
                  src={artist.images[0]?.url}
                  style={{
                    display: "flex",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    margin: "0 auto",
                  }}
                  alt={artist.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{artist.name}</h5>
                  <p className="small">Followers: {artist.followers.total}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default ArtistList;
