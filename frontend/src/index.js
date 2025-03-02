import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store/ReduxStore"; // redux junk
import App from "./App";

// stack overflow vibes
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} /> {/* all roads lead here */}
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// perf stuff if ya care
// reportWebVitals(console.log);