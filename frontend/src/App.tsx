import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./navbar";
import Login from "./auth/login";
import PrivateRoute from "./route/PrivateRoute";
import Topics from "./pages/topics/Topics";
import Progress from "./pages/progress/Progress";
import Profile from "./pages/profile/Profile";
import SignUp from "./auth/signUp";
import React from "react";
import { Toaster } from 'react-hot-toast'

function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Navbar />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/progress" element={<Progress />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-left" toastOptions={{ duration: 5000 }} />
    </div>
  );
}

export default App;
