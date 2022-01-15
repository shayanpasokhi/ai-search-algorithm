import React from "react";

const Aside = ({ children }) => {
  return (
    <aside className="my-3 rounded shadow-sm bg-white p-4">
      <h5>فضای حالت</h5>
      {children}
    </aside>
  );
};

export default Aside;
