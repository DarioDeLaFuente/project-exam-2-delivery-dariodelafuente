import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SingleProfile from "./pages/SingleProfile";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import Layout from "./components/layout/Layout";
import { QueryClientProvider } from "react-query";
import queryClient from "./queryClient";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/profile/:name" element={<SingleProfile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="posts/:id" element={<SinglePost />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
