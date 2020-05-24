import React from "react";
import styled from "styled-components";

import Card from "react-bootstrap/Card";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const AlbumContainer = styled.div`
  padding: 5px 25px 10px 25px;
  max-width: 25%;
`;

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
    <AlbumContainer>
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
    </AlbumContainer>
  );
};

export default React.memo(Album);
