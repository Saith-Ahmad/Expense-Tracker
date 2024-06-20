import React from 'react';
import expense from "../../../src/assets/dollar.png"

export const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <footer className="bg-white md:rounded-lg shadow dark:bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="https://ahmadwebcraft.com" className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={expense} className="h-8" alt="Expense Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Expense Tracker</span>
          </a>
          <ul className="flex flex-wrap items-center justify-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="https://ahmadwebcraft.com/" className="hover:underline me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="https://ahmadwebcraft.com/" className="hover:underline me-4 md:me-6">Privacy Policy</a>
            </li>
            <li>
              <a href="https://ahmadwebcraft.com/" className="hover:underline me-4 md:me-6">Licensing</a>
            </li>
            <li>
              <a href="https://ahmadwebcraft.com/" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className='text-center'>
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© {currentYear} <a href="https://www.ahmadwebcraft.com//" className="hover:underline">Expense Management System</a>. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};
