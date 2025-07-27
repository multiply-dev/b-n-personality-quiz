import React, { useState } from 'react';
import jsonp from 'jsonp';

import './ChewCrew.css'

const ChewCrew = ({ onSignupComplete }) => {
  const MailchimpURL = process.env.REACT_APP_MAILCHIMP;
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [flavor, setFlavor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = e => {
    setIsSubmitting(true);
    setError(null);
    e.preventDefault();
    const url = MailchimpURL;
    const formName = "BN Personality Quiz Form"
    jsonp(`${url}&FNAME=${fname}&LNAME=${lname}&EMAIL=${email}&FLAVOR=${flavor}&FORM=${formName}&ACCEPTS_MARKETING=true`, { param: 'c' }, (err, data) => {
      if (err) {
        // Handle error
        setIsSubmitting(false);
        setError('An error occurred. Please try again.');
      } else {
        setIsSubmitting(false);
        onSignupComplete();
      }  
    });
  };

  return (
    <div className="chew-crew-container">
      <div>
      <h1 className='progress-text'>Last Step:</h1>
      <h1 className='question-text'>fill out your info FOR A CHANCE TO WIN</h1>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form 
          id="mc-embedded-subscribe-form" 
          className="form-container"
          name="mc-embedded-subscribe-form"
          onSubmit={handleSubmit}>
        <div className="questions-container">
          <div className="sign-up-text">Sign up for our newsletter<sup>*</sup></div>
          <input
            id="mce-FNAME"
          name="FNAME"
          type="text"
          value={fname}
          onChange={(e) => setFName(e.target.value)}
          placeholder="First Name"
          required
          />
          <input
            id="mce-LNAME"
          name="LNAME"
          type="text"
          value={lname}
          onChange={(e) => setLName(e.target.value)}
          placeholder="Last Name"
          required
          />
          <input
            id="mce-EMAIL"
          name="EMAIL"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          />
          <input
            id="mce-FLAVOR"
          name="FLAVOR"
          type="text"
          value={flavor}
          onChange={(e) => setFlavor(e.target.value)}
          placeholder="Favorite Flavor"
          required
          />
        </div>
        <h1 className='question-text'>SUBMIT TO SEE WHAT CHEWBIE YOU ARE!</h1>
      
        <button className="submit-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      <p className="disclaimer-text"><em>*Subscribers will receive updates on new flavor launches, promotional deals, upcoming events, etc.</em></p>
    </div>
  );
};

export default ChewCrew;