import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppState } from 'components/AppState';
import { partnerService } from '../services';

const Footer = () => {
    const [{ currentUser }, dispatch] = useAppState();

    const [partners, setPartners] = React.useState([]);

    React.useEffect(() => {
        partnerService.get().then(data => setPartners(data));
    }, []);

    return (
        <footer id="sj-footer" className="sj-footer sj-haslayout footer">
            <div className="container">
                <div className="row">
                    <a className="sj-btnscrolltotop" href="javascript:void(0);">
                        <i className="fa fa-angle-up"></i>
                    </a>
                </div>
                <div className="row partners">
                   {partners && partners.map(p => 
                       <a
                           key={`${p.id}`}
                           href={`${p.link}`}
                           tooltip={`${p.name}`}
                           target="_blank"
                           className="partner">
                           <img src={`${process.env.REACT_APP_IMAGES_PATH}${p.logo}`} height="48" />
                       </a>
                   )}
                </div>
                
                <div className="links">
                    <ul>
                        <li>
                            <NavLink to="/About">About COVID CORPUS</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Contact">Contact Us</NavLink>
                        </li>
                        <li>
                            <NavLink to="/About/AdvisoryBoard">Advisory Board</NavLink>
                        </li>                        
                        <li>
                            <NavLink to="/About/OurTeam">Our Team</NavLink>
                        </li>
                        {/* <li>
                            <NavLink to="/AboutUs">Getting Started</NavLink>
                        </li>
                        <li>
                            <NavLink to="/AboutUs">Help, Support & FAQs</NavLink>
                        </li> */}
                        <li>
                            <NavLink to="/AboutUs">Privacy Policy</NavLink>
                        </li>
                        {currentUser && (
                            <li>
                                <NavLink to="/ReportProblem">Report a Problem</NavLink>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="sj-footerbottom">
                    <p className="sj-copyrights">
                        ©2020. All Rights Reserved v.1.202000619
                    </p>
                </div>
            </div>            

        </footer>
    );
}

export default Footer;