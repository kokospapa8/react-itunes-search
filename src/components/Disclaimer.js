import React from "react";
import { Accordion, Button, Card } from "react-bootstrap";

const Header = (props) => {
  return (
    <Accordion>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            Disclaimer
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            The Search API allows you to place search fields in your website to
            search for content within the iTunes Store and Apple Books Store.
            You can search for a variety of content; including books, movies,
            podcasts, music, music videos, audiobooks, and TV shows. Developers
            may use promotional content in the API, including previews of songs,
            music videos, album art and App icons only to promote store content
            and not for entertainment purposes. Use of sound samples and other
            assets from the API must be proximate to a store badge
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default Header;
