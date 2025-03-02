import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home"; // home base
import Auth from "./pages/Auth/Auth"; // login/signup
import Profile from "./pages/Profile/Profile"; // profile stuff
import Chat from "./pages/Chat/Chat"; // chat page
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.authReducer.authData);

  return (
    <div
      className="App"
      style={{ height: window.location.pathname === "/chat" ? "calc(100vh - 2rem)" : "auto" }} // chat gets squished
    >
      <Routes>
        <Route path="/" element={user ? <Navigate to="home" /> : <Navigate to="../auth" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="../auth" />} />
        <Route path="/auth" element={user ? <Navigate to="../home" /> : <Auth />} />
        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="../auth" />} />
        <Route path="/chat" element={user ? <Chat /> : <Navigate to="../auth" />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Yo, nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;