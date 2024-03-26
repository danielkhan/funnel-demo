import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Step.css';
import * as Sentry from "@sentry/react";

function FinalStep() {
  const [hasError, setHasError] = useState(false);
  const [requestCompleted, setRequestCompleted] = useState(false);
  const navigate = useNavigate();

  const completeOrder = async () => {
    setRequestCompleted(false); // Reset request state before calling
    const apiUrl = 'http://127.0.0.1:5000/complete-order';
    try {
      const response = await fetch(apiUrl, { method: 'GET' });

      if (!response.ok || response.status !== 200) {
        throw new Error('Failed to place order');
      }

      // **** Increment Funnel Counter
      Sentry.metrics.increment('funnel', 1, {
        tags: { step: "success" },
      });

      Sentry.flush();
      console.log('Order placed successfully');
      setHasError(false);
    } catch (error) {
      console.error(error);

      // **** Increment Error Counter
      Sentry.metrics.increment('api_error', 1);

      setHasError(true);
    } finally {
      setRequestCompleted(true);
    }
  };

  useEffect(() => {
    completeOrder();
  }, []);

  const goToFirstStep = () => {
    navigate('/'); // Navigate back to the first step
  };

  return (
    <div className="step">
      <div className="card">
        {!requestCompleted ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <div className="spinner-text">Placing order...</div>
          </div>
        ) : hasError ? (
          <div>
            <img src="/error.webp" alt="Error" className="card-image" />
            <h2>There was an error processing your request.</h2>
          </div>
        ) : (
          <div>
            <img src="/otw.webp" alt="Metrics Enabled" className="card-image" />
            <h2>Your order is on the way!</h2>
          </div>
        )}
        
        {requestCompleted && (
          <button className="button" onClick={goToFirstStep}>Start Over</button>
        )}
      </div>
    </div>
  );
}

export default FinalStep;
