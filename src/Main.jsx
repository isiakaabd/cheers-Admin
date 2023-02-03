import { ThemeProvider } from "@emotion/react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { muiTheme } from "./muiTheme";
import Splash from "./Splash";
import Home from "./Home";

function Main() {
  const navigate = useNavigate();
  useEffect(() => {
    //Idle timer

    let timerId;

    const resetTimer = () => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        navigate("/splash");
      }, 10 * 1000); //30 sec idle time
    };

    document.addEventListener("keydown", resetTimer);
    document.addEventListener("mousemove", resetTimer);
    return () => {
      clearTimeout(timerId);
      document.removeEventListener("keydown", resetTimer);
      document.removeEventListener("mousemove", resetTimer);
    };
  }, []);
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default Main;
