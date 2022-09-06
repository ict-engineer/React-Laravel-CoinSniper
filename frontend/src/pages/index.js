import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import HomePage from './home-page'
import DashboardPage from './dashboard-page'
import TermPage from './term-conditions'
import LoginPage from './Auth/login'
import RegisterPage from './Auth/register'
import SubmitPage from './submit-page'
import Header from 'components/Header'
import Footer from 'components/Footer'
import InformationPage from 'pages/information-page';
import ProgressComponent from 'components/ProgressComponent'
import Notification from 'components/Notification'
import VerifyPage from './Auth/verify';
import VerifiedPage from './Auth/verified';
import ForgotPasswordPage from './Auth/forgotPassword';
import ResetPasswordPage from './Auth/resetPassword';
import { LOCAL_STORAGE_KEY } from "consts";
const { TOKEN, USER_DATA } = LOCAL_STORAGE_KEY;

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    minHeight: '100vh',
    overflow: 'auto',
    color: 'white',
    backgroundColor: '#0b1621',
    margin: '0 auto',
    '&.scroll-body': {
      '& $wrapper': {
        height: 'auto',
        flex: '0 0 auto',
        overflow: 'auto'
      },
      '& $contentWrapper': {},
      '& $content': {}
    },
  },
  wrapper: {
    marginTop: "4rem",
    display: 'flex',
    height: "calc(100% - 20rem)",
    position: 'relative',
    justifyContent: "center",
    width: '100%',
    flex: '1 1 auto'
  },
  contentWrapper: {
    display: 'flex',
    maxWidth: 1440,
    flexDirection: 'column',
    padding: "0px 1.5rem",
    position: 'relative',
    zIndex: 3,
    overflow: 'hidden',
    flex: '1 1 auto'
  },
  content: {
    position: 'relative',
    display: 'flex',
    overflow: 'auto',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%',
    '-webkit-overflow-scrolling': 'touch',
    zIndex: 2
  }
}));



function Pages(props) {
  const classes = useStyles(props);

  const isLoggedIn = () => {
    return localStorage.getItem(TOKEN) !== "" && localStorage.getItem(TOKEN) !== null;
  }

  const isAdmin = () => {
    return localStorage.getItem(TOKEN) !== "" && localStorage.getItem(TOKEN) !== null && JSON.parse(localStorage.getItem(USER_DATA)).user_role === 'admin';
  }

  // const isUser = () => {
  //   return localStorage.getItem(TOKEN) !== "" && localStorage.getItem(TOKEN) !== null && JSON.parse(localStorage.getItem(USER_DATA)).user_role === 'user';
  // }

  const isVerified = () => {
    return localStorage.getItem(TOKEN) !== "" && localStorage.getItem(TOKEN) !== null && JSON.parse(localStorage.getItem(USER_DATA)).email_verified_at !== null && JSON.parse(localStorage.getItem(USER_DATA)).email_verified_at !== '';
  }

  return (
    <React.Fragment>
      <>
        <div id="layout" className={clsx(classes.root, `scroll-scroll-body`)}>
          <div className="flex flex-1 flex-col overflow-hidden relative h-full">
            <Header />
            <div className={classes.wrapper}>
              <div className={classes.contentWrapper}>
                <div className={classes.content}>
                  <Switch>
                    <Route exact path="/login" render={() => (
                      isLoggedIn() ? (
                        <Redirect to="/home" />
                      ) : (
                        <LoginPage />
                      )
                    )} />
                    <Route exact path="/register" render={() => (
                      isLoggedIn() ? (
                        <Redirect to="/home" />
                      ) : (
                        <RegisterPage />
                      )
                    )} />
                    <Route exact path="/verify_account" render={() => (
                      isLoggedIn() && !isVerified() ? (
                        <VerifyPage />
                      ) : (
                        <Redirect to="/home" />
                      )
                    )} />
                    <Route exact path="/dashboard" component={DashboardPage} />
                    <Route exact path="/submit" render={() => (
                      !isVerified() && isLoggedIn() ? (
                        <Redirect to="/" />
                      ) : (
                        <SubmitPage />
                      )
                    )} />
                    <Route exact path="/forgot-password" render={() => (
                      isLoggedIn() ? (
                        <Redirect to="/home" />
                      ) : (
                        <ForgotPasswordPage />
                      )
                    )} />
                    <Route exact path="/password-reset" render={() => (
                      isLoggedIn() ? (
                        <Redirect to="/home" />
                      ) : (
                        <ResetPasswordPage />
                      )
                    )} />
                    <Route exact path="/verified" render={() => (
                      isLoggedIn() ? (
                        <VerifiedPage />
                      ) : (
                        <Redirect to="/home" />
                      )
                    )} />
                    <Route exact path="/home" component={HomePage} />
                    <Route exact path="/coin/:id" component={InformationPage} />
                    <Route exact path="/term-and-condition" component={TermPage} />

                    <Route exact path="/" render={() => (
                      isLoggedIn() && !isVerified() ? (
                        <Redirect to="/verify_account"></Redirect>
                      ) : (isAdmin() ?
                        <Redirect to="/dashboard"></Redirect> :
                        <Redirect to="/home"></Redirect>
                      )
                    )} />
                    <Redirect to="/"></Redirect>
                  </Switch>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
        <ProgressComponent></ProgressComponent>
        <Notification></Notification>
      </>
    </React.Fragment >
  );
};

export default Pages;
