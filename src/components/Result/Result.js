import React from "react";
import PropTypes from "prop-types";

const Result = ({ res }) => {
  return (
    <table className="table table-bordered text-center">
      <caption className="caption-top text-end">
        <span className="badge bg-secondary">{res.alg}</span>
      </caption>
      <thead className="table-light">
        <tr>
          <th>Open</th>
          <th>Closed</th>
        </tr>
      </thead>
      <tbody>
        {Array.from(Array(res.open.length)).map((e, i) => (
          <tr key={i}>
            <td>
              {res.open[i].map((item, index) => (
                <React.Fragment key={index}>
                  {item?.vertex}
                  <sub>
                    {item?.f}
                    {index !== res.open[i].length - 1 ? ", " : ""}
                  </sub>
                </React.Fragment>
              ))}
            </td>
            <td>
              {res.closed[i].map((item, index) => (
                <React.Fragment key={index}>
                  {item?.vertex}
                  <sub>
                    {item?.f}
                    {index !== res.closed[i].length - 1 ? ", " : ""}
                  </sub>
                </React.Fragment>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Result.propTypes = {
  res: PropTypes.shape({
    open: PropTypes.arrayOf(
      PropTypes.shape({
        vertex: PropTypes.string.isRequired,
        f: PropTypes.number.isRequired,
      })
    ),
    closed: PropTypes.arrayOf(
      PropTypes.shape({
        vertex: PropTypes.string.isRequired,
        f: PropTypes.number.isRequired,
      })
    ),
    alg: PropTypes.string.isRequired,
  }).isRequired,
};

export default Result;
