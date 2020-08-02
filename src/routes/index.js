import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { PrivateRoute } from 'components/PrivateRoute';
import Breadcrumbs from 'components/Breadcrumbs';

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Contact from "./Contact";
import AboutUs from "./AboutUs";
import OurTeam from "./OurTeam";
import AdvisoryBoard from "./AdvisoryBoard";
import ActivityReports from "./ActivityReports";
import ActivityReportDetails from "./ActivityReports/ActivityReportDetails";
import FundingReports from "./FundingReports";
import FundingReportDetails from "./FundingReports/FundingReportDetails";
import OtherReports from "./OtherReports";
import OtherReportDetails from "./OtherReports/OtherReportDetails";
import ProjectSubmit from "./ProjectSubmit";
import UsefulLinks from "./UsefulLinks";
import Admin from "./Admin";
import AdminBlog from "./AdminBlog";
import AdminBlogCategory from "./AdminBlogCategory";
import AdminDashboards from "./AdminDashboards";
import AdminFunders from "./AdminFunder";
import AdminUsefulLink from "./AdminUsefulLink";
import AdminPartner from "./AdminPartner";
import AdminProject from "./AdminProject";
import AdminProjectActivity from "./AdminProjectActivity";
import AdminResourceType from "./AdminResourceType";
import AdminSettings from "./AdminSettings";
import AdminUser from "./AdminUser";
import AdminActivity from "./AdminActivity";
import AdminFunding from "./AdminFunding";
import AdminOtherResources from "./AdminOtherResources";
import AdminWhoPriority from "./AdminWhoPriority";
import AdminBiomedicalResearchActivity from "./AdminBiomedicalResearchActivity";
import AdminOtherResearchField from "./AdminOtherResearchField";
import AdminHrcsResearchActivities from "./AdminHrcsResearchActivities";
import AdminWhoImmediateResearchActions from "./AdminWhoImmediateResearchActions";
import UserProfile from "./UserProfile";
import MyProfile from "./MyProfile";
import UserProject from "./UserProject";
import ProjectActivity from "./ProjectActivity";
import ProjectFundingOpportunity from "./ProjectFundingOpportunity";
import AdminFundingOpportunity from "./AdminFundingOpportunity";

import NotFound from "./NotFound";

import { useAppState, AppStateContext } from "../components/AppState";
import ProjectOtherResouce from "./ProjectOtherResouce";
import ReportProblem from "./ReportProblem";
import AdvancedSearch from "./AdvancedSearch";
import EditorMenu from "components/EditorMenu";
import SearchResult from './Tabs'
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import VerifyEmail from "./VerifyEmail";
import EmailVerificationNeeded from "./EmailVerificationNeeded";

const routes = [
  {
    requireAuth: false,
    path: "/Home",
    name: "Home",
    component: Home
  },
  {
    requireAuth: false,
    path: "/About",
    name: "About Us",
    component: AboutUs
  },
  {
    requireAuth: false,
    path: "/About/OurTeam",
    name: "Our Team",
    component: OurTeam
  },
  {
    requireAuth: false,
    path: "/Contact",
    name: "Contact Us",
    component: Contact
  },
  {
    requireAuth: false,
    path: "/About/AdvisoryBoard",
    name: "Advisory Board",
    component: AdvisoryBoard
  },
  {
    requireAuth: false,
    path: "/Admin",
    name: "Admin",
    roles: ['Admin'],
    component: Admin
  },
  {
    requireAuth: false,
    path: "/ReportProblem",
    name: "Report a Problem",
    component: ReportProblem
  },
  {
    requireAuth: false,
    path: "/Login",
    name: "Login",
    component: Login
  },
  {
    requireAuth: false,
    path: "/NotFound",
    name: "Not Found",
    component: NotFound
  },

  {
    requireAuth: true,
    path: "/ProjectSubmit",
    name: "Add a project",
    component: ProjectSubmit,
  },
  {
    requireAuth: false,
    path: "/UsefulLinks",
    name: "Useful Links",
    component: UsefulLinks
  },
  {
    requireAuth: false,
    path: "/Register",
    name: "Register",
    component: Register
  },
  {
    requireAuth: false,
    path: "/forgot-password",
    name: "Forgot Password",
    component: ForgotPassword
  },
  {
    requireAuth: false,
    path: "/resetPassword",
    name: "Reset Password",
    component: ResetPassword
  },
  {
    requireAuth: false,
    path: "/verifyEmail",
    name: "Verify Email",
    component: VerifyEmail
  },
  {
    requireAuth: false,
    path: "/Reports/Activity",
    name: "Research Projects",
    component: ActivityReports
  },
  {
    requireAuth: false,
    path: "/Reports/Activity/ActivityReportDetails/:id",
    name: "Details",
    component: ActivityReportDetails
  },
  {
    requireAuth: false,
    path: "/Reports/Funding",
    name: "Funding Opportunities",
    component: FundingReports
  },
  {
    requireAuth: false,
    path: "/Reports/Funding/FundingReportDetails/:id",
    name: "Details",
    component: FundingReportDetails
  },
  {
    requireAuth: false,
    path: "/Reports/Other",
    name: "Other Resources",
    component: OtherReports
  },
  {
    requireAuth: false,
    path: "/Reports/Other/OtherReportDetails/:id",
    name: "Details",
    component: OtherReportDetails
  },

  {
    requireAuth: true,
    path: "/Admin/Dashboards",
    name: "Dashboards",
    component: AdminDashboards
  },
  {
    requireAuth: false,
    path: "/Admin/Blog",
    name: "Blog",
    component: AdminBlog
  },
  {
    requireAuth: false,
    path: "/Admin/BlogCategory",
    component: AdminBlogCategory
  },
  {
    requireAuth: true,
    path: "/Admin/Funder",
    name: "Funders",
    component: AdminFunders
  },
  {
    requireAuth: true,
    path: "/Admin/Partner",
    name: "Partners",
    component: AdminPartner
  },
  {
    requireAuth: true,
    path: "/Admin/Projects/:projectType",
    name: "Projects",
    component: AdminProject
  },
  {
    requireAuth: true,
    path: "/Admin/Projects/ActivityEdit/:id",
    name: "Edit",
    component: AdminProjectActivity
  },
  {
    requireAuth: true,
    path: "/Admin/ResourceType",
    name: "Resource Type",
    component: AdminResourceType
  },
  {
    requireAuth: true,
    path: "/Admin/UsefulLink",
    name: "Useful Link",
    component: AdminUsefulLink
  },
  {
    requireAuth: true,
    path: "/Admin/Settings",
    name: "Settings",
    component: AdminSettings
  },
  // {
  //   path: "/Admin/Users",
  //   name: "Users",
  //   component: AdminUser
  // },
  {
    requireAuth: true,
    path: "/Admin/Users/:userType",
    name: "Users",
    component: AdminUser
  },
  {
    requireAuth: true,
    path: "/Admin/Activities",
    name: "Activities",
    component: AdminActivity
  },
  {
    requireAuth: true,
    path: "/Admin/Fundings",
    name: "Fundings",
    component: AdminFunding
  },
  {
    requireAuth: true,
    path: "/Admin/OtherResources",
    name: "Other Resources",
    component: AdminOtherResources
  },
  {
    requireAuth: true,
    path: "/Admin/HrcsResearchActivities",
    name: "Hrcs Research Activities",
    component: AdminHrcsResearchActivities
  },
  {
    requireAuth: true,
    path: "/Admin/WhoImmediateResearchActions",
    name: "Who Immediate Research Actions",
    component: AdminWhoImmediateResearchActions
  },
  {
    requireAuth: true,
    path: "/Admin/WhoPriorities",
    name: "Who Priorities",
    component: AdminWhoPriority
  },
  {
    requireAuth: true,
    path: "/Admin/BiomedicalResearchActivities",
    name: "Biomedical Research Activities",
    component: AdminBiomedicalResearchActivity
  },
  {
    requireAuth: true,
    path: "/Admin/OtherResearchFields",
    name: "Other Research Fields",
    component: AdminOtherResearchField
  },
  {
    requireAuth: true,
    path: "/UserProfile",
    name: "User Profile",
    component: UserProfile
  },
  {
    requireAuth: true,
    path: "/MyProfile",
    name: "My Profile",
    component: MyProfile
  },
  {
    requireAuth: true,
    path: "/UserProject",
    name: "User Projects",
    component: UserProject
  },
  {
    requireAuth: true,
    path: "/ProjectSubmit/Activity",
    name: "Research Project",
    component: ProjectActivity
  },
  {
    requireAuth: true,
    path: "/ProjectSubmit/FundingOpportunity",
    name: "Funding Opportunity",
    component: ProjectFundingOpportunity
  },
  {
    requireAuth: true,
    path: "/ProjectSubmit/OtherResources",
    name: "Other Resources",
    component: ProjectOtherResouce
  },
  {
    requireAuth: true,
    path: "/Admin/Projects/FundingOpportunityEdit/:id",
    name: "Edit",
    component: AdminFundingOpportunity
  },
  {
    requireAuth: true,
    path: "/Admin/Projects/OtherResourceEdit/:id",
    name: "Edit",
    component: AdminOtherResources
  },
  {
    requireAuth: false,
    path: "/AdvancedSearch",
    name: "Advanced Search",
    component: AdvancedSearch
  },
  {
    requireAuth: true,
    path: "/Editor",
    name: "Editor",
    roles: ['Editor'],
    component: EditorMenu
  },
  {
    requireAuth: false,
    path: '/SearchResult',
    name: 'Search Result',
    component: SearchResult
  },
  {
    requireAuth: false,
    path: "/EmailVerificationNeeded",
    name: "Email Verification Needed",
    component: EmailVerificationNeeded
  },
]

//------ Route Definitions --------
// eslint-disable-next-line no-unused-vars
export const RoutedContent = (props) => {
  const [{ currentUser, selectedInstitute }, dispatch] = useAppState();
  const user = currentUser && currentUser.user;

  React.useEffect(() => {
    // console.log('props', window.location.)
    if (window && window.location) {
      const x = new URLSearchParams(window.location.search);
      console.log(x.get('Msg'))
    }
  }, [window])

  return (
    <Switch>
      <Redirect from="/" to="/Home" exact />
      {console.log('window', window.location)}
      {routes.map((r, i) => <Route path={r.path} key={r.path} exact render={props => {
        if (r.roles && !currentUser) {

          return <Redirect to="/" />
        } else if (
          r.requireAuth && !JSON.parse(localStorage.getItem("covidUser"))
        ) {
          return <Redirect to="/Login" />

        }

        const crumbs = routes
          // Get all routes that contain the current one.
          .filter(({ path }) => props.match.path.includes(path))
          // Swap out any dynamic routes with their param values.
          // E.g. "/pizza/:pizzaId" will become "/pizza/1"
          .map(({ path, ...rest }) => ({
            path: Object.keys(props.match.params).length
              ? Object.keys(props.match.params).reduce(
                (path, param) => path.replace(
                  `:${param}`, props.match.params[param]
                ), path
              )
              : path,
            ...rest
          }));

        return (
          <React.Fragment>
            <div className="sj-innerbanner">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="sj-innerbannercontent">
                      <Breadcrumbs crumbs={crumbs} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {

              }
            </div>

            <main id="sj-main" className="sj-main sj-haslayout sj-sectionspace">
              <div className="sj-haslayout">
                <div className="container">
                  <div className="row"><r.component {...props} /></div>
                </div>
              </div>
            </main>

          </React.Fragment>
        );
      }} />)}

      <Redirect to="/NotFound" />
    </Switch>
  );
};
