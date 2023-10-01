import './App.css';
import { Route,Routes,BrowserRouter as Router } from "react-router-dom";
import Register from "./Register";
import LogIn from "./logIn";
import TaskForm from './home';


function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/home" element={<TaskForm />} />
        </Routes>
    </Router>
    
  );
}

export default App;

