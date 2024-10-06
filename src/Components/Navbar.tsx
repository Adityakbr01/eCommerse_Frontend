import { Squeeze as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import { BsHandbag } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Close dropdown on clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (event.target.closest(".dropdown-menu") === null) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const { userInfo } = useSelector((state: any) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
      setScrolled(currentScrollPos > window.innerHeight * 0.1);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  // fixed z-[1000] left-1/2 -translate-x-1/2 ${scrolled ? "gl" : ""}
  // ${
  //   visible ? "translate-y-0" : "md:-translate-y-[20vh] "
  // }

  return (
    <nav
      className={`flex w-[100%] relative z-50 border-b px-[5%]  top-0 py-1 md:py-3 mx-auto justify-between items-center transition-transform duration-300 `}
    >
      <div className="flex items-center justify-center gap-2 left">
        <div className="flex items-center w-6 h-6">
          <img
            className="w-full"
            src="https://ik.imagekit.io/sheryians/Sheryians_logo_EzwgcppnD"
            alt=""
          />
        </div>
        <h3 className="flex flex-wrap items-center font-medium font-Neue">
          Sherry Shop
        </h3>
      </div>
      <div className="hidden right md:flex">
        <ul className="flex items-center gap-10 text-sm font-light font-Neue">
          <NavLink to="/" className="cursor-pointer font-Neue">
            Home
          </NavLink>
          <Link to={"/Search"} className="cursor-pointer">
            Search
          </Link>
          <Link to={"/Cart"} className="relative text-sm">
            <span>
              <BsHandbag size={23} />
            </span>

            <div className="absolute top-[1px] right-[-5px] w-2 h-2 rounded-full glow bg-green-500"></div>
          </Link>

          {/* Conditional Rendering for Profile or Sign Up */}
          {userInfo ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="px-5 py-1 text-base rounded-sm cursor-pointer shine text-btn-font bg-btn font-Helvetica"
              >
                Profile
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 w-40 bg-white shadow-lg rounded-md z-50 dropdown-menu">
                  <Link
                    to="/profile"
                    onClick={closeDropdown}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={closeDropdown}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/logout"
                    onClick={closeDropdown}
                    className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              to={"/register"}
              className="px-5 py-1 text-base rounded-sm cursor-pointer shine text-btn-font bg-btn font-Helvetica"
            >
              Sign Up
            </Link>
          )}

          {/* <li
            onClick={() => dispatch(toggle())}
            className={`relative px-8 py-3 text-base border ${
              toggleState ? "border-white" : "border-black"
            } rounded-full cursor-pointer font-Helvetica`}
          >
            <div
              className={`absolute w-6 h-6 top-1/2 -translate-y-1/2 py-2 flex items-center justify-center ${
                toggleState ? "bg-white" : "bg-black"
              } rounded-full transition-all duration-300 ease-in-out ${
                toggleState ? "right-0" : "right-[62%]"
              }`}
            >
              {toggleState ? (
                <RiMoonClearLine className="text-[#2bd1ff]" />
              ) : (
                <MdOutlineWbSunny className="text-[#ffdd35]" />
              )}
            </div>
          </li> */}
        </ul>
      </div>

      <div
        className={`relative z-50 block  md:hidden text-white`}
        onClick={() => setOpen(!isOpen)}
      >
        <Hamburger size={22} />
      </div>
      {/* Mobile Menu */}
      <div
        className={`absolute md:hidden ${
          isOpen ? "right-0 " : "right-[-100%]"
        } w-full h-screen bg-[#0C0C0C] text-white top-0 right transition-all duration-300 ease-in-out`}
      >
        <div className="w-full p-6 border-b border-white">
          <h1 className="text-2xl text-white font-Neue">Menu</h1>
        </div>
        <ul className="flex flex-col items-start gap-6 p-8 text-2xl font-light text-white opacity-70 text-opacity-60 font-Neue">
          <Link to="/" className="cursor-pointer">
            Home
          </Link>
          <Link to={"/Search"} className="cursor-pointer">
            Search
          </Link>
          <Link to={"/Cart"}>Cart</Link>
          <Link to={"/Register"} className="cursor-pointer ">
            Sign in
          </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
