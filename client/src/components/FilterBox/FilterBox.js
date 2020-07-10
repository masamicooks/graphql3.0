import React from "react";
import PropTypes from "prop-types";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const FilterBox = React.memo(function SearchBox(props) {
  const { query, setQuery, type } = props;

  const handleSearch = (term) => {
    let searchTerm = term.trim();
    setQuery(searchTerm);
  };

  const onSearchChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <TextField
      value={query}
      onChange={onSearchChange}
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

FilterBox.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
};

export { FilterBox };
