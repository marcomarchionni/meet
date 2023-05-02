import './WelcomeScreen.css';
import { getAuthUrl } from './api';
import { privacyUrl } from './urls';
import logo from './meet-logo.png';

const WelcomeScreen = () => {
  return (
    <div className="welcome-screen">
      <div className="welcome_container">
        <img src={logo} alt="meet-app-logo" width="300" />
        <h2 className="welcome_subtitle">IT events around the world</h2>
        <p>Log in to see the upcoming events for full-stack developers</p>
        <div className="button_cont">
          <div className="google-btn">
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Log
o.svg"
                alt="Google sign-in"
              />
            </div>
            <button
              onClick={() => {
                getAuthUrl();
              }}
              rel="nofollow noopener"
              className="btn-text">
              <b>Sign in with google</b>
            </button>
          </div>
        </div>
        <div className="welcome_privacy">
          <a href={privacyUrl} rel="noreferrer" target="_blank">
            Privacy policy
          </a>
        </div>
      </div>
    </div>
  );
};
export default WelcomeScreen;
