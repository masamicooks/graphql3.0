import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { useTheme } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const PickerV2 = (props) => {
  const { options, option } = props;
  const history = useHistory();
  const theme = useTheme();

  const handleChange = (selectedOption) => {
    history.push({
      pathname: history.location.pathname,
      search: `collection=${selectedOption.value}`,
    });
  };

  return (
    <Select
      theme={(rTheme) => ({
        ...rTheme,
        colors: {
          ...rTheme.colors,
          primary: theme.palette.primary.main,
        },
      })}
      className={props.className}
      value={option}
      onChange={handleChange}
      options={options}
    />
  );
};

PickerV2.propTypes = {
  options: PropTypes.array,
  option: PropTypes.object,
};

export { PickerV2 };
