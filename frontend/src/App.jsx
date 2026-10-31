import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";

import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],

    queryFn: async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (data.error) return null;

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      console.log("authUser is here:", data);

      return data;
    },

    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex max-w-6xl mx-auto">
      {authUser && <Sidebar authUser={authUser} />}

      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <HomePage authUser={authUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/login"
          element={
            !authUser ? <LoginPage /> : <Navigate to="/" />
          }
        />

        <Route
          path="/signup"
          element={
            !authUser ? <SignUpPage /> : <Navigate to="/" />
          }
        />

        <Route
          path="/notifications"
          element={
            authUser ? (
              <NotificationPage authUser={authUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/profile/:username"
          element={
            authUser ? (
              <ProfilePage authUser={authUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      {authUser && <RightPanel authUser={authUser} />}

      <Toaster />
    </div>
  );
}

export default App;