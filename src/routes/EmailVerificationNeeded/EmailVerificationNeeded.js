import React from "react";

const EmailVerificationNeeded = () => {

    return (
        <React.Fragment>
          <div class="sj-404error">
            <div class="container">
              <div class="row">
                <div class="col-12 col-sm-12 offset-sm-0 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
                  <div class="sj-404content">
                    <div class="sj-404head">
                        <div class="email-verification-needed">
                            Registered successfully!
                            <br />
                            Before logging in, you need to verify your registration. Please check your email for the confirmation link.
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
};

export default EmailVerificationNeeded;