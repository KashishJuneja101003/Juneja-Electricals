import { useState, useEffect, useRef } from "react";
import businessLogo from "../src/assets/Business Logo.png"
import LoginBtn from "./LoginBtn";
import Cart from "./Cart";
import {Link} from 'react-router-dom';

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
        <div className="flex justify-between w-[50%] md:w-[10%] lg:w-[80%] xl:w-[70%] items-center gap-2">
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
        <div className="hidden md:flex md:w-[100%] gap-6 items-center justify-end pr-8">
          <div
            className="flex items-center justify-center gap-1 cursor-pointer"
            onClick={() => setCategoryOpen(!categoryOpen)}
          >
            <p className="text-md lg:text-xl xl:text-2xl 2xl:text-3xl">
              Search by Category
            </p>
            <i
              className={`fa-solid fa-angle-down transition-transform ${categoryOpen ? "rotate-180" : ""
                }`}
              style={{ color: "#27548a" }}
            ></i>
          </div>
          <div
            className="flex items-center justify-center gap-1 cursor-pointer"
            onClick={() => setBrandsOpen(!brandsOpen)}
          >
            <p className="text-md lg:text-xl xl:text-2xl 2xl:text-3xl">
              Brands We Sell
            </p>
            <i
              className={`fa-solid fa-angle-down transition-transform ${brandsOpen ? "rotate-180" : ""
                }`}
              style={{ color: "#27548a" }}
            ></i>
          </div>
          <div
            className="flex items-center justify-center gap-1 cursor-pointer"
            onClick={() => setContactOpen(!contactOpen)}
          >
            <p className="text-md lg:text-xl xl:text-2xl 2xl:text-3xl">
              Contact Us
            </p>
            <i
              className={`fa-solid fa-angle-down transition-transform ${contactOpen ? "rotate-180" : ""
                }`}
              style={{ color: "#27548a" }}
            ></i>
          </div>
          {<Cart/>}
          {<LoginBtn/>}
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
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
            >
              <span>Search By Category</span>
              <i
                className={`fa-solid fa-angle-down fa-sm text-blue-800 transition-transform ${categoryOpen ? "rotate-180" : ""
                  }`}
              ></i>
            </div>
            {categoryOpen && (
              <ul className="flex flex-col gap-2 ml-4 mt-2 text-base text-gray-700">
                {["Fans", "Lighting", "Switches & Accessories", "Home Electricals"].map(
                  (item) => (
                    <li
                      key={item}
                      className="p-1 hover:bg-gray-100 active:bg-gray-100 rounded"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
            )}
          </li>

          {/* Brands */}
          <li>
            <div
              onClick={() => setBrandsOpen(!brandsOpen)}
              className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
            >
              <span>Brands We Sell</span>
              <i
                className={`fa-solid fa-angle-down fa-sm text-blue-800 transition-transform ${brandsOpen ? "rotate-180" : ""
                  }`}
              ></i>
            </div>
            {brandsOpen && (
              <ul className="flex flex-col gap-2 ml-4 mt-2 text-base text-gray-700">
                {[
                  "Usha",
                  "Havells",
                  "Cona",
                  "Tibcon",
                  "Plaza Cables",
                  "Bentex",
                  "Victoria",
                ].map((brand) => (
                  <li
                    key={brand}
                    className="p-1 hover:bg-gray-100 active:bg-gray-100 rounded"
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Contact */}
          <li>
            <div
              onClick={() => setContactOpen(!contactOpen)}
              className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
            >
              <span>Contact Us</span>
              <i
                className={`fa-solid fa-angle-down fa-sm text-blue-800 transition-transform ${contactOpen ? "rotate-180" : ""
                  }`}
              ></i>
            </div>
            {contactOpen && (
              <ul className="flex flex-col gap-2 ml-4 mt-2 text-base text-gray-700">
                <a
                  href="https://www.google.com/maps?ll=29.450816,77.319164&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=511390419161759350"
                  target="_blank"
                  className="flex gap-2 active:bg-gray-100"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-location-dot self-center text-base"></i>
                  <p className="text-base">Locate Our Store</p>
                </a>
                <a href="tel:+919027400868" className="flex gap-2 active:bg-gray-100">
                  <i className="fa-solid fa-phone self-center text-base"></i>
                  <p className="text-base">Call us</p>
                </a>
                <a
                  href="https://wa.me/919027400868"
                  target="_blank"
                  className="flex gap-2 active:bg-gray-100"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-whatsapp self-center text-base"></i>
                  <p className="text-base">Text on WhatsApp</p>
                </a>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=junejaelectricals100@gmail.com"
                  target="_blank"
                  className="flex gap-2 active:bg-gray-100"
                  rel="noopener noreferrer"
                >
                  <i className="fa-solid fa-envelope self-center text-base"></i>
                  <p className="text-base">Mail us</p>
                </a>
              </ul>
            )}
          </li>

          <div className="flex items-center justify-between pr-2">
          {/* LoginBtn */}
          
            <LoginBtn/>
          

          {/* Cart */}
          
            <Cart />
          
          </div>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
