import Grid from "@mui/material/Grid";
import TodoList from "./components/TodoList.jsx";

function App() {
  return (
    <Grid item xs={12}>
      <TodoList />
    </Grid>
  );
}

export default App;
