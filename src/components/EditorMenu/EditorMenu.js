import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppState } from "components/AppState";

const EditorMenu = () => {
    const [{ currentUser }, dispatch] = useAppState();

    return (
        <aside className="dk-asidebar-menu">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/Admin/Dashboards">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Admin/Projects">Projects</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Admin/Users">Users</NavLink>
                    </li>                    
                </ul>
            </nav>
        </aside>
    )
};

export default EditorMenu;