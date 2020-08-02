import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ crumbs }) => {
  console.log('crumbs:', crumbs)
  // Don't render a single breadcrumb.
  //   if (crumbs.length <= 1) {
  //     return null;
  //   }

  return (
    <div className="bootstrap">
      {/* Link back to any previous steps of the breadcrumb. */}
      {crumbs.map(({ name, path }, key) =>
        key + 1 === crumbs.length ? (
          <span key={key} className="bold" style={{ color: "white" }}>
            {(name === "Home" || name === "Admin") && <i className="fa fa-home mr-1" />}
            {name}
          </span>
        ) : (
            <>
              <Link key={key} className="breadcrumb-link" to={path}>
              {(name === "Home" || name === "Admin") && <i className="fa fa-home mr-1" />}
                {name}
              </Link>
              <div className="sep mr-3 ml-3">></div>

            </>
          )
      )}
    </div>
  );
};

export default Breadcrumbs;