import React, { useReducer } from "react";
import "./App.css";
import Header from "./Header";
import Album from "./Album";
import Search from "./Search";
import { Accordion, Button, Card } from "react-bootstrap";

const initialState = {
  loading: false,
  albums: [],
  errorMessage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_ALBUM_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case "SEARCH_ALBUM_SUCCESS":
      return {
        ...state,
        loading: false,
        albums: action.results,
      };
    case "SEARCH_ALBUM_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const search = (form) => {
    dispatch({
      type: "SEARCH_ALBUM_REQUEST",
    });
    const { searchValue, attribute, limit } = form;

    fetch(
      `https://itunes.apple.com/search?term=${searchValue}&entity=album&attribute=${attribute}&limit=${limit}`
    )
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.resultCount > 0) {
          dispatch({
            type: "SEARCH_ALBUM_SUCCESS",
            results: jsonResponse.results,
          });
        } else {
          // console.log(jsonResponse);
          dispatch({
            type: "SEARCH_ALBUM_SUCCESS",
            error: jsonResponse.Error,
          });
        }
      });
  };

  const { albums, errorMessage, loading } = state;

  return (
    <div className="App">
      <Header text="iTUNES ALBUM SEARCH" />
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Disclaimer
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {" "}
              The Search API allows you to place search fields in your website
              to search for content within the iTunes Store and Apple Books
              Store. You can search for a variety of content; including books,
              movies, podcasts, music, music videos, audiobooks, and TV shows.
              Developers may use promotional content in the API, including
              previews of songs, music videos, album art and App icons only to
              promote store content and not for entertainment purposes. Use of
              sound samples and other assets from the API must be proximate to a
              store badge
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <Search search={search} />
      <div className="albums">
        {!loading && !albums ? (
          <span>Please type search term</span>
        ) : loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          albums.map((album, index) => (
            <Album key={`${index}-${album.collectionId}`} album={album} />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
