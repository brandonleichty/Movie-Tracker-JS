import React, { useState } from "react";
import EmailLogin from "../AuthComponents/EmailLogin";
import EmailSignUp from "../AuthComponents/EmailSignUp";
import Twitter from "../AuthComponents/Twitter";
import Github from "../AuthComponents/Github";
import Google from "../AuthComponents/Google";

// At this point the footer is pretty darn basic. I plan on adding a few other simple things such as
// a link to my twitter and an embedded link to brandonleichty.com (or my github since my site isn't up yet).

const Login = props => {
  const [existingLogin, setExistingLogin] = useState(true);
  const { setUser, hideNavBar } = props;

  hideNavBar(true);

  return (
    <div className="login-container">
      {existingLogin ? (
        <>
          <Twitter />
          <Github />
          <Google />
          <div>
            <span>OR</span>
          </div>
          {/* <EmailLogin setUser={setUser} /> */}
          <EmailLogin setUser={setUser} setExistingLogin={setExistingLogin} />
        </>
      ) : (
        <EmailSignUp setUser={setUser} setExistingLogin={setExistingLogin} />
      )}
    </div>
  );
};

export default Login;
