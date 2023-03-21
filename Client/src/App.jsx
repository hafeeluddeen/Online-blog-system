import TopBar from "./components/topbar/Topbar";
import Home from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Settings from "./pages/settings/Settings";
import SinglePage from "./pages/single/Single";
import Write from "./pages/write/Write";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/settings" element={user ? <Settings /> : <Register />} />

        <Route path="/register" element={user ? <Home /> : <Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/post/:id" element={<SinglePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
