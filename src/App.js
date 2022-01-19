import React, { useState } from "react";
import Header from "./components/Header/Header";
import NavItems from "./constants/NavItems";
import { Graph } from "./components/Graph/Graph";
import Vertex from "./components/Vertex/Vertex";

function App() {
  const [graph, setGraph] = useState(new Graph());
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
    <div className="container">
      <Header NavItems={_NavItems} changeAlg={changeAlg} />
      <div className="row">
        <div className="col-md-12 col-xl-4">
          <div className="my-3 rounded shadow-sm bg-white p-4">
            <Vertex setGraph={setGraph} alg={alg} />
          </div>
        </div>
        {graph.vertices.length ? (
          <div className="col-md-12 col-xl-4">
            <div className="my-3 rounded shadow-sm bg-white p-4"></div>
          </div>
        ) : (
          ""
        )}
        {graph.res.open.length ? (
          <div className="col-md-12 col-xl-4">
            <div className="my-3 rounded shadow-sm bg-white p-4"></div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
