import "./App.css";
import { Route, Routes} from "react-router-dom";
import Register from "./Register";
import LogIn from "./logIn";
import Home from "./home";
import ProtectedRoute from "./ProtectedRoute";
import PersistentLogin from "./PersistLogin";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
        <Route element={<PersistentLogin/>}>
          <Route element={<ProtectedRoute/>}>
            <Route path="/home" element={<Home/>} />
          </Route>
        </Route>
      </Routes>
  );
}

export default App;