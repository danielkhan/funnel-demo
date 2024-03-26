import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Step.css'; // Make sure this path is correct
import * as Sentry from "@sentry/react";

function StepOne() {
  let navigate = useNavigate();

  const goToNextStep = () => {

    // Count each user plus the current step as dimension 
    Sentry.metrics.increment('funnel', 1, {
      tags: { step: "home" },
    });

    navigate('/step-two');
  };

  return (
    <div className="step">
      <div className="card">
        
        <img src="/swag.webp" alt="Sample" className="card-image" />
        <h2>Do you want Swag?</h2>
        <button className='button' onClick={goToNextStep}>Hell yeah!</button>
      </div>
    </div>
  );
}

export default StepOne;
