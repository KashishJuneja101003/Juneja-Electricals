import { useState, useEffect, useRef } from "react";
import businessLogo from "../src/assets/Business Logo.png";
import LoginBtn from "./LoginBtn";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import LogoutBtn from "./Logout";
import { useAuth } from "./context/AuthContext";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const navRef = useRef();

  // Close all menus when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        setCategoryOpen(false);
        setBrandsOpen(false);
        setContactOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full" ref={navRef}>
      <div
        className="flex justify-between pb-0.5 h-16 gap-2"
        style={{ backgroundColor: "rgb(250, 250, 250)" }}
      >
        {/* Left Div */}
        <div className="flex justify-between items-center gap-2">
          {/* Logo + Name */}
          <Link to="/">
            <div className="flex items-center gap-3 p-1">
              <img
                src={businessLogo}
                alt="Business Logo"
                className="w-8 lg:w-12"
              />
              <p
                className="text-lg lg:text-xl cursor-default"
                style={{ color: "#27548a" }}
              >
                JUNEJA <br /> ELECTRICALS
              </p>
            </div>
          </Link>
        </div>

        {/* Right Div for desktop */}
        <div className="hidden bord md:flex gap-6 items-center justify-end pr-8">
          <div
            className="flex items-center justify-center gap-1 cursor-pointer"
            onClick={() => {
              setCategoryOpen(!categoryOpen);
              const eop = document.getElementById("explore-our-products");
              eop.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <p className="text-md lg:text-xl xl:text-2xl 2xl:text-3xl">
              Search by Category
            </p>
          </div>
          <div
            className="flex items-center justify-center gap-1 cursor-pointer"
            onClick={() => {
              setBrandsOpen(!brandsOpen);
              const bws = document.getElementById("brands-we-sell");
              bws.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <p className="text-md lg:text-xl xl:text-2xl 2xl:text-3xl">
              Brands We Sell
            </p>
          </div>
          <div
            className="flex items-center justify-center gap-1 cursor-pointer"
            onClick={() => {
              setContactOpen(!contactOpen);
              const cu = document.getElementById("contact-us");
              cu.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <p className="text-md lg:text-xl xl:text-2xl 2xl:text-3xl">
              Contact Us
            </p>
          </div>
          {<Cart />}

          {/* login - logout */}
          {(() => {
            const { token, user } = useAuth();

            if (token && user?.name) {
              const userName = user.name.split(" ")[0];
              return (
                <>
                  <div className="text-blue-800 font-semibold px-4 py-2">
                    Hi, {userName} 👋
                  </div>
                  <LogoutBtn />
                </>
              );
            } else {
              return <LoginBtn />;
            }
          })()}
        </div>

        {/* Hamburger for mobile */}
        <div className="flex md:hidden items-center justify-center gap-1 pr-4">
          <i
            className="fa-solid fa-bars text-2xl cursor-pointer"
            style={{ color: "#27548a" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          ></i>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <ul
          className="md:hidden flex flex-col gap-2 bg-white shadow-md absolute top-[65px] left-0 w-full p-4 rounded-md z-50"
          style={{ backgroundColor: "rgb(250, 250, 250)" }}
        >
          {/* Category */}
          <li>
            <div
              onClick={() => {
                setMobileMenuOpen(false);
                const eop = document.getElementById("explore-our-products");
                eop.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
            >
              <span>Search By Category</span>
            </div>
          </li>

          {/* Brands */}
          <li>
            <div
              onClick={() => {
                setMobileMenuOpen(false);
                const bws = document.getElementById("brands-we-sell");
                bws.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
            >
              <span>Brands We Sell</span>
            </div>
          </li>

          {/* Contact */}
          <li>
            <div
              onClick={() => {
                setMobileMenuOpen(false);
                const cus = document.getElementById("contact-us");
                cus.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
            >
              <span>Contact Us</span>
            </div>
          </li>

          <div className="flex items-center justify-between pr-2">
            {/* LoginBtn */}

            {(() => {
              const token = localStorage.getItem("token");
              const user = JSON.parse(localStorage.getItem("user"));

              if (token && user?.name) {
                const userName = user.name.split(" ")[0];
                return (
                  <>
                    <div className="text-blue-800 font-semibold px-4 py-2">
                      Hi, {userName} 👋
                    </div>
                    <LogoutBtn />
                  </>
                );
              } else {
                return <LoginBtn />;
              }
            })()}

            {/* Cart */}

            <Cart />
          </div>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
