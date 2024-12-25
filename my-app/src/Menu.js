import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="menu-icon" onClick={toggleMenu}>
        <span>&#9776;</span>
      </div>
      {isOpen && (
        <div className="menu-overlay">
          <div className="menu-content">
            <button className="close-button" onClick={closeMenu}>
              &times;
            </button>
            <ul>
              <li><Link to="/total-customers" onClick={closeMenu}>Total Customers</Link></li>
              <li><Link to="/add-customer" onClick={closeMenu}>Add Customer</Link></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
