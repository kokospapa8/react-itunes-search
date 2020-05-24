import React, { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  /* margin-top: 10px; */
  margin: 10px;
`;

const StyledSubmitButton = styled.input`
  padding: 5px;
  background-color: transparent;
  color: black;
  border: 1px solid black;
  width: 80px;
  margin-left: 5px;
  cursor: pointer;
  &:hover {
    background-color: #282c34;
    color: antiquewhite;
  }
`;

const StyledTextInput = styled.input`
  width: 40%;
  min-width: 170px;
`;

const Search = (props) => {
  const [form, setForm] = useState({
    searchValue: "",
    attribute: "artistTerm",
    limit: "10",
  });

  const onChange = (e) => {
    const nextForm = {
      ...form,
      [e.target.name]: e.target.value,
    };
    setForm(nextForm);
  };

  const resetInputField = () => {
    setForm({
      ...form,
      searchValue: "",
    });
  };

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(form);
    resetInputField();
  };

  return (
    <StyledForm>
      <select id="attribute" name="attribute" onChange={onChange}>
        <option value="artistTerm">Search by artist name</option>
        <option value="albumTerm">Search by album name</option>
        <option value="composerTerm">Search by composer name</option>
        <option value="songTerm">Search by song title</option>
      </select>
      <StyledTextInput
        name="searchValue"
        value={form.searchValue}
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
      <StyledSubmitButton
        onClick={callSearchFunction}
        type="submit"
        value="SEARCH"
      />
    </StyledForm>
  );
};

export default Search;
