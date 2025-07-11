import Owner from "../src/assets/Owner Image.jpg";

function MeetTheOwner() {
  return (
    <div className="my-10">
      <div className="text-2xl font-semibold mb-2 md:text-3xl">
        Meet The Owner
      </div>

      <div
        className="flex flex-col gap-5 p-3 md:flex-row"
        style={{ backgroundColor: "#e1d9d9" }}
      >
        {/* Image */}
        <div>
          <img
            src={Owner}
            alt="Owner - Sanjay Juneja"
            className="rounded-3xl shadow-md shadow-white w-full md:h-[100%]"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2 lg:gap-4 lg:px-8 lg:self-center">
          <i
            className="fa-solid fa-quote-left fa-flip-vertical fa-quote-right text-6xl lg:text-7xl"
            style={{ color: "#27548a" }}
          ></i>
          <p
            className="text-xl text-justify md:text-2xl"
            style={{ color: "#27548a" }}
          >
            Since the beginning, Juneja Electricals has stood for quality,
            transparency, and customer-first service. We value every interaction
            and strive to meet your expectations with every visit.
          </p>
          <div className="text-gray-600 md:text-lg">
            <p>Sanjay Juneja</p>
            <p>Founder & Proprietor</p>
            <p>Juneja Electricals</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetTheOwner;
