import React from "react";
import PropTypes from "prop-types";

const Nav = ({ items, onClick }) => {
  const handleClick = (e, id) => {
    e.preventDefault();

    onClick?.(id);
  };

  return (
    <nav className="justify-content-center my-4 rounded shadow-sm bg-white">
      <ul className="nav nav-pills nav-justified">
        {items.map((item) => (
          <li className="nav-item" key={item.id}>
            <a
              className={`nav-link${
                item.isActive ? " active" : ""
              } h-100 d-flex justify-content-center align-items-center`}
              href="#"
              onClick={(e) => handleClick(e, item.id)}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Nav;
