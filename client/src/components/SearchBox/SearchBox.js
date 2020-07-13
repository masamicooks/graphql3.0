import React, { useState, useContext } from "react";
import { DataTableContext } from "../../contexts";
import PropTypes from "prop-types";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const SearchBox = React.memo(function SearchBox() {
  const { query, setQuery } = useContext(DataTableContext);
  const [filter, setFilter] = useState(query);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(filter);
    }
  };
  const handleSearch = (term) => {
    let searchTerm = term.trim();
    setQuery(searchTerm);
  };

  const onSearchChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
    if (filter.length > 1 || e.target.value === "") {
      handleSearch(e.target.value);
    }
  };

  return (
    <TextField
      inputRef={(input) => input && input.focus()}
      value={filter}
      onChange={onSearchChange}
      onKeyPress={handleKeyPress}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={handleSearch}>
              <Search />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});

SearchBox.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
};

export { SearchBox };
