import React from "react";
import MCheckbox from "@material-ui/core/Checkbox";

const Checkbox = ({ checked, setChecked }) => {
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <MCheckbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "primary checkbox" }}
    />
  );
};

export { Checkbox };
