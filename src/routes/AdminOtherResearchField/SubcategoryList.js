import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";

const SubcategoryList = ({ handleEditSubcategory, handleNew, list }) => {
  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <h3>Subcategories</h3>
        <button className="dk-btn dk-btn-blue dk-btn-small" onClick={handleNew}>
          New
        </button>
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
                <td>{x.name}</td>
                <td className="text-center">{x.status}</td>
                <td className="text-right">
                  <button onClick={(e) => handleEditSubcategory(e, x.id)} className="list-link">
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SubcategoryList;
