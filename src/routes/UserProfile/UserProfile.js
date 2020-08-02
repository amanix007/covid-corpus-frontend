import React, { useState } from "react";
import { useAppState } from 'components/AppState';
import ProfilePhoto from 'components/ProfilePhoto';

const UserProfile = () => {
    const [{ currentUser }, dispatch] = useAppState();

    return (
        <React.Fragment>
            {currentUser && (
                <React.Fragment>
                    <div className="col-lg-3 offset-lg-2">
                        <ProfilePhoto size="large" align="right" profilePhoto={currentUser.profilePhoto} />
                    </div>
                    <div className="col-lg-7">
                        <div className="form-group">
                            <div className="fieldTitle">
                                Name
                    </div>
                            <div>{currentUser.name}</div>
                        </div>
                        <div className="form-group">
                            <div className="fieldTitle">
                                Email
                    </div>
                            <div>{currentUser.email}</div>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default UserProfile;