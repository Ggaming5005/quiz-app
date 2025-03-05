import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QuizProvider } from "./context/QuizContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <QuizProvider>
        <App />
      </QuizProvider>
    </ThemeProvider>
  </React.StrictMode>
);
