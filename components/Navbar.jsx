function Navbar() {
  return (
    <nav className="w-full">
      <div className="flex justify-between pb-0.5 h-16 gap-2" style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
        {/* Left Div */}
        <div className="flex justify-between w-[50%] md:w-[70%] lg:w-[80%] xl:w-[70%] items-center gap-2">
          {/* Logo + Name */}
          <div className="flex items-center gap-3 p-1">
            <img
              src="./Assets/Business Logo.png"
              alt="Business Logo"
              className="w-8 lg:w-12"
            />
            <p className="text-lg lg:text-xl cursor-default" style={{ color: '#27548a' }}>
              JUNEJA <br /> ELECTRICALS
            </p>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex md:w-68 lg:w-73 my-2 mt-3 items-center gap-1.5 border-[0.6px] xl:border-1 px-2 h-10 rounded-3xl bg-white border-gray-400 cursor-text transition-all">
            <i className="fa-solid fa-magnifying-glass text-gray-700 md:text-xs xl:text-lg"></i>
            <p className="text-gray-600 md:text-xs xl:text-lg">Search Products</p>
          </div>
        </div>

        {/* Right Div */}
        <div className="hidden md:flex md:w-[70%] gap-6 items-center justify-end pr-8">
          <div id="toggleSearchNavbar" className="flex items-center justify-center gap-1 cursor-pointer">
            <p className="text-md lg:text-xl xl:text-2xl 2xl:text-3xl">Search by Category</p>
            <i id="iconSearchNavbar" className="fa-solid fa-angle-down" style={{ color: '#27548a' }}></i>
          </div>
          <div id="toggleBrandsNavbar" className="flex items-center justify-center gap-1 cursor-pointer">
            <p className="text-md lg:text-xl xl:text-2xl 2xl:text-3xl">Brands We Sell</p>
            <i id="iconBrandsNavbar" className="fa-solid fa-angle-down" style={{ color: '#27548a' }}></i>
          </div>
          <div id="toggleContactNavbar" className="flex items-center justify-center gap-1 cursor-pointer">
            <p className="text-md lg:text-xl xl:text-2xl 2xl:text-3xl">Contact Us</p>
            <i id="iconContactNavbar" className="fa-solid fa-angle-down" style={{ color: '#27548a' }}></i>
          </div>
        </div>

        {/* Hamburger */}
        <div className="flex md:hidden items-center justify-center gap-1 pr-4" id="hamburger">
          <i className="fa-solid fa-bars text-2xl cursor-pointer" style={{ color: '#28548a' }}></i>
        </div>

        {/* Mobile Dropdown */}
        <ul className="hidden h-fit overflow-hidden w-full text-md md:hidden flex-col gap-2 bg-white shadow-md absolute top-[9.7%] p-4 rounded-md z-50 duration-300 ease-in-out" id="navLinks" style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
          {/* Category */}
          <li>
            <div id="toggleCategory" className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
              <span>Search By Category</span>
              <i id="iconCategory" className="fa-solid fa-angle-down fa-sm text-blue-800"></i>
            </div>
            <ul className="hidden flex-col gap-2 ml-4 mt-2 text-base text-gray-700" id="menuCategory">
              <li className="p-1 hover:bg-gray-100 active:bg-gray-100 rounded">Fans</li>
              <li className="p-1 hover:bg-gray-100 active:bg-gray-100 rounded">Lighting</li>
              <li className="p-1 hover:bg-gray-100 active:bg-gray-100 rounded">Switches & Accessories</li>
              <li className="p-1 hover:bg-gray-100 active:bg-gray-100 rounded">Home Electricals</li>
            </ul>
          </li>

          {/* Brands */}
          <li>
            <div id="toggleBrands" className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
              <span>Brands We Sell</span>
              <i className="fa-solid fa-angle-down fa-sm text-blue-800" id="iconBrands"></i>
            </div>
            <ul className="hidden flex-col gap-2 ml-4 mt-2 text-base text-gray-700" id="menuBrands">
              {['Usha', 'Havells', 'Cona', 'Tibcon', 'Plaza Cables', 'Bentex', 'Victoria'].map((brand) => (
                <li key={brand} className="p-1 hover:bg-gray-100 active:bg-gray-100 rounded">{brand}</li>
              ))}
            </ul>
          </li>

          {/* Contact */}
          <li>
            <div id="toggleContact" className="flex justify-between items-center cursor-pointer hover:bg-gray-200 p-2 rounded-lg">
              <span>Contact Us</span>
              <i className="fa-solid fa-angle-down fa-sm text-blue-800" id="iconContact"></i>
            </div>
            <ul className="hidden flex-col gap-2 ml-4 mt-2 text-base text-gray-700" id="menuContact">
              <a href="https://www.google.com/maps?ll=29.450816,77.319164&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=511390419161759350" target="_blank" className="flex gap-2 active:bg-gray-100">
                <i className="fa-solid fa-location-dot self-center text-base"></i>
                <p className="text-base">Locate Our Store</p>
              </a>
              <a href="tel:+919027400868" className="flex gap-2 active:bg-gray-100">
                <i className="fa-solid fa-phone self-center text-base"></i>
                <p className="text-base">Call us</p>
              </a>
              <a href="https://wa.me/919027400868" target="_blank" className="flex gap-2 active:bg-gray-100">
                <i className="fa-brands fa-whatsapp self-center text-base"></i>
                <p className="text-base">Text on WhatsApp</p>
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=junejaelectricals100@gmail.com" target="_blank" className="flex gap-2 active:bg-gray-100">
                <i className="fa-solid fa-envelope self-center text-base"></i>
                <p className="text-base">Mail us</p>
              </a>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
