import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export const CustomFieldTemplate = (props) => {
  const schemaProperties = props.schema.properties;
  return (
    <Grid container spacing={4}>
      {Object.values(schemaProperties).map((prop = {}) => {
        const { title } = prop;
        return (
          <Grid item xs={4}>
            <Typography variant="h5">{title}</Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CustomFieldTemplate;
