import React from "react";
import Nav from "./Nav/Nav";

const Header = ({ NavItems, changeAlg }) => {
  return (
    <header>
      <div className="container">
        <Nav items={NavItems} onClick={changeAlg} />
      </div>
    </header>
  );
};

export default Header;
