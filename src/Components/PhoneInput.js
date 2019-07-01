import React, { useState } from "react";
import { firestore } from "../firebase";

const PhoneInput = props => {
  const [phoneUserInput, setPhoneUserInput] = useState("");

  const { user, loginStatus, sendSmsReleaseReminders } = props;

  const sendTwilioMessage = async phone => {
    await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ to: phoneUserInput, name: user.displayName })
    });
  };

  const updateUserPhoneNumber = async e => {
    e.preventDefault();

    const userMetaDataRef = firestore
      .collection("users")
      .doc(`${user.uid}`)
      .collection("userInfo")
      .doc("metadata");

    const userPreferencesRef = firestore
      .collection("users")
      .doc(`${user.uid}`)
      .collection("userInfo")
      .doc("preferences");

    await userMetaDataRef.get().then(function(doc) {
      if (doc.exists) {
        userMetaDataRef.update({
          phone: phoneUserInput
        });
      }
      console.log(
        `The phone number ${phoneUserInput} has been added to the DB!`
      );
    });

    await userPreferencesRef.get().then(function(doc) {
      if (doc.exists) {
        userPreferencesRef.update({
          sendSmsReleaseReminders: true
        });
      }
    });

    sendTwilioMessage(phoneUserInput);
  };

  const disableSmsUpdates = async () => {
    const userPreferencesRef = firestore
      .collection("users")
      .doc(`${user.uid}`)
      .collection("userInfo")
      .doc("preferences");

    await userPreferencesRef.get().then(doc => {
      if (doc.exists) {
        userPreferencesRef.update({
          sendSmsReleaseReminders: false
        });
      }
    });
  };

  return (
    <div className="phone-container">
      <div>
        {loginStatus && sendSmsReleaseReminders ? (
          <>
            <h2>
              Tap the <i id="gray-bell" className="fas fa-bell" /> above to get
              reminders
            </h2>
            <p>
              <span>
                Don't want to get SMS reminders for upcoming movies? Disable
                them at anytime.
              </span>
            </p>
          </>
        ) : (
          <>
            <h2>Don't want to miss any movies?</h2>
            <p>
              <span>
                Get SMS reminders sent to your phone one day before the movie
                you want to see premieres.
              </span>
            </p>
          </>
        )}
        {loginStatus && sendSmsReleaseReminders ? (
          <button
            className="disable-reminders-button"
            type="button"
            onClick={disableSmsUpdates}
          >
            Disable reminders!
          </button>
        ) : (
          <form onSubmit={e => updateUserPhoneNumber(e)}>
            <div className="phone-input-container">
              <input
                placeholder="+1 000-000-0000"
                type="tel"
                className="phone-input"
                onChange={e => setPhoneUserInput(e.target.value)}
                name="phone"
                value={phoneUserInput}
                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
              />
            </div>
            <div className="get-reminders-button-container">
              <button className="get-reminders-button" type="submit">
                Get reminders!
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PhoneInput;
