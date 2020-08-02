import React from "react";
import { Link } from 'react-router-dom';
import { Box } from "@material-ui/core";

const EditionList = ({
  handleNew,
  list,
  expandEdition,
  handleEditEdition,
}) => {
  console.log('editions A', list);

  return (
    <React.Fragment>
      <div>
        <Box
          display="flex"
          justifyContent="space-between"
          alignContent="center"
        >
          <h3>Editions</h3>
          <button
            className="dk-btn dk-btn-blue dk-btn-small"
            onClick={handleNew}
          >
            New
          </button>
        </Box>
        {list.length === 0 && 'No editions created yet.'}
        {list.length > 0 && (
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Title</th>
                <th>Edition</th>
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
                        onClick={(e) => expandEdition(e, x.id)}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                      {x.title}
                    </td>
                    <td>{x.edition}</td>
                    <td className="text-center">{x.status === 'A' ? "Active" : ""}</td>
                    <td className="text-right">
                      <button type="button" onClick={(e) => handleEditEdition(e, x.id)} className="list-link">
                        Edit
                    </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </React.Fragment>
  );
};

export default EditionList;
