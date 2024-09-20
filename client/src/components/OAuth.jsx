import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "./redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(""); // To manage error state

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      
      // Log the result to inspect the returned data
      console.log("Google Auth Result:", result);
  
      const { displayName, email, photoURL } = result.user;
      
      // Check if photoURL is available, if not, use a default avatar
      const profilePhoto = photoURL || "https://www.example.com/default-avatar.png";
  
      // Make API call to your backend for user handling
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: displayName,
          email: email,
          photo: profilePhoto, // Use the profilePhoto variable
        }),
      });
  
      const data = await res.json();
      dispatch(signInSuccess(data)); // Update Redux store
      navigate("/"); // Navigate after successful login
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };
  

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>} {/* Show error message */}
      <button
        type="button"
        onClick={handleGoogleClick}
        className="bg-red-600 text-white p-3 rounded-lg uppercase hover:opacity-95"
        disabled={loading} // Disable button during loading
      >
        {loading ? "Signing in..." : "Continue with Google"}
      </button>
    </div>
  );
}

export default OAuth;

