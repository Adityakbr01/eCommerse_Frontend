import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"; // Assuming toast for notifications
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../Features/User"; // Assuming you have a logout action

function Profile() {
  const [loading, setLoading] = useState(true); // Loading state
  const [profile, setProfile] = useState<any>(null); // Profile state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the user's profile data
  const token = Cookies.get("token" as string);
  useEffect(() => {
    console.log("Token from cookies:", token); // This should return your token

    axios
      .get("/api/v1/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.user) {
          setProfile(res.data.user); // Store the user profile data
          dispatch(login(res.data.user));
        } else {
          console.error("No user data in response", res.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching profile:",
          error.response?.data || error.message
        );
        setLoading(false);
      });
  }, []);

  console.log("User Profile:", profile);

  // Handle logout
  const handleLogout = () => {
    console.log("Token from cookies:", Cookies.get("token"));
    axios
      .get("logout", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        // Remove token from cookies
        dispatch(logout()); // Dispatch the logout action to clear user state
        navigate("/login"); // Redirect to login page
      })
      .catch((error) => {
        console.error(
          "Error fetching profile:",
          error.response?.data || error.message
        );
        setLoading(false);
      });
    // Cookies.remove("token"); // Remove token from cookies
    // dispatch(logout()); // Dispatch the logout action to clear user state
    // navigate("/login"); // Redirect to login page
    toast.success("Logged out successfully");
  };

  // Handle settings navigation
  const goToSettings = () => {
    navigate("/settings"); // Navigate to settings page
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[92vh]">
      <div className="bg-black font-Neue p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

        {profile ? (
          <div>
            <p className="mb-2">
              <strong>Name:</strong> {profile.name}
            </p>
            <p className="mb-4">
              <strong>Email:</strong> {profile.email}
            </p>

            <div className="space-y-4">
              {/* Settings Button */}
              <button
                onClick={goToSettings}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Settings
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p>No profile data found.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
