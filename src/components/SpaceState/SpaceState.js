import React from "react";
import PropTypes from "prop-types";
import NavItems from "../../constants/NavItems";
import Bfs from "./Bfs/Bfs";

const SpaceState = ({ alg }) => {
  switch (alg) {
    case "bfs": {
      return <Bfs />;
    }
    default:
      return "";
  }
};

SpaceState.propTypes = {
  alg: PropTypes.oneOf(NavItems.map((item) => item.id)).isRequired,
};

export default SpaceState;
