import React, { useState } from "react";
import Header from "./components/Header/Header";
import NavItems from "./constants/NavItems";
import Vertex from "./components/Vertex/Vertex";
import Edge from "./components/Edge/Edge";
import IG from "./components/IG/IG";

function App() {
  const [graph, setGraph] = useState({
    vertex: [],
    edge: [],
    ig: { ini: "", goal: [] },
    res: { open: [], closed: [] },
  });
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

  const MIN_COST = 0;
  const MAX_COST = 100;

  const vertexRules = {
    required: "نام راس را وارد نمایید",
    maxLength: {
      value: 1,
      message: "نام راس باید یک کاراکتر باشد",
    },
    pattern: {
      value: /^[A-Z]$/,
      message: "نام راس باید یک حرف لاتین بزرگ باشد",
    },
  };

  const costRules = {
    valueAsNumber: true,
    min: {
      value: MIN_COST,
      message: `حداقل باید ${MIN_COST} باشد`,
    },
    max: {
      value: MAX_COST,
      message: `حداکثر باید ${MAX_COST} باشد`,
    },
    pattern: {
      value: /\d+/,
      message: "یک عدد وارد کنید",
    },
  };

  return (
    <div className="container">
      <Header NavItems={_NavItems} changeAlg={changeAlg} />
      <div className="row">
        <div className="col-md-12 col-xl-4">
          <div className="my-3 rounded shadow-sm bg-white p-4">
            <Vertex
              setGraph={setGraph}
              alg={alg}
              vertexRules={vertexRules}
              costRules={costRules}
            />
          </div>
        </div>
        {graph.vertex.length > 1 ? (
          <div className="col-md-12 col-xl-4">
            <div className="my-3 rounded shadow-sm bg-white p-4">
              <Edge
                setGraph={setGraph}
                graph={graph}
                alg={alg}
                vertexRules={vertexRules}
                costRules={costRules}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {graph.edge.length || graph.vertex.length === 1 ? (
          <div className="col-md-12 col-xl-4">
            <div className="my-3 rounded shadow-sm bg-white p-4">
              <IG graph={graph} vertexRules={vertexRules} />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
