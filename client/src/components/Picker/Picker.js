import { MenuItem, Select } from "@material-ui/core";
import React from "react";
import capitalize from "../../util/capitalize";
import PropTypes from "prop-types";

const Picker = React.memo(function Picker({ field, loading, setField, value }) {
  const handleChange = (e) => {
    e.preventDefault();
    setField(e.target.value);
  };

  if (value && typeof Array.isArray(value)) {
    return (
      <Select value={field} disabled={loading} onChange={handleChange}>
        {value
          .filter((x) => x !== "_id")
          .map((x, i) => (
            <MenuItem key={i} value={x}>
              {capitalize(x)}
            </MenuItem>
          ))}
      </Select>
    );
  } else {
    return null;
  }
});

Picker.propTypes = {
  field: PropTypes.string,
  setField: PropTypes.func,
  value: PropTypes.array,
  loading: PropTypes.bool,
};

export { Picker };
