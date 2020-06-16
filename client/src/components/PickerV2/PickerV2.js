import React, { useContext } from "react";
import { DataTableContext } from "../../contexts";

import PropTypes from "prop-types";
import Select from "react-select";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const PickerV2 = ({ className }) => {
  const { options, option } = useContext(DataTableContext);
  const history = useHistory();
  const theme = useTheme();

  const handleChange = (selectedOption) => {
    history.push({
      pathname: history.location.pathname,
      search: `collection=${selectedOption.value}`,
    });
  };

  console.log(className);

  return (
    <Select
      theme={(rTheme) => ({
        ...rTheme,
        colors: {
          ...rTheme.colors,
          primary: theme.palette.primary.main,
        },
      })}
      className={className}
      value={option}
      onChange={handleChange}
      options={options}
    />
  );
};

PickerV2.propTypes = {
  className: PropTypes.string,
};

export { PickerV2 };
