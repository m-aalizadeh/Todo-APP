import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TodoList from "./components/todo";
import User from "./components/user/User";

function App() {
  const history = useNavigate();
  return (
    <Grid item xs={12}>
      <Routes>
        <Route path="/" element={<User history={history} />} />
        <Route path="/todos" element={<TodoList />} />
      </Routes>
    </Grid>
  );
}

export default App;
