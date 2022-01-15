import React, { useState } from "react";
import Header from "./components/Header/Header";
import NavItems from "./constants/NavItems";
import Aside from "./components/Aside/Aside";
import Main from "./components/Main/Main";
import SpaceState from "./components/SpaceState/SpaceState";

function App() {
  const [alg, setAlg] = useState(
    () => NavItems.find((item) => item.isActive).id
  );

  const _NavItems = NavItems.map((item) => ({
    ...item,
    ...(item.id === alg ? { isActive: true } : { isActive: false }),
  }));

  const changeAlg = (id) => {
    setAlg(id);
  };

  return (
    <div className="container-lg">
      <Header NavItems={_NavItems} changeAlg={changeAlg} />
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <Aside>
            <SpaceState alg={alg} />
          </Aside>
        </div>
        <div className="col-sm-12 col-md-6">
          <Main></Main>
        </div>
      </div>
    </div>
  );
}

export default App;
