import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { useAuthentication } from "./hooks/useAuthentication";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <AuthContextProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
