import React from "react";

function ArtistList({ artistList }) {
  console.log(artistList);
  return (
    <div className="container text-center">
      <div className="row">
        {artistList &&
          artistList.map((artist) => (
            <div key={artist.id} className="col-3 p-2">
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
            </div>
          ))}
      </div>
    </div>
  );
}

export default ArtistList;
