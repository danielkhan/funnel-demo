import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Step.css';
import * as Sentry from "@sentry/react";

function StepTwo() {
  let navigate = useNavigate();
  const [startTime, setStartTime] = useState(Date.now()); // Capture start time when component mounts

  useEffect(() => {
    // This function is called when the component mounts
    setStartTime(Date.now());
  }, []);

  const [formData, setFormData] = useState({
    fullName: 'Jane Doe',
    addressLine1: '123 React Street',
    addressLine2: 'Apt. 456',
    city: 'Reduxville',
    state: 'JS',
    zipCode: '12345',
    country: 'Webland',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const goToNextStep = () => {
    const endTime = Date.now(); // Capture end time when navigating to the next step
    const duration = endTime - startTime; // Calculate the duration in milliseconds

    Sentry.metrics.distribution("funnel_time", duration, {
      tags: { step: "address" },
      unit: "millisecond",
    });
    Sentry.metrics.increment('funnel', 1, {
      tags: { step: "address" },
    });
    navigate('/final-step');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Here you would typically handle the form submission, e.g., sending the data to a server
    goToNextStep();
  };

  return (
    <div className="step">
      <form className="card" onSubmit={handleSubmit}>
        <h2>Shipping Address</h2>
        <label>
          Full Name:
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
        </label>
        <label>
          Address Line 1:
          <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} />
        </label>
        <label>
          Address Line 2:
          <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </label>
        <label>
          State/Province:
          <input type="text" name="state" value={formData.state} onChange={handleChange} />
        </label>
        <label>
          ZIP/Postal Code:
          <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} />
        </label>
        <label>
          Country:
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
        </label>
        <button className='button' type="submit">Submit Order</button>
      </form>  
    </div>
  );
}

export default StepTwo;
