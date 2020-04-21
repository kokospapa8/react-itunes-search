import React,  { useEffect, useReducer } from 'react';
import './App.css';
import Header from "./Header";
import Album from "./Album";
import Search from "./Search";

// const ITUNES_API_URL = "https://itunes.apple.com/search?term=Kanye&entity=album&attribute=artistTerm";

const initialState = {
  loading: true,
  albums: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_ALBUM_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_ALBUM_SUCCESS":
      return {
        ...state,
        loading: false,
        albums: action.results
      };
    case "SEARCH_ALBUM_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {  
  //   fetch(ITUNES_API_URL)
  //       .then(response => response.json())
  //       .then(jsonResponse => {
  //         dispatch({
  //             type: "SEARCH_ALBUM_SUCCESS",
  //             results: jsonResponse.results
  //         });
  //   });
  // }, []);

  const search = searchValue => {
    dispatch({
      type: "SEARCH_ALBUM_REQUEST"
    });
    console.log(searchValue);

    fetch(`https://itunes.apple.com/search?term=${searchValue}&entity=album&attribute=artistTerm`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.resultCount > 0) {
          dispatch({
            type: "SEARCH_ALBUM_SUCCESS",
            results: jsonResponse.results
          })
        } else {
          // console.log(jsonResponse);
          dispatch({
            type: "SEARCH_ALBUM_SUCCESS",
            error: jsonResponse.Error
          })
        }
      });
    };
    
  const { albums, errorMessage, loading } = state;

  return (
    <div className="App">
      <Header text="iTUNES ALBUM SEARCH" />
      <Search search={search} />
      <div className="albums">
        {loading && !errorMessage ? (
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
