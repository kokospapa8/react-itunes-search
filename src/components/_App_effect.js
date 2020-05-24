import React,  { useState, useEffect } from 'react';
import './App.css';
import Header from "./Header";
import Album from "./Album";
import Search from "./Search";

const ITUNES_API_URL = "https://itunes.apple.com/search?term=Kanye&entity=album&attribute=artistTerm"; // you should replace this with yours

function App() {

  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(ITUNES_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setAlbums(jsonResponse.results);
        setLoading(false);
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://itunes.apple.com/search?term=${searchValue}&entity=album&attribute=artistTerm`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.resultCount > 0) {
          // console.log(jsonResponse.results);
          setAlbums(jsonResponse.results);
          setLoading(false);
        } else {
          // console.log(jsonResponse);
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
    };
    
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
