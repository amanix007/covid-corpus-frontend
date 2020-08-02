import React from "react";
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <React.Fragment>
      <div class="sj-404error">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-12 offset-sm-0 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
              <div class="sj-404content">
                <div class="sj-404head">
                  <h2>404</h2>
                  <h3>Page Not Found :(</h3>
                </div>
                <span class="sj-gobackhome">
                  Go back to <Link to="/Home">Hompage</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
