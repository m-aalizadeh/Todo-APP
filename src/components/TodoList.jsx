import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import withStyles from "@mui/styles/withStyles";
import TodoBar from "./TodoBar";
import CreateTask from "./CreateTask";

const styles = (theme) => ({
  root: {
    position: "absolute",
    left: "45%",
    top: "25%",
  },
});

const TodoList = ({ classes }) => {
  const [todos, setTodos] = useState([]);
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <TodoBar />
      </Grid>
      <Grid item xs={12}>
        <CreateTask />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(TodoList);
