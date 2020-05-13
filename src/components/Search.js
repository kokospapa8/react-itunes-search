import React, { useState } from "react";
import "./Search.css";

const Search = (props) => {
  //current state, function to update it
  // const [searchValue, setSearchValue] = useState("");
  // const [attribute, setAttribute] = useState("artistTerm");
  // const [limit, setlimit] = useState(10);

  const [form, setForm] = useState({
    searchValue: "",
    attribute: "artistTerm",
    limit: "10",
  });
  const { searchValue, attribute, limit } = form;

  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  // const handleSearchInputChanges = (e) => {
  //   setSearchValue(e.target.value);
  // };

  // const handleAttributeChange = (e) => {
  //   setAttribute(e.target.value);
  // };

  // const handleLimitChange = (e) => {
  //   setlimit(e.target.value);
  // };

  const resetInputField = () => {
    // setSearchValue("");
    setForm({
      searchValue: "",
    });
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    // console.log(form);
    props.search(form);
    resetInputField();
  };

  return (
    <form className="search">
      <select id="attribute" name="attribute" onChange={onChange}>
        <option value="artistTerm">Search by artist name</option>
        <option value="albumTerm">Search by album name</option>
        <option value="composerTerm">Search by composer name</option>
        <option value="songTerm">Search by song title</option>
      </select>
      <input
        name="searchValue"
        value={searchValue}
        onChange={onChange}
        type="text"
      />
      <select id="limit" name="limit" onChange={onChange}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="200">200</option>
      </select>
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
};

export default Search;
