import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
  // State to manage whether the menu is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu open/close state
  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // Function to close the menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* Menu Icon to open the menu */}
      <div className="menu-icon" onClick={toggleMenu}>
        <span>&#9776;</span>
      </div>

      {/* Menu Overlay */}
      {isOpen && (
        <div className="menu-overlay">
          <div className="menu-content">
            {/* Close Button */}
            <button className="close-button" onClick={closeMenu}>
              &times;
            </button>

            {/* Menu List */}
            <ul>
              <li><Link to="/total-customers" onClick={closeMenu}>Total Customers</Link></li>
              {/* Other menu items */}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
