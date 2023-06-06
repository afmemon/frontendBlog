import { Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Main from "./dashboard/Main";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
