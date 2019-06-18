import React from "react";

const Form = props => {
  return (
    <div className="search_form">
      <form onSubmit={e => props.handleSubmit(e)}>
        <label htmlFor="searchText">Search product:</label>
        <input
          placeholder="search for anything"
          type="text"
          id="searchText"
          onChange={e => props.handleChange(e)}
          value={props.searchText}
        />
        <button onSubmit={e => props.handleSubmit(e)}>Search</button>
        <button onClick={props.onClick}>Show all</button>
      </form>
    </div>
  );
};

export default Form;
