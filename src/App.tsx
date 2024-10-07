import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { setProducts } from "./Features//Products";
import { login } from "./Features/User";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("api/v1/products", {
        withCredentials: true, // Ensures cookies are sent along with the request if needed
      })
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        dispatch(setProducts(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  useEffect(() => {
    const token = Cookies.get("token");

    try {
      // Send the token as part of the request if it exists
      axios
        .get("/api/v1/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
            credentials: true,
          },
        })
        .then((res) => {
          console.log("Profile data:", res.data); // Handle profile data
          dispatch(login(res.data.user)); // Dispatch login action to set Redux state
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, []);

  return (
    <div className="w-full h-full overflow-x-hidden scroll-bar-hide">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<h2>404</h2>} /> {/* For handling 404 */}
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
