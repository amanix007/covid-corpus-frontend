import React from "react";
import { Link } from 'react-router-dom';
import { Box } from "@material-ui/core";

const List = ({
  handleNew,
  list,
  handleEdit,
}) => {
  console.log('list', list);
  return (
    <React.Fragment>
      <div>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignContent="center"
        >
          <button
            className="dk-btn dk-btn-blue dk-btn-small"
            onClick={handleNew}
          >
            New
          </button>
        </Box>

        {list && list.length === 0 && 'No funders defined yet'}

        {list && list.length > 0 && (
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>Acronym</th>
                <th className="text-center">Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.map((x) => {
                return (
                  <tr key={x.id}>
                    <td>
                      {x.name}
                    </td>
                    <td>
                      {x.acronym}
                    </td>
                    <td className="text-center">{x.status === "A" ? "Active" : "Inactive"}</td>
                    <td className="text-center">
                      <button onClick={(e) => handleEdit(x.id)} className="list-link">
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

export default List;
