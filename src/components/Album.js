import React from "react";

const Album = ({album}) => {
    const albumReleaseDate = album.releaseDate.substring(0, 10);
  return (
    <div className="Album">
        <h2>{album.collectionName}</h2>
        <div>{album.artistName}</div>

        <div>
            <img 
                alt={album.collectionName}
                width="100"
                src={album.artworkUrl100}/>

        </div>
        <div>Tracks: {album.trackCount}</div>
        <div>Released: {albumReleaseDate}</div>

    </div>


  );
};

export default Album;

