import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";

const NoData = ({ title = "No Data Available" }) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <Badge overlap="rectangular" icon="noData_Found" />
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">{title}</Typography>
      </Grid>
    </Grid>
  );
};

export default NoData;
