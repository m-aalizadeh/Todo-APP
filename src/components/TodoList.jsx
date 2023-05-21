import React, { useState } from "react";
import _cloneDeep from "lodash/cloneDeep";
import Grid from "@mui/material/Grid";
import withStyles from "@mui/styles/withStyles";
import TodoBar from "./TodoBar";
import CreateTask from "./CreateTask";
import Todos from "./Todos";

const styles = (theme) => ({
  root: {
    position: "absolute",
    left: "45%",
    top: "25%",
  },
});

const TodoList = ({ classes }) => {
  const [tasks, setTodos] = useState([]);

  const addTask = (task) => {
    let allTodos = _cloneDeep(tasks);
    allTodos.push(task);
    setTodos(allTodos);
  };
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <TodoBar />
      </Grid>
      <Grid item xs={12}>
        <CreateTask addTask={addTask} />
      </Grid>
      <Grid item xs={12}>
        <Todos todos={tasks} />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(TodoList);
