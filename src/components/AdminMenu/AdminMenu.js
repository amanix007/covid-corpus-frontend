import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppState } from "components/AppState";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: `'Quicksand', Arial, Helvetica, sans-serif`,
        color: "#3636c77"
    },
}));

const AdminMenu = (props) => {
    const [{ currentUser }, dispatch] = useAppState();

    return (
        <aside className="dk-asidebar-menu">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/Admin/Dashboards">Dashboard</NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/Admin/Projects">Projects</NavLink>
                    </li> */}

                    {currentUser && currentUser.user.isAdmin && (
                        <>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content2"
                                    id="panel1a-header2"
                                >
                                    <Typography >Projects</Typography>
                                </AccordionSummary>
                                <AccordionDetails>


                                    <ul style={{ width: "100%" }}>
                                        <li>
                                            <NavLink to="/Admin/Projects/Research Project" >Research Project</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Admin/Projects/Funding Opportunities"  >Funding Opportunities</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Admin/Projects/Other Resources"  >Other Resources</NavLink>
                                        </li>
                                        <li>
                                        </li>
                                    </ul>
                                </AccordionDetails>
                            </Accordion>

                        </>
                    )}
                    {currentUser && currentUser.user.isAdmin && (
                        <>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content2"
                                    id="panel1a-header2"
                                >
                                    <Typography >Users</Typography>
                                </AccordionSummary>
                                <AccordionDetails>


                                    <ul style={{ width: "100%" }}>
                                        <li>
                                            <NavLink to="/Admin/Users/admin" >Admin</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Admin/Users/editor"  >Editor</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Admin/Users/parser"  >Parser</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Admin/Users/member"  >Member</NavLink>
                                        </li>
                                    </ul>
                                </AccordionDetails>
                            </Accordion>

                        </>
                    )}
                    {currentUser && currentUser.user.isAdmin && (
                        <>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography >System Settings</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ul>
                                        <li>
                                            <NavLink to="/Admin/BiomedicalResearchActivities">Biomedical Research Activities</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Admin/OtherResearchFields">Other Research Fields</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Admin/HrcsResearchActivities">HRCS Research Activities</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Admin/WhoPriorities">WHO Research Priorities</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Admin/WhoImmediateResearchActions">WHO Immediate Research Actions</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Admin/ResourceType">Resource Types</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Admin/Funder">Funders</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/Admin/Partner">Partners</NavLink>
                                        </li>
                                    </ul>
                                </AccordionDetails>
                            </Accordion>

                        </>
                    )}
                </ul>
            </nav>
        </aside>
    )
};

export default AdminMenu;