import React from "react";

const Main = ({ children }) => {
  return (
    <main className="my-3 rounded shadow-sm bg-white p-4">
      <h5>پیمایش</h5>
      {children}
    </main>
  );
};

export default Main;
