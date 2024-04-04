import React, { useState } from 'react';
import { Fragment } from 'react';
const NoPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState([
      { id: 1, name: 'Option 1', checked: false },
      { id: 2, name: 'Option 2', checked: false },
      { id: 2, name: 'Option 2', checked: false },
      { id: 2, name: 'Option 2', checked: false },
      { id: 2, name: 'Option 2', checked: false },
      { id: 2, name: 'Option 2', checked: false },
      { id: 3, name: 'Option 3', checked: false }
    ]);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleCheckboxChange = (id) => {
      setOptions(options.map(option =>
        option.id === id ? { ...option, checked: !option.checked } : option
      ));
    };
    return (
      <div className="relative inline-block text-left">
        <div>
          <button onClick={toggleDropdown} type="button" className="inline-flex justify-center items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            Options
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
  
        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              {options.map(option => (
                <Fragment key={option.id}>
                  <label className="flex items-center space-x-3 px-4 py-2">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" checked={option.checked} onChange={() => handleCheckboxChange(option.id)} />
                    <span className="text-gray-900">{option.name}</span>
                  </label>
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
export default NoPage
