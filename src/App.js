import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { RoutedContent } from './routes';
import { AppStateProvider } from './components/AppState';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Layout from './layout'
import './App.css';
import reducers from "./reducers";
import { authenticationService } from './services';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


const App = () => {

  const history = createBrowserHistory();

  const loggedInUser = authenticationService.getCurrentUser();

  console.log('loggedInUser', loggedInUser);

  const initialState = {
    currentUser: loggedInUser,
  }
  
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#5e9cea',
      },
      secondary: {
        main: '#f44336',
      },
    },
    overrides: {
      MuiInputLabel: { // Name of the component ⚛️ / style sheet
        root: { // Name of the rule
          // color: "#5e9cea",
          // "&$focused": { // increase the specificity for the pseudo class
          //   color: "#5e9cea"
          // }
        }
      },
      MuiOutlinedInput: {
        root: {
          // "& $notchedOutline": {
          //   borderColor: "green"
          // },
          "&:hover $notchedOutline": {
            borderColor: "#5e9cea"
          },
          "&$focused $notchedOutline": {
            borderColor: "#5e9cea"
          }
        }
      }
    }
  });

  return (
    <AppStateProvider initialState={initialState} reducer={reducers}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
        <ToastContainer />

          <Layout>
            <RoutedContent />
            <ReactNotification />
          </Layout>
        </ThemeProvider>
      </Router>
    </AppStateProvider>
  );
}

export default App;
