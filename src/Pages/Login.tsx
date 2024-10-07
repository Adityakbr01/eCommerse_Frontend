import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Features/User"; // Assuming userSlice is correctly set up
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: any) => state.user);
  console.log(userInfo); // Debugging: Check if user info is logged

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // API call for login
    try {
      const response = await axios.post("/api/v1/auth/login", formData);

      // If the request is successful
      const result = response.data; // Get the JSON result from the response
      console.log(result); // Debugging: Check the result

      // Show success toast
      toast.success("Login successful!");

      // Dispatch login action to set Redux state
      dispatch(login(result.user));

      // Set JWT token in cookie for future requests
      Cookies.set("token", result.token);

      setFormData({ email: "", password: "" }); // Reset form
      navigate("/profile"); // Navigate to profile page
    } catch (error) {
      // Handle error
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message || "Failed to login user";
        toast.error(message);
      } else {
        toast.error("An error occurred during login.");
      }
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [userInfo, navigate]); // Add userInfo to dependencies

  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token);

    if (token) {
      try {
        // Send the token as part of the request if it exists
        axios
          .get("/api/v1/user/profile", {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in the Authorization header
            },
          })
          .then((res) => {
            console.log("Profile data:", res.data); // Handle profile data
            dispatch(login(res.data.user)); // Dispatch login action to set Redux state
            navigate("/profile");
          })
          .catch((error) => {
            console.error("Error fetching profile:", error);
          });
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  }, [handleSubmit]);

  return (
    <div className="flex text-black justify-center items-center h-[92vh]">
      <div className="bg-white font-Neue p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center font-Neue">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
