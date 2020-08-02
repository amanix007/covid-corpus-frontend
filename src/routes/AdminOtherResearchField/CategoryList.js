import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";

const CategoryList = ({ handleNew, list, expandCategory, handleEditCategory }) => {
  return (
    <div className="mt-3">
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <h3>Categories</h3>
        <span>
          <button
            className="dk-btn dk-btn-blue dk-btn-small"
            onClick={handleNew}
          >
            New
          </button>
        </span>
      </Box>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th className="text-center">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {list.map((x) => {
            return (
              <tr key={x.id}>
                <td>
                  <button
                    className="dk-level-button mr-3"
                    onClick={(e) => expandCategory(e, x.id)}
                  >
                    <i className="fa fa-plus"></i>
                  </button>
                  {x.name}
                </td>
                <td className="text-center">{x.status}</td>
                <td className="text-right">
                  <button onClick={(e) => handleEditCategory(e, x.id)} className="list-link">Edit</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
