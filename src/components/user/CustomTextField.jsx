import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const CustomTextField = (props) => {
  const { required, disabled, schema, name, readonly, label, value, onChange } =
    props;
  console.log("maryam", props);
  return (
    <TextField
      value={value}
      required={required}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};

export default CustomTextField;
