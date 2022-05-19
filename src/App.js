import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import TokenContext from "./contexts/TokenContext";
import NameContext from "./contexts/NameContext";
import SingUpPage from "./components/SingUpPage";
import ObrasPage from "./components/ObrasPage";

export default function App() {
  const [token, setToken] = useState("");
  const [nameContext, setNameContext] = useState("");
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <NameContext.Provider value={{ nameContext, setNameContext }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sing-up" element={<SingUpPage />} />
            <Route path="/obras" element={<ObrasPage />} />
          </Routes>
        </BrowserRouter>
      </NameContext.Provider>
    </TokenContext.Provider>
  );
}
