import React from "react";
import "./Album.css";

import Card from "react-bootstrap/Card";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const Album = ({ album }) => {
  const albumReleaseDate = album.releaseDate.substring(0, 10);
  const albumArt = album.artworkUrl100.replace("100x100", "500x500");
  const collectionName =
    album.collectionName.length > 15
      ? album.collectionName.substring(0, 15) + "..."
      : album.collectionName;
  const artistName =
    album.artistName.length > 15
      ? album.artistName.substring(0, 15) + "..."
      : album.artistName;

  return (
    <div className="Album">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={albumArt} />
        <Card.Header>{collectionName}</Card.Header>
        <Card.Body>
          <Card.Title>{artistName}</Card.Title>
          <Card.Link href={album.artistViewUrl} target="_blank">
            See Artist
          </Card.Link>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{album.collectionType}</ListGroupItem>
          {/* <ListGroupItem>{album.trackCount}</ListGroupItem> */}
          <ListGroupItem>{album.primaryGenreName}</ListGroupItem>
          <ListGroupItem>{albumReleaseDate}</ListGroupItem>
        </ListGroup>
        <Card.Footer>
          <Card.Link href={album.collectionViewUrl} target="_blank">
            Buy
          </Card.Link>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Album;

// collectionViewUrl
