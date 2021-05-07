import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import HomePage from "./homePage";
import VanPage from "./vanPage";
import OrderPage from "./orderPage";
import LoginPage from "./login";
import UserPage from "./userPage";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/van" render={(props) => <VanPage {...props} />} />
        <Route path="/checkout" render={(props) => <OrderPage {...props} />} />
        <Route path="/login" component={LoginPage} />
        <Route path="/orders" component={UserPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
