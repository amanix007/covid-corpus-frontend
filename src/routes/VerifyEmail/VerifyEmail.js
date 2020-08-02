import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { authenticationService } from "services";

const VerifyEmail = (props) => {
  const [status, setstatus] = useState(<span><i className="fa fa-spinner fa-pulse fa-1x fa-fw"></i> Loading..</span>);

  let key = new URLSearchParams(props.location.search).get("key");
  if (!key) {
    props.history.push("/Login");
  }



  useEffect(() => {

    authenticationService.verifyEmail({ key })
      .then(res => {
        // props.history.push("/Login");
        setstatus(<span><i className="fa fa-check-circle-o" style={{color: "green"}}></i> Email Verified</span>)
      })
      .catch(error => {
        console.log('error:', error)
      setstatus(<span><i className="fa fa-exclamation-circle" style={{color: "red"}}></i> {error}</span>)
      })
      .finally(() => console.log("done"));


  }, []);
  return (
    <React.Fragment>
      <div class="sj-404error">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-12 offset-sm-0 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
              <div class="sj-404content">
                <div class="sj-404head">
                  {/* <h2>Verification</h2> */}
                  <h4>{status}</h4>
                </div>
                <span class="sj-gobackhome">
                  Visit  <Link to="/Login">Login</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default VerifyEmail;
