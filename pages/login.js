import React, { useState } from "react";
import { getAuth, signInWithPhoneNumber,RecaptchaVerifier } from "firebase/auth";
import firebase from "./firebase";
//import firebase from 'firebase/app';
import 'firebase/auth';
function login() {
  const [mobile, setMobile] = useState();

  function handleChange(e) {
    const number = e.target.value;
    setMobile(number);
  }

  function captcha() {
    const auth = getAuth();

    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("done");
          onSignInSubmit();
        },
      },
      auth
    );
  }

  function onSignInSubmit(e) {
    e.preventDefault();
    console.log(mobile);
    captcha();

    const phoneNumber = "+91" + mobile;
    const appVerifier = window.recaptchaVerifier;

    console.log(phoneNumber);

    const auth = getAuth();
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;

        const code = window.prompt("Enter OTP");
        confirmationResult
          .confirm(code)
          .then((result) => {
            // User signed in successfully.
            const user = result.user;
            // ...
          })
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
          });
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
  }

  return (
    <form onSubmit={onSignInSubmit}>
      <div id="sign-in-button"></div>

      <input type="text" onChange={handleChange} />
      <button>submit</button>
    </form>
  );
}

export default login;
