import React from "react";
import './styling/App.css';

import { Routes, Route, BrowserRouter } from "react-router-dom";

import Signup from './pages/Signup';
import Login from './pages/Login';
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Login
              />
            }
            title="Login"
          />
          <Route
            path="/login"
            exact
            element={
              <Login
              />
            }
            title="Login"
          />
          <Route
            path="/signup"
            exact
            element={
              <Signup
              />
            }
            title="Sign Up"
          />
          <Route
            path="/404"
            exact
            element={
            <PageNotFound 
            />
          }
          />
          <Route path="*" exact element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
