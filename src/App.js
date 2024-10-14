import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskList from "./pages/TaskList";
import AddEditTask from "./pages/AddEditTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./HomePage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/tasklist" element={<TaskList />}></Route>
        <Route path="/add" element={<AddEditTask />}></Route>
        <Route path="/edit/:id" element={<AddEditTask />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
};

export default App;
