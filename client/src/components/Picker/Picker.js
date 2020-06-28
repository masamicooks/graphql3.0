import React, { useContext } from "react";
import { MenuItem, Select } from "@material-ui/core";
import { DataTableContext } from "../../contexts";
import capitalize from "../../util/capitalize";
import PropTypes from "prop-types";
import Tippy from "tippy.js";

const Picker = React.memo(function Picker({ loading, values }) {
  const { field, setField } = useContext(DataTableContext);
  const handleChange = (e) => {
    e.preventDefault();
    setField(e.target.value);
  };

  if (values && typeof Array.isArray(values)) {
    return (
      <Select value={field} disabled={loading} onChange={handleChange}>
        {values.map((x, i) => (
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
