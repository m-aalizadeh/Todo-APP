import "./App.css";
import { Routes, Route } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TodoList from "./components/TodoList";
import Login from "./components/user/Login";

function App() {
  return (
    <Grid item xs={12}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todos" element={<TodoList />} />
      </Routes>
    </Grid>
  );
}

export default App;
