import React from 'react'

const Legal = () => {
  return (
    <div className="text-center mt-10 space-y-4">
        <h2 className="text-2xl md:text-3xl mb-2 text-start font-semibold">Legal</h2>
        <div className="flex justify-center space-x-6 bg-[#e1d9d9] p-3">
          <a
            href="/Contact.pdf"
            download="Contact.pdf"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Contact Us
          </a>
          <a
            href="/Terms.pdf"
            download
            className="text-blue-600 underline hover:text-blue-800"
          >
            Terms & Conditions
          </a>
          <a
            href="/RefundPolicy.pdf"
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