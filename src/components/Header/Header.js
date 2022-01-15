import React from "react";
import Nav from "./Nav/Nav";

const Header = ({ NavItems, changeAlg }) => {
  return (
    <header className="my-4 rounded shadow-sm bg-white">
      <Nav items={NavItems} onClick={changeAlg} />
    </header>
  );
};

export default Header;
