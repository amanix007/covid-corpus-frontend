import React from "react";
import GoogleLogin from "react-google-login";
import { Link, NavLink, useHistory } from "react-router-dom";
import ProfilePhoto from "../components/ProfilePhoto";
import { LOGIN_USER_SUCCESS, LOGOUT_USER } from "../actions";
import { authenticationService } from "../services";
import { useAppState } from "../components/AppState";
import './layout.css';

export const TopBar = () => {
  let history = useHistory();
  const [{ currentUser }, dispatch] = useAppState();

  const logout = (e) => {
    e.preventDefault();
    authenticationService.logout();
    dispatch({ type: LOGOUT_USER });
    history.push("/Home");
  };

  return (
    <div className="sj-topbar">
      <strong className="sj-logo">
        <NavLink to="/Home">
          <img src="images/CovidCorpusHeader.png" alt="Covid Corpus" />
        </NavLink>
      </strong>
      <div className="sj-languagelogin">
        {!currentUser && (
          <div className="sj-loginarea">
            <ul className="sj-loging">
              <li>
                <NavLink to="/Login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/Register">Register</NavLink>
              </li>
            </ul>
          </div>
        )}
        {currentUser &&  currentUser.user &&  (
          <div className="sj-userloginarea">
            <a href="javascript:void(0);">
              <i className="fa fa-angle-down"></i>
              {
                <ProfilePhoto
                  profilePhotoBase64={currentUser.user.googleId && currentUser.user.profilePhoto}
                  profilePhotoPath={!currentUser.user.googleId && currentUser.user.profilePhoto}
                  align="left"
                />
              }
              <div className="sj-loginusername">
                <h3>Hi, {currentUser.user.name}</h3>
                {currentUser.user.isAdmin && <span>Admin</span>}
                {currentUser.user.isAdmin && currentUser.user.isEditor && <span>, </span>}
                {currentUser.user.isEditor && <span>Editor</span>}
                {!(currentUser.user.isAdmin || currentUser.user.isEditor) && <span>Member</span>}
              </div>
            </a>
            <nav className="sj-usernav">
              <ul>
                <li>
                  <NavLink to="/MyProfile">
                    <i className="lnr lnr-user"></i>
                    <span>My Profile</span>
                  </NavLink>
                </li>
                <li>
                  <a href="#" onClick={logout}>
                    <i className="lnr lnr-exit"></i>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
