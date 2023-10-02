import "./App.css";
import { Route, Routes} from "react-router-dom";
import Register from "./Register";
import LogIn from "./logIn";
import Home from "./home";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route element={<ProtectedRoute/>}>
          <Route path="/home" element={<Home/>} />
        </Route>
      </Routes>
  );
}

export default App;