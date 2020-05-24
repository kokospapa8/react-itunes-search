import React, { useReducer } from "react";
import Header from "./Header";
import Album from "./Album";
import Search from "./Search";
import Disclaimer from "./Disclaimer";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";

const initialState = {
  albums: [],
  offset: 0,
  form: null,
  errorMessage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_ALBUM_INIT":
      return {
        ...state,
        form: action.form,
        errorMessage: null,
      };
    case "SEARCH_ALBUM_SUCCESS":
      return {
        ...state,
        albums: action.results,
        offset: 0,
      };
    case "SEARCH_ALBUM_FAILURE":
      return {
        ...state,
        errorMessage: action.error,
        form: null,
      };
    case "MORE_ALBUM_SUCCESS":
      return {
        ...state,
        albums: state.albums.concat(action.results),
        offset: state.offset + parseInt(state.form.limit),
      };
    default:
      return state;
  }
};

const StyledApp = styled.div`
  text-align: center;
  box-sizing: border-box;
`;

const StyledErrorMessage = styled.div`
  margin: auto;
  font-weight: bold;
  color: rgb(161, 15, 15);
`;

const StyledAlbums = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { albums, form, errorMessage } = state;

  const search = (form) => {
    fetchData(form);
  };

  const loadMore = () => {
    fetchData();
  };

  const fetchData = (form) => {
    const { offset } = state;
    const initialSearch = form ? true : false;
    if (!initialSearch) {
      form = state.form;
    } else {
      dispatch({
        type: "SEARCH_ALBUM_INIT",
        form: form,
      });
    }

    //if form is not initialized
    if (form == null) {
      dispatch({
        type: "SEARCH_ALBUM_FAILURE",
        error: "invalid search value",
      });
      return;
    }

    const { searchValue, attribute, limit } = form;
    const newOffset = initialSearch ? offset : offset + parseInt(limit);

    const dispatchType = initialSearch
      ? "SEARCH_ALBUM_SUCCESS"
      : "MORE_ALBUM_SUCCESS";
    const fetchURL = initialSearch
      ? `https://itunes.apple.com/search?term=${searchValue}&entity=album&attribute=${attribute}&limit=${limit}&offset=${newOffset}`
      : `https://itunes.apple.com/search?term=${searchValue}&entity=album&attribute=${attribute}&limit=${limit}&offset=${newOffset}`;

    fetch(fetchURL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.resultCount > 0) {
          dispatch({
            type: dispatchType,
            results: jsonResponse.results,
          });
        } else {
          dispatch({
            type: "SEARCH_ALBUM_FAILURE",
            error: jsonResponse.Error,
          });
        }
      });
  };

  return (
    <StyledApp>
      <Header text="iTUNES ALBUM SEARCH" />
      <Disclaimer />
      <Search search={search} />
      <InfiniteScroll
        dataLength={albums.length} //This is important field to render the next data
        next={loadMore}
        hasMore={true}
        loader={form ? <Spinner animation="border" /> : ""}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>End of content</b>
          </p>
        }
      >
        <StyledAlbums>
          {albums.map((album, index) => (
            <Album key={`${index}-${album.collectionId}`} album={album} />
          ))}
        </StyledAlbums>
      </InfiniteScroll>

      <StyledErrorMessage>
        {errorMessage ? { errorMessage } : ""}
      </StyledErrorMessage>
    </StyledApp>
  );
}

export default App;
