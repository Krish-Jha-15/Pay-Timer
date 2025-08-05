import React from 'react';

function Footer() {
  return (

<footer className="bg-gradient-to-r from-slate-900 to-blue-800 text-white px-6 md:px-12 py-12 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-cyan-400 mb-3">💳 PayTimer</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            KJ Technology Private Limited<br />
            Student-friendly payment reminder for bills, subscriptions, education fees, and more — built to help you stay on track.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="hover:text-cyan-400 cursor-pointer">About Us</li>
            <li className="hover:text-cyan-400 cursor-pointer">Career</li>
            <li className="hover:text-cyan-400 cursor-pointer">Partner with Us</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="hover:text-cyan-400 cursor-pointer">Blogs</li>
            <li className="hover:text-cyan-400 cursor-pointer">FAQs</li>
            <li className="hover:text-cyan-400 cursor-pointer">Grievance Redressal</li>
            <li className="hover:text-cyan-400 cursor-pointer">Contact Us</li>
            <li className="hover:text-cyan-400 cursor-pointer">Media Queries</li>
            <li className="hover:text-cyan-400 cursor-pointer">DLG Disclosure</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="hover:text-cyan-400 cursor-pointer">Policies</li>
            <li className="hover:text-cyan-400 cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-cyan-400 cursor-pointer">Fair Practice Codes</li>
            <li className="hover:text-cyan-400 cursor-pointer">Digital Lending Partners</li>
            <li className="hover:text-cyan-400 cursor-pointer">Collection Agencies</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-slate-400">
        © 2025 PayTimer. All rights reserved.
      </div>
    </footer>
  )}

  export default Footer;
