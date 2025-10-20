function ContactUs() {
  return (
    <div id="contact-us" className="my-10">
      <div className="text-2xl font-semibold mb-2 md:text-3xl">Contact Us</div>

      <div
        className="flex flex-col gap-5 p-3 md:flex-row bg-gray-300"
        // style={{ backgroundColor: "#e1d9d9" }}
        id="mapLocation"
      >
        <a
          href="https://www.google.com/maps?ll=29.450816,77.319164&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=511390419161759350"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full lg:h-96 lg:w-full"
        >
          <iframe
            className="w-full h-64 md:h-full shadow-lg rounded-xl pointer-events-none"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3474.2463382544083!2d77.31658321054786!3d29.450816275124538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c2ed21eaaaaab%3A0x718d2e073acbe76!2sJuneja%20Electricals!5e0!3m2!1sen!2sin!4v1749207425596!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </a>

        <div className="bg-white p-2 rounded-2xl flex flex-col gap-1 shadow-lg md:text-xl lg:gap-3 h-fit self-center">
          <h2 className="text-center font-semibold text-[#27548a] text-shadow-gray-300 text-shadow-2xs">Juneja Electricals</h2>
          <a
            href="https://www.google.com/maps?ll=29.450816,77.319164&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=511390419161759350"
            target="_blank"
            className="flex gap-2"
          >
            <i className="fa-solid fa-location-dot self-center"></i>
            <p>Railpar Punjabi Colony, Shamli, Uttar Pradesh, 247776</p>
          </a>
          <a href="tel:+919027400868" className="flex gap-2">
            <i className="fa-solid fa-phone self-center"></i>
            <p>9027400868</p>
          </a>
          <a
            href="https://wa.me/919027400868"
            target="_blank"
            className="flex gap-2"
          >
            <i className="fa-solid fa-brands fa-whatsapp self-center"></i>
            <p>9027400868</p>
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=junejaelectricals100@gmail.com"
            target="_blank"
            className="flex gap-2"
          >
            <i className="fa-solid fa-envelope self-center"></i>
            <p>junejaelectricals100@gmail.com</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
