import React from "react";
import { NavLink } from "react-router-dom";
import { useAppState } from "../components/AppState";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const Navbar = (props) => {
  const [{ currentUser }] = useAppState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <div className="sj-navigationarea">
      <div className="sj-rightarea">
        <div className="sj-rightarea">
          <nav id="sj-nav" className="sj-nav nav navbar-expand-lg">
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="lnr lnr-menu"></i>
            </button>
            <div
              className="collapse navbar-collapse sj-navigation"
              id="navbarNav"
            >
              <ul>
                <li class="menu-item-has-children page_item_has_children">
                  <NavLink to="/About">About Us</NavLink>
                  <ul className="sub-menu">
                    <li>
                      <NavLink to="/About">About Covid Corpus</NavLink>
                    </li>
                    <li>
                      <NavLink to="/About/AdvisoryBoard">Advisory Board</NavLink>
                    </li>
                    <li>
                      <NavLink to="/About/OurTeam">Our Team</NavLink>
                    </li>
                  </ul>
                </li>
                <li>
                  <NavLink to="/Reports/Activity">Research Projects</NavLink>
                </li>
                <li>
                  <NavLink to="/Reports/Funding">Funding Opportunities</NavLink>
                </li>
                <li>
                  <NavLink to="/Reports/Other">Other Resources</NavLink>
                </li>

                {currentUser && currentUser.user && (
                  <li>
                    <NavLink to="/UserProject">My Projects</NavLink>
                  </li>
                )}

                {currentUser && currentUser.user && currentUser.user.isAdmin && (
                  <li className="special-li">
                    <NavLink to="/Admin">Admin panel</NavLink>
                  </li>
                )}
                {currentUser && currentUser.user && currentUser.user.isEditor && (
                  <li className="special-li">
                    <NavLink to="/Admin/Dashboards">Editor panel</NavLink>
                  </li>
                )}
              </ul>
            </div>
          </nav>
          {currentUser && currentUser.user && (
            <NavLink
              className="dk-btn dk-btn-blue dk-btn-big ml-3"
              stlye={{ display: "inline-block" }}
              to="/ProjectSubmit"
            >
              Add a project
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
