import React from 'react'

const Legal = () => {
  return (
    <div className="text-center mt-10 space-y-4">
        <h2 className="text-2xl md:text-3xl mb-2 text-start font-semibold">Legal</h2>
        <div className="flex justify-center space-x-6 bg-[#e1d9d9] p-3">
          <a
            href="https://drive.google.com/file/d/1ycEqg2tSbNn0M5v5nacuF89g55sghyXa/view?usp=drive_link"
            download="Contact.pdf"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Contact Us
          </a>
          <a
            href="https://drive.google.com/file/d/12msSTwWMV-1eZtgG_zNPtE67Egq2zRrS/view?usp=drive_link"
            download
            className="text-blue-600 underline hover:text-blue-800"
          >
            Terms & Conditions
          </a>
          <a
            href="https://drive.google.com/file/d/1Y01T2WqAk8qsQ29L56ih50FhiB8UkmEe/view?usp=drive_link"
            download
            className="text-blue-600 underline hover:text-blue-800"
          >
            Refund Policy
          </a>
        </div>
      </div>
  )
}

export default Legal