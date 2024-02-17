import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Todo from "./components/Todo";
import User from "./components/user/User";

function App() {
  const history = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<User history={history} />} />
      <Route path="/todos" element={<Todo />} />
    </Routes>
  );
}

export default App;
