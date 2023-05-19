import "./App.css";
import Grid from "@mui/material/Grid";
import TodoList from "./components/TodoList";

function App() {
  return (
    <Grid item xs={12}>
      <TodoList />
    </Grid>
  );
}

export default App;
